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
    const text = `${message}\n\n— Zerena`;
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
    <section className="serena-card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <IconBubble>
          <Sun size={16} />
        </IconBubble>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Una luz para hoy</p>
      </div>
      <p
        className="mt-4 font-serif font-normal text-foreground/90"
        style={{ fontSize: "1.3125rem", lineHeight: 1.65, letterSpacing: "-0.005em" }}
      >
        {message || "\u00a0"}
      </p>
      <div className="mt-5 flex items-center justify-end">
        <button
          type="button"
          onClick={share}
          aria-label="Compartir la luz de hoy"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Share2 size={12} />
          {copied ? "Copiado" : "Compartir"}
        </button>
      </div>
    </section>
  );
}
