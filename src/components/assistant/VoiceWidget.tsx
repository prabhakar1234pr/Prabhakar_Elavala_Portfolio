"use client";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ReactMarkdown from "react-markdown";
import {
  BotMessageSquare,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  MessageSquare,
  RotateCcw,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Message = { role: "user" | "assistant"; content: string };
type Mode    = "chat" | "voice";
type VStatus = "idle" | "listening" | "processing" | "speaking";

// ─── Strip markdown for TTS ───────────────────────────────────────────────────
function toPlainText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → label
    .replace(/```[\s\S]*?```/g, "")           // code blocks
    .replace(/`[^`]+`/g, "")                  // inline code
    .replace(/#{1,6}\s/g, "")                 // headings
    .replace(/[*_>~]/g, "")                   // bold/italic/quote
    .replace(/\n{2,}/g, ". ")
    .replace(/\n/g, " ")
    .replace(/https?:\/\/\S+/g, "")           // bare URLs
    .replace(/\s{2,}/g, " ")
    .trim();
}

// ─── Waveform ─────────────────────────────────────────────────────────────────
function Waveform({ active, variant }: { active: boolean; variant: "mic" | "speaker" }) {
  const color  = variant === "mic" ? "#a78bfa" : "#22d3ee";
  const delays = [0, 120, 60, 180, 30];
  return (
    <div className="flex items-center gap-[3px] h-7" aria-hidden>
      {delays.map((d, i) => (
        <span
          key={i}
          style={{
            display:         "inline-block",
            width:           "3px",
            borderRadius:    "2px",
            backgroundColor: color,
            height:          active ? undefined : "3px",
            animation:       active ? `wave-bar 0.6s ease-in-out infinite alternate` : "none",
            animationDelay:  `${d}ms`,
          }}
          className={active ? "wave-bar" : ""}
        />
      ))}
      <style>{`
        @keyframes wave-bar {
          from { height: 3px;  }
          to   { height: 22px; }
        }
      `}</style>
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
const STATUS_MAP: Record<VStatus, { label: string; cls: string; dot: string }> = {
  idle:       { label: "Ready",       cls: "bg-white/5 text-white/40 border-white/10",          dot: "bg-white/30" },
  listening:  { label: "Listening…",  cls: "bg-purple-500/20 text-purple-300 border-purple-500/40", dot: "bg-purple-400 animate-pulse" },
  processing: { label: "Thinking…",   cls: "bg-amber-500/20 text-amber-300 border-amber-500/40",    dot: "bg-amber-400 animate-pulse" },
  speaking:   { label: "Speaking…",   cls: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",       dot: "bg-cyan-400 animate-pulse" },
};

function StatusBadge({ status }: { status: VStatus }) {
  const s = STATUS_MAP[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border transition-all ${s.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="text-left">
      <div className="inline-block px-3 py-2 rounded-lg bg-white/5 border border-white/10">
        <span className="flex gap-1 items-center">
          {[0, 150, 300].map((d) => (
            <span
              key={d}
              className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────
export function VoiceWidget() {
  const INITIAL_MESSAGES: Message[] = useMemo(() => [
    {
      role: "assistant",
      content:
        "Hi, I'm Prabhakar's portfolio assistant.\n\nI can answer questions about his projects, skills, and experience — or you can **switch to Voice** and just talk to me.\n\nTry: *\"Tell me about GitGuide\"* or *\"What's his latest role?\"*",
    },
  ], []);

  const [open,     setOpen]     = useState(false);
  const [mode,     setMode]     = useState<Mode>("chat");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);

  // Streaming chat state
  const [streamingContent, setStreamingContent] = useState("");
  const [isStreaming,      setIsStreaming]       = useState(false);

  // Voice state
  const [vStatus,     setVStatus]     = useState<VStatus>("idle");
  const [voiceMuted,  setVoiceMuted]  = useState(false);
  const [autoListen,  setAutoListen]  = useState(false); // hands-free loop
  const [transcript,  setTranscript]  = useState("");    // live interim text
  const [voices,      setVoices]      = useState<SpeechSynthesisVoice[]>([]);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef  = useRef<HTMLDivElement | null>(null);
  const inputRef        = useRef<HTMLInputElement | null>(null);

  // ── Load TTS voices (Chrome loads them async) ──────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  // ── Auto-scroll ────────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  // ── Cleanup on panel close ─────────────────────────────────────────────────
  useEffect(() => {
    if (!open) {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.abort();
      setVStatus("idle");
      setTranscript("");
      setStreamingContent("");
      setIsStreaming(false);
    }
  }, [open]);

  // ── Preferred TTS voice ────────────────────────────────────────────────────
  const preferredVoice = useMemo(() => {
    if (!voices.length) return null;
    return (
      voices.find((v) => /Google US English/i.test(v.name)) ||
      voices.find((v) => /Samantha|Alex/i.test(v.name)) ||
      voices.find((v) => v.lang === "en-US" && !v.localService) ||
      voices.find((v) => v.lang === "en-US") ||
      null
    );
  }, [voices]);

  // ── Speak text ─────────────────────────────────────────────────────────────
  const speak = useCallback(
    (text: string, onDone?: () => void) => {
      if (voiceMuted || !window.speechSynthesis) {
        onDone?.();
        return;
      }
      window.speechSynthesis.cancel();
      const utter    = new SpeechSynthesisUtterance(toPlainText(text));
      utter.rate     = 1.05;
      utter.pitch    = 1;
      if (preferredVoice) utter.voice = preferredVoice;
      utter.onstart  = () => setVStatus("speaking");
      utter.onend    = () => { setVStatus("idle"); onDone?.(); };
      utter.onerror  = () => { setVStatus("idle"); onDone?.(); };
      window.speechSynthesis.speak(utter);
    },
    [voiceMuted, preferredVoice]
  );

  // ── Stop recognition helper ────────────────────────────────────────────────
  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setVStatus((s) => (s === "listening" ? "idle" : s));
  }, []);

  // ── Start recognition ──────────────────────────────────────────────────────
  const startListening = useCallback(
    (onResult: (text: string) => void) => {
      const SR =
        (window as Window & { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
        (window as Window & { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;

      if (!SR) {
        setTranscript("❌ Speech recognition not supported. Try Chrome or Edge.");
        return;
      }

      window.speechSynthesis?.cancel();
      setVStatus("listening");
      setTranscript("");

      const rec         = new SR();
      rec.lang          = "en-US";
      rec.interimResults = true;
      rec.continuous    = false;
      rec.maxAlternatives = 1;

      rec.onresult = (e: SpeechRecognitionEvent) => {
        const interim = Array.from(e.results).map((r) => r[0].transcript).join("");
        setTranscript(interim);
        if (e.results[e.results.length - 1].isFinal) {
          rec.stop();
          setTranscript("");
          onResult(interim);
        }
      };

      rec.onerror = (e: SpeechRecognitionErrorEvent) => {
        if (e.error !== "aborted") setTranscript(`⚠ ${e.error}`);
        setVStatus("idle");
      };

      rec.onend = () => {
        if (vStatus === "listening") setVStatus("idle");
      };

      recognitionRef.current = rec;
      rec.start();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // ── Shared: call /api/assistant and return text ────────────────────────────
  const fetchReply = useCallback(async (msgs: Message[]): Promise<string> => {
    const res  = await fetch("/api/assistant", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ messages: msgs }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data?.message?.content as string) ?? "Sorry, I couldn't get a response.";
  }, []);

  // ── Chat send (with streaming word-reveal effect) ──────────────────────────
  const sendChat = useCallback(
    async (text?: string) => {
      const toSend = (text ?? input).trim();
      if (!toSend || loading || isStreaming) return;
      const next: Message[] = [...messages, { role: "user", content: toSend }];
      setMessages(next);
      setInput("");
      setLoading(true);

      try {
        const reply = await fetchReply(next);
        setLoading(false);

        // Streaming word-reveal
        setIsStreaming(true);
        setStreamingContent("");
        const words = reply.split(" ");
        for (let i = 0; i < words.length; i++) {
          await new Promise<void>((r) => setTimeout(r, 18));
          setStreamingContent(words.slice(0, i + 1).join(" "));
        }
        setIsStreaming(false);
        setStreamingContent("");
        setMessages((m) => [...m, { role: "assistant", content: reply }]);
      } catch {
        setLoading(false);
        setIsStreaming(false);
        setStreamingContent("");
        setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
      }
    },
    [input, loading, isStreaming, messages, fetchReply]
  );

  // ── Voice round-trip ───────────────────────────────────────────────────────
  const handleVoiceInput = useCallback(
    async (text: string) => {
      if (!text.trim()) { setVStatus("idle"); return; }
      const next: Message[] = [...messages, { role: "user", content: text }];
      setMessages(next);
      setVStatus("processing");
      try {
        const reply = await fetchReply(next);
        setMessages((m) => [...m, { role: "assistant", content: reply }]);
        speak(reply, () => {
          if (autoListen) {
            setTimeout(() => startListening(handleVoiceInput), 400);
          }
        });
      } catch {
        setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong." }]);
        setVStatus("idle");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages, fetchReply, speak, autoListen]
  );

  const toggleMic = () => {
    if (vStatus === "listening") {
      stopListening();
    } else if (vStatus === "idle") {
      startListening(handleVoiceInput);
    }
    // ignore taps while processing / speaking
  };

  const clearChat = () => {
    window.speechSynthesis?.cancel();
    recognitionRef.current?.abort();
    setMessages(INITIAL_MESSAGES);
    setStreamingContent("");
    setIsStreaming(false);
    setVStatus("idle");
    setTranscript("");
  };

  // ── Message list (shared between modes) ───────────────────────────────────
  const MessageList = () => (
    <div className="flex-1 overflow-y-auto space-y-3 pr-0.5 scroll-smooth">
      {messages.map((m, i) => (
        <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
          {m.role === "assistant" && (
            <div className="w-6 h-6 rounded-full bg-purple-600/60 flex items-center justify-center mr-2 mt-0.5 shrink-0">
              <BotMessageSquare className="size-3 text-white" />
            </div>
          )}
          <div
            className={`px-3 py-2 rounded-xl max-w-[80%] text-sm leading-relaxed ${
              m.role === "user"
                ? "bg-purple-600 text-white rounded-br-sm"
                : "bg-white/5 border border-white/10 text-foreground rounded-bl-sm"
            }`}
          >
            {m.role === "assistant" ? (
              <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0">
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                      >
                        {children}
                      </a>
                    ),
                    p:  ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5">{children}</ul>,
                    li: ({ children }) => <li>{children}</li>,
                    strong: ({ children }) => <strong className="text-white/90 font-semibold">{children}</strong>,
                  }}
                >
                  {m.content}
                </ReactMarkdown>
              </div>
            ) : (
              m.content
            )}
          </div>
        </div>
      ))}

      {/* Streaming word-reveal bubble */}
      {isStreaming && streamingContent && (
        <div className="flex justify-start">
          <div className="w-6 h-6 rounded-full bg-purple-600/60 flex items-center justify-center mr-2 mt-0.5 shrink-0">
            <BotMessageSquare className="size-3 text-white" />
          </div>
          <div className="px-3 py-2 rounded-xl rounded-bl-sm max-w-[80%] text-sm bg-white/5 border border-white/10 text-foreground leading-relaxed">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{streamingContent}</ReactMarkdown>
            </div>
            <span className="inline-block w-0.5 h-3.5 bg-purple-400 animate-pulse ml-0.5 align-middle" />
          </div>
        </div>
      )}

      {/* Loading dots (before streaming starts) */}
      {loading && !isStreaming && <TypingDots />}

      <div ref={messagesEndRef} />
    </div>
  );

  // ── FAB pulse when listening ───────────────────────────────────────────────
  const fabRing =
    vStatus === "listening"
      ? "ring-4 ring-red-400/50 animate-pulse"
      : vStatus === "speaking"
      ? "ring-4 ring-cyan-400/40"
      : "";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        {/* ── FAB ── */}
        <SheetTrigger asChild>
          <Button
            size="icon"
            className={`h-14 w-14 rounded-full shadow-xl bg-purple-600 hover:bg-purple-700 text-white transition-all ${fabRing}`}
            aria-label="Open AI assistant"
          >
            <BotMessageSquare className="size-6" />
          </Button>
        </SheetTrigger>

        {/* ── Panel ── */}
        <SheetContent className="flex flex-col w-[92vw] sm:w-[430px] gap-0 p-0 overflow-hidden">
          {/* Header */}
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SheetTitle className="text-sm font-semibold">Prabhakar&apos;s Assistant</SheetTitle>
              </div>
              <div className="flex items-center gap-2">
                {/* Clear */}
                <button
                  onClick={clearChat}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
                  title="Clear conversation"
                >
                  <RotateCcw className="size-3.5" />
                </button>
                {/* Mode toggle */}
                <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-white/5 border border-white/10">
                  <button
                    onClick={() => setMode("chat")}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      mode === "chat" ? "bg-purple-600 text-white shadow-sm" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    <MessageSquare className="size-3" />
                    Chat
                  </button>
                  <button
                    onClick={() => setMode("voice")}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      mode === "voice" ? "bg-purple-600 text-white shadow-sm" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    <Mic className="size-3" />
                    Voice
                  </button>
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* ══ CHAT MODE ══════════════════════════════════════════════════════ */}
          {mode === "chat" && (
            <>
              <div className="flex-1 overflow-hidden flex flex-col px-4 pt-3 pb-2 min-h-0">
                <MessageList />
              </div>
              <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2 shrink-0">
                <input
                  ref={inputRef}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-purple-500/60 transition-all"
                  placeholder="Ask anything…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChat()}
                  disabled={loading || isStreaming}
                />
                <Button
                  onClick={() => sendChat()}
                  disabled={loading || isStreaming || !input.trim()}
                  className="bg-purple-600 hover:bg-purple-700 text-white shrink-0 rounded-xl h-9 w-9 p-0"
                  size="icon"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </>
          )}

          {/* ══ VOICE MODE ═════════════════════════════════════════════════════ */}
          {mode === "voice" && (
            <>
              {/* Message history */}
              <div className="flex-1 overflow-hidden flex flex-col px-4 pt-3 pb-2 min-h-0">
                <MessageList />
              </div>

              {/* Live transcript */}
              {transcript && (
                <div className="mx-4 mb-2 px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm text-purple-200 italic shrink-0">
                  &ldquo;{transcript}&rdquo;
                </div>
              )}

              {/* Voice controls */}
              <div className="px-4 pt-3 pb-5 border-t border-white/10 shrink-0">
                <div className="flex flex-col items-center gap-4">
                  {/* Waveform + status */}
                  <div className="flex items-center gap-3">
                    <Waveform active={vStatus === "listening"} variant="mic" />
                    <StatusBadge status={vStatus} />
                    <Waveform active={vStatus === "speaking"}  variant="speaker" />
                  </div>

                  {/* Controls row */}
                  <div className="flex items-center gap-5">
                    {/* Mute */}
                    <button
                      onClick={() => {
                        setVoiceMuted((v) => !v);
                        if (!voiceMuted) window.speechSynthesis?.cancel();
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                      title={voiceMuted ? "Unmute" : "Mute"}
                    >
                      {voiceMuted
                        ? <VolumeX className="size-4 text-white/30" />
                        : <Volume2 className="size-4 text-white/60" />}
                    </button>

                    {/* Big mic button */}
                    <button
                      onClick={toggleMic}
                      disabled={vStatus === "processing" || vStatus === "speaking"}
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed ${
                        vStatus === "listening"
                          ? "bg-red-500 hover:bg-red-600 scale-110 ring-4 ring-red-400/40"
                          : "bg-purple-600 hover:bg-purple-700 ring-4 ring-purple-500/20 hover:scale-105"
                      }`}
                      aria-label={vStatus === "listening" ? "Stop listening" : "Start listening"}
                    >
                      {vStatus === "listening"
                        ? <MicOff className="size-6 text-white" />
                        : <Mic    className="size-6 text-white" />}
                    </button>

                    {/* Auto-listen toggle */}
                    <button
                      onClick={() => setAutoListen((v) => !v)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all text-xs font-bold ${
                        autoListen
                          ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                          : "bg-white/5 border-white/10 text-white/30 hover:text-white/60 hover:bg-white/10"
                      }`}
                      title={autoListen ? "Auto-listen ON — tap to turn off" : "Auto-listen OFF — tap to turn on (hands-free)"}
                    >
                      <span className="text-[10px] leading-none font-semibold">AUTO</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-white/25 text-center px-6">
                    {vStatus === "listening"
                      ? "Listening — tap mic to stop"
                      : vStatus === "processing"
                      ? "Getting response…"
                      : vStatus === "speaking"
                      ? autoListen ? "Will listen again when done" : "Playing response"
                      : autoListen
                      ? "Auto-listen on — tap mic to start"
                      : "Tap the mic and speak naturally"}
                  </p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
