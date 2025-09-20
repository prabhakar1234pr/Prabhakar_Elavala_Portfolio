"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ReactMarkdown from "react-markdown";

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
    
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, context: { suggest: "Suggest a project to explore" } }),
      });
      
      if (!res.ok) {
        console.error("API Error:", res.status, res.statusText);
        const errorText = await res.text();
        console.error("Error response:", errorText);
        setMessages((m) => [...m, { role: "assistant", content: `Sorry, there was an error: ${res.status} - ${res.statusText}` }]);
        return;
      }
      
      const data = await res.json();
      console.log("API Response:", data);
      
      if (data?.message) {
        setMessages((m) => [...m, data.message]);
      } else {
        console.error("No message in response:", data);
        setMessages((m) => [...m, { role: "assistant", content: "Sorry, I received an invalid response. Please try again." }]);
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessages((m) => [...m, { role: "assistant", content: `Network error: ${error}` }]);
    }
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
                <div className={`inline-block px-3 py-2 rounded-md max-w-[85%] ${m.role === "user" ? "bg-foreground text-background" : "glass"}`}>
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown 
                        components={{
                        // Custom link component that opens in new tab
                        a: ({ href, children }) => (
                          <a 
                            href={href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 underline"
                          >
                            {children}
                          </a>
                        ),
                        // Custom styling for headers
                        h2: ({ children }) => (
                          <h2 className="text-lg font-semibold mt-3 mb-2 first:mt-0">{children}</h2>
                        ),
                        // Custom styling for paragraphs
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                        // Custom styling for lists
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>
                        ),
                        li: ({ children }) => (
                          <li className="text-sm">{children}</li>
                        ),
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


