import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { Wheat, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/select-role")({
  component: SelectRole,
});

function SelectRole() {
  const { user, ready } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (ready && !user) router.navigate({ to: "/login" });
  }, [ready, router, user]);
  if (!ready) return null;
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold text-center">How would you like to contribute?</h1>
      <p className="text-center text-muted-foreground mt-3">Select your role to begin uploading.</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Link
          to="/farmer"
          className="glass-card rounded-3xl p-10 hover:shadow-elegant transition group"
        >
          <Wheat className="h-12 w-12 text-primary group-hover:scale-110 transition" />
          <h3 className="mt-4 text-2xl font-bold">Continue as Farmer</h3>
          <p className="mt-2 text-muted-foreground">
            Upload feed and disease images from your cattle.
          </p>
        </Link>
        <Link
          to="/vet"
          className="glass-card rounded-3xl p-10 hover:shadow-elegant transition group"
        >
          <Stethoscope className="h-12 w-12 text-primary group-hover:scale-110 transition" />
          <h3 className="mt-4 text-2xl font-bold">Continue as Veterinarian</h3>
          <p className="mt-2 text-muted-foreground">
            Submit professionally annotated disease datasets.
          </p>
        </Link>
      </div>
    </div>
  );
}
