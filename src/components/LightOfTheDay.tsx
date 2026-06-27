import { Share2, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { getTodayMessage } from "@/lib/light-messages";
import { IconBubble } from "./IconBubble";

export function LightOfTheDay() {
  const [message, setMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMessage(getTodayMessage());
  }, []);

  async function share() {
    const text = `${message}\n\n— Serena`;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        /* el usuario canceló */
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* noop */
    }
  }

  return (
    <section className="serena-card p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <IconBubble>
          <Sun size={18} />
        </IconBubble>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Una luz para hoy</p>
      </div>
      <p className="mt-5 font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
        {message || "\u00a0"}
      </p>
      <div className="mt-6 flex items-center justify-end">
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
        >
          <Share2 size={14} />
          {copied ? "Copiado" : "Compartir"}
        </button>
      </div>
    </section>
  );
}
