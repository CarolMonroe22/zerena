import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { addEntry, deleteEntry, readDiary, type DiaryEntry } from "@/lib/diary";

export const Route = createFileRoute("/para-mi/diario")({
  head: () => ({ meta: [{ title: "Diario privado — Serena" }] }),
  component: Diario,
});

function Diario() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setEntries(readDiary());
  }, []);

  function save() {
    const t = text.trim();
    if (!t) return;
    addEntry(t);
    setText("");
    setEntries(readDiary());
  }

  function remove(id: string) {
    deleteEntry(id);
    setEntries(readDiary());
  }

  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Diario privado</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Lo que escribas se queda solo en este teléfono. Nadie más lo ve. Si borras la app o los datos del navegador, se borra también.
      </p>

      <div className="serena-card mt-6 p-5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="¿Qué te pasa por dentro hoy? Una palabra basta."
          rows={5}
          className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage"
        />
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={save}
            disabled={!text.trim()}
            className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground disabled:opacity-40"
          >
            Guardar
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {entries.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Cuando escribas, aparecerá aquí.
          </p>
        )}
        {entries.map((e) => (
          <article key={e.id} className="serena-card p-5">
            <div className="flex items-center justify-between gap-3">
              <time className="text-xs uppercase tracking-wider text-muted-foreground">
                {new Date(e.createdAt).toLocaleString("es-VE", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
              <button
                type="button"
                onClick={() => remove(e.id)}
                aria-label="Eliminar entrada"
                className="text-muted-foreground hover:text-alert"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {e.text}
            </p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
