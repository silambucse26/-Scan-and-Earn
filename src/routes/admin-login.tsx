import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, LockKeyhole, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-login")({
  head: () => ({ meta: [{ title: "Admin Login — Cattle Scan" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { loginAdmin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doAdminLogin = async () => {
    if (!email.trim()) return toast.error("Enter the admin email");
    if (!password.trim()) return toast.error("Enter the admin password");

    const result = await loginAdmin(email, password);
    if (!result.ok) return toast.error(result.error || "Admin login failed");

    toast.success("Admin signed in");
    router.navigate({ to: "/admin" });
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <section className="rounded-[2rem] border border-primary/15 bg-[radial-gradient(circle_at_top_left,_rgba(36,172,99,0.18),_transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.94),rgba(244,251,246,0.92))] p-8 shadow-elegant lg:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <ShieldCheck className="h-3.5 w-3.5" /> Admin Console
        </div>
        <h1 className="mt-6 max-w-xl text-4xl font-bold tracking-tight md:text-5xl">
          Review uploads, approve rewards, and track platform growth.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          This login is separate from user accounts. Admin access opens the verification queue,
          redemption review, and analytics dashboard.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Verification Queue", value: "Realtime", note: "Submission review" },
            { label: "Reward Control", value: "Secure", note: "Redeem approvals" },
            { label: "Platform Analytics", value: "Live", note: "Users and uploads" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border bg-background/78 p-4 shadow-soft">
              <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {item.label}
              </div>
              <div className="mt-3 text-2xl font-bold text-primary">{item.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{item.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border bg-card p-8 shadow-soft lg:p-10">
        <h2 className="text-2xl font-bold">Admin sign in</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the configured admin credentials to access the dashboard.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <Label>Email</Label>
            <div className="relative mt-1.5">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-12 rounded-2xl pl-10"
                placeholder="admin@cattlescan.app"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Password</Label>
            <div className="relative mt-1.5">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                className="h-12 rounded-2xl pl-10"
                placeholder="Admin password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={doAdminLogin}
            className="h-12 w-full rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow"
          >
            Open Admin Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/45 p-4 text-sm text-muted-foreground">
          User accounts continue to sign in from{" "}
          <a href="/login" className="font-semibold text-primary">
            the user login page
          </a>
          .
        </div>
      </section>
    </div>
  );
}
