import { Phone } from "lucide-react";
import { DIRECTORY } from "@/lib/directory";

export function Directory() {
  return (
    <div className="space-y-8">
      {DIRECTORY.map((section) => (
        <section key={section.title}>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {section.title}
          </h2>
          <ul className="space-y-2.5">
            {section.entries.map((e) => {
              const urgent = e.highlight === "urgent";
              const primary = e.highlight === "primary";
              const base =
                "flex items-center justify-between gap-4 rounded-2xl border p-4 transition-colors";
              const tone = urgent
                ? "border-alert/30 bg-[oklch(0.97_0.025_28)] hover:bg-[oklch(0.95_0.03_28)]"
                : primary
                  ? "border-[oklch(0.78_0.045_150)] bg-sage-soft hover:bg-[oklch(0.91_0.022_150)]"
                  : "border-border bg-card hover:bg-secondary";
              return (
                <li key={e.name + e.phone}>
                  <a href={e.tel} className={`${base} ${tone}`}>
                    <div className="min-w-0">
                      <p
                        className={`truncate font-medium ${urgent ? "text-alert" : "text-foreground"}`}
                      >
                        {e.name}
                      </p>
                      {e.detail && (
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">{e.detail}</p>
                      )}
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm tabular-nums ${
                        urgent
                          ? "bg-alert text-destructive-foreground"
                          : "bg-card text-foreground ring-1 ring-border"
                      }`}
                    >
                      <Phone size={13} />
                      {e.phone}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <p className="rounded-2xl border border-border bg-card p-4 text-center text-sm text-muted-foreground">
        Si tú o alguien corre peligro inmediato, llama al <span className="font-medium text-alert">911</span>.
      </p>
    </div>
  );
}
