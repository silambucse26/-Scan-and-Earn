import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — Cattle Scan & Earn" }] }),
  component: SignupPage,
});

type Role = "farmer" | "veterinarian";

function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    password: "",
    userType: "farmer" as Role,
    location: "",
  });

  const submit = async () => {
    const res = await signup(form);
    if (!res.ok) return toast.error(res.error || "Signup failed");
    toast.success("Account created!");
    router.navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="glass-card rounded-3xl p-8 shadow-elegant">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join and start earning by contributing.</p>

        <div className="mt-6 space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input className="mt-1.5 rounded-xl" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input className="mt-1.5 rounded-xl" placeholder="10 digits" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" className="mt-1.5 rounded-xl" placeholder="At least 6 characters"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div>
            <Label>I am a</Label>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(["farmer", "veterinarian"] as Role[]).map((t) => (
                <button key={t} type="button" onClick={() => setForm({ ...form, userType: t })}
                  className={`rounded-xl border p-3 text-sm font-medium capitalize transition ${form.userType === t ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"}`}>
                  {t === "farmer" ? "👨‍🌾 Farmer" : "👨‍⚕️ Veterinarian"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>Location</Label>
            <Input className="mt-1.5 rounded-xl" placeholder="City, State" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <Button onClick={submit} className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow shadow-glow">Create Account</Button>
          <p className="text-center text-sm text-muted-foreground">
            Have an account? <Link to="/login" className="text-primary font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
