import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, Microscope } from "lucide-react";

export const Route = createFileRoute("/vet/")({
  head: () => ({ meta: [{ title: "Veterinarian Dashboard" }] }),
  component: VetHome,
});

function VetHome() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold">Veterinarian Upload</h1>
      <p className="text-muted-foreground mt-2">Choose your contribution path.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link to="/vet/diseases" className="glass-card rounded-3xl p-8 hover:shadow-elegant transition group">
          <Microscope className="h-10 w-10 text-primary group-hover:scale-110 transition" />
          <h2 className="mt-4 text-2xl font-bold">Select Disease</h2>
          <p className="mt-2 text-muted-foreground">Pick from 10 disease categories and upload annotated images.</p>
        </Link>
        <Link to="/vet/upload" className="glass-card rounded-3xl p-8 hover:shadow-elegant transition group">
          <ClipboardList className="h-10 w-10 text-primary group-hover:scale-110 transition" />
          <h2 className="mt-4 text-2xl font-bold">Upload Images With Description</h2>
          <p className="mt-2 text-muted-foreground">Free-form veterinary case uploads with descriptions.</p>
        </Link>
      </div>
    </div>
  );
}
