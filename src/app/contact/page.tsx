"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  async function onSubmit(formData: FormData) {
    setLoading(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) toast.success("Message sent");
    else toast.error(data.error || "Failed to send");
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-12">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <form
        className="mt-6 space-y-4"
        action={async (fd) => onSubmit(fd)}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" required rows={6} />
        </div>
        <Button disabled={loading} type="submit">{loading ? "Sending..." : "Send"}</Button>
      </form>
    </div>
  );
}


