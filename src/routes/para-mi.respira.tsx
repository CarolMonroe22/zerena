import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BreathingCircle } from "@/components/BreathingCircle";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";

export const Route = createFileRoute("/para-mi/respira")({
  head: () => ({
    meta: [{ title: "Respira conmigo — Serena" }],
  }),
  component: () => (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Respira conmigo</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Siéntate o recuéstate si puedes. Vamos despacio.
      </p>
      <div className="mt-10">
        <BreathingCircle />
      </div>
          <BasedOn source="PAP (OMS/OPS)" />
    </PageShell>
  ),
});
