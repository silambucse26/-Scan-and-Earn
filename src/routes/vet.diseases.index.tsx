import { createFileRoute, Link } from "@tanstack/react-router";
import { DISEASES } from "@/lib/diseases";

export const Route = createFileRoute("/vet/diseases/")({
  head: () => ({ meta: [{ title: "Select Disease — Veterinarian" }] }),
  component: VetDiseases,
});

function VetDiseases() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold">Select a Disease Category</h1>
      <p className="text-muted-foreground mt-2">Choose the disease your dataset relates to.</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DISEASES.map((d) => (
          <Link key={d.slug} to="/vet/diseases/$slug" params={{ slug: d.slug }}
            className="glass-card rounded-2xl p-6 hover:shadow-elegant transition group">
            <div className="text-4xl">{d.emoji}</div>
            <h3 className="mt-3 font-semibold text-lg">{d.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d.short}</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">Upload images →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
