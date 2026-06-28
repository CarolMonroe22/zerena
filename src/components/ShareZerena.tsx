import { useState } from "react";
import { Heart, HomeIcon, Smile, Megaphone, Link2, Check } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SHARE_CASES, type ShareCase } from "@/lib/share-messages";

const ICONS: Record<string, React.ReactNode> = {
  amor: <Heart size={18} />,
  familia: <HomeIcon size={18} />,
  amigo: <Smile size={18} />,
  redes: <Megaphone size={18} />,
  enlace: <Link2 size={18} />,
};

function currentUrl() {
  if (typeof window === "undefined") return "https://zerena";
  return window.location.origin;
}

export function ShareZerena() {
  const [open, setOpen] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);

  async function handle(c: ShareCase) {
    const text = c.build(currentUrl());

    // Copiar enlace: siempre al portapapeles, sin abrir el menú nativo.
    if (c.id !== "enlace" && typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ text });
        setOpen(false);
        return;
      } catch {
        /* el usuario canceló: caemos a copiar */
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setDoneId(c.id);
      window.setTimeout(() => setDoneId(null), 1800);
    } catch {
      /* noop */
    }
  }

  const personal = SHARE_CASES.filter((c) => c.group === "personal");
  const abierto = SHARE_CASES.filter((c) => c.group === "abierto");

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Compartir Zerena
        </button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[640px]">
        <DrawerHeader className="text-center sm:text-center">
          <DrawerTitle className="font-serif text-xl font-normal">Compartir Zerena</DrawerTitle>
          <DrawerDescription>Las palabras ya están listas. Tú eliges con quién.</DrawerDescription>
        </DrawerHeader>

        <div className="space-y-5 px-4 pb-8">
          <Group label="A alguien en particular">
            {personal.map((c) => (
              <Option key={c.id} c={c} done={doneId === c.id} onClick={() => handle(c)} />
            ))}
          </Group>
          <Group label="Abierto">
            {abierto.map((c) => (
              <Option key={c.id} c={c} done={doneId === c.id} onClick={() => handle(c)} />
            ))}
          </Group>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 px-1 text-xs uppercase tracking-wider text-muted-foreground/70">{label}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Option({ c, done, onClick }: { c: ShareCase; done: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="serena-card flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-secondary"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground/70">
        {done ? <Check size={18} className="text-alert" /> : ICONS[c.id]}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-base text-foreground">{c.label}</span>
        <span className="mt-0.5 block text-sm text-muted-foreground">
          {done ? "Copiado al portapapeles" : c.hint}
        </span>
      </span>
    </button>
  );
}
