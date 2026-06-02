import { createFileRoute, Link } from "@tanstack/react-router";
import { Wheat, Activity } from "lucide-react";

export const Route = createFileRoute("/farmer/")({
  head: () => ({ meta: [{ title: "Farmer Dashboard — Upload" }] }),
  component: FarmerHome,
});

function FarmerHome() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold">Farmer Upload</h1>
      <p className="text-muted-foreground mt-2">Choose what you'd like to upload today.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link to="/farmer/feed" className="glass-card rounded-3xl p-8 hover:shadow-elegant transition group">
          <Wheat className="h-10 w-10 text-primary group-hover:scale-110 transition" />
          <h2 className="mt-4 text-2xl font-bold">Feed Image Upload</h2>
          <p className="mt-2 text-muted-foreground">Upload cattle feed images with feed names.</p>
          <p className="mt-3 text-sm text-primary font-medium">Earn 20 points per image</p>
        </Link>
        <Link to="/farmer/disease" className="glass-card rounded-3xl p-8 hover:shadow-elegant transition group">
          <Activity className="h-10 w-10 text-primary group-hover:scale-110 transition" />
          <h2 className="mt-4 text-2xl font-bold">Disease Image Upload</h2>
          <p className="mt-2 text-muted-foreground">Upload cattle disease images with descriptions.</p>
          <p className="mt-3 text-sm text-primary font-medium">Earn 20 points per image</p>
        </Link>
      </div>
    </div>
  );
}
