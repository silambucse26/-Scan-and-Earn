import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { ArrowRight, Phone } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Cattle Scan & Earn" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { loginWithPhone } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const doPhone = async () => {
    if (!/^\d{10}$/.test(phone)) return toast.error("Enter a valid 10-digit phone number");
    if (!password) return toast.error("Enter your password");
    const res = await loginWithPhone(phone, password);
    if (!res.ok) return toast.error(res.error || "Login failed");
    toast.success("Welcome back!");
    router.navigate({ to: "/" });
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <section className="rounded-[2rem] border border-primary/15 bg-[radial-gradient(circle_at_top_left,_rgba(36,172,99,0.18),_transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.95),rgba(243,250,244,0.92))] p-8 shadow-elegant lg:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <Phone className="h-3.5 w-3.5" /> User Access
        </div>
        <h1 className="mt-6 max-w-xl text-4xl font-bold tracking-tight md:text-5xl">
          Sign in to upload cattle data, track rewards, and manage submissions.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Farmers and veterinarians use this login. The app keeps your uploads, verification status,
          and wallet balance in one place.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Upload workflow", value: "Fast", note: "Feed and disease images" },
            { label: "Verification", value: "Tracked", note: "Pending to approved" },
            { label: "Rewards", value: "Visible", note: "Points and redemption" },
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
        <h2 className="text-2xl font-bold">User sign in</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Login with your registered phone number and password.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <Label>Phone Number</Label>
            <Input
              className="mt-1.5 h-12 rounded-2xl"
              placeholder="10-digit mobile"
              value={phone}
              onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              className="mt-1.5 h-12 rounded-2xl"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button
            onClick={doPhone}
            className="h-12 w-full rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow"
          >
            Login <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-5 text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link to="/signup" className="font-semibold text-primary">
            Sign up
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/45 p-4 text-sm text-muted-foreground">
          Admin access is separate.{" "}
          <a href="/admin-login" className="font-semibold text-primary">
            Open admin login
          </a>
          .
        </div>
      </section>
    </div>
  );
}
