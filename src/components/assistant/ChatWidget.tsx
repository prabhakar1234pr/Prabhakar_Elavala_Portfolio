"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type Message = { role: "user" | "assistant"; content: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! Ask about my projects or experience." },
  ]);
  const [input, setInput] = useState("");

  async function send() {
    if (!input.trim()) return;
    const next = [...messages, { role: "user", content: input } as Message];
    setMessages(next);
    setInput("");
    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next, context: { suggest: "Suggest a project to explore" } }),
    });
    const data = await res.json();
    if (data?.message) setMessages((m) => [...m, data.message]);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="lg" className="shadow-lg">Chat</Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col w-[90vw] sm:w-[420px]">
          <SheetHeader>
            <SheetTitle>AI Assistant</SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex-1 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div className={`inline-block px-3 py-2 rounded-md ${m.role === "user" ? "bg-foreground text-background" : "glass"}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              className="flex-1 rounded-md border bg-background px-3 py-2"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button onClick={send}>Send</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}


