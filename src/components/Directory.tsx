import { Phone, ExternalLink } from "lucide-react";
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

              const isUrl = !!e.url;
              const href = isUrl ? e.url! : e.tel!;
              const linkProps = isUrl
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <li key={e.name + (e.phone ?? e.url ?? "")}>
                  <a href={href} {...linkProps} className={`${base} ${tone}`}>
                    <div className="min-w-0">
                      <p
                        className={`truncate font-medium ${urgent ? "text-alert" : "text-foreground"}`}
                      >
                        {e.name}
                      </p>
                      {e.detail && (
                        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                          {e.detail}
                        </p>
                      )}
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm tabular-nums ${
                        urgent
                          ? "bg-alert text-destructive-foreground"
                          : "bg-card text-foreground ring-1 ring-border"
                      }`}
                    >
                      {isUrl ? (
                        <>
                          <ExternalLink size={13} />
                          <span className="not-tabular">{e.urlLabel ?? "Ingresar"}</span>
                        </>
                      ) : (
                        <>
                          <Phone size={13} />
                          {e.phone}
                        </>
                      )}
                    </span>
                  </a>
                  {e.infoUrl && (
                    <a
                      href={e.infoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 ml-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      <ExternalLink size={11} />
                      {e.infoLabel ?? "Más info"}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <p className="rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
        Por ahora solo tenemos confirmada la Protección Civil de Yaracuy. Si estás en otro estado,
        como La Guaira, marca el <span className="font-medium text-alert">911</span> o la Protección
        Civil nacional <span className="tabular-nums">0800-7248451</span>.
      </p>
      <p className="rounded-2xl border border-border bg-card p-4 text-center text-sm text-muted-foreground">
        Si tú o alguien corre peligro inmediato, llama al{" "}
        <span className="font-medium text-alert">911</span>.
      </p>
      <p className="px-2 text-center text-xs leading-relaxed text-muted-foreground">
        Si llamas desde el exterior, marca con <span className="tabular-nums">+58</span>. Algunas
        operadoras ofrecen llamadas gratis a Venezuela en estos días: revisa la tuya.
      </p>
    </div>
  );
}
