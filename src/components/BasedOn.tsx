export function BasedOn({ source }: { source: string }) {
  return (
    <p className="mt-6 px-1 text-xs leading-relaxed text-muted-foreground/80">
      Basado en: {source}.
    </p>
  );
}
