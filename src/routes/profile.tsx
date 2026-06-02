import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth, POINTS_PER_RUPEE } from "@/lib/auth-context";
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Upload,
  Wallet,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — Cattle Scan & Earn" }] }),
  component: Profile,
});

function Profile() {
  const { user, ready, submissions, availablePointsFor, verifiedPointsFor } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (ready && !user) router.navigate({ to: "/login" });
  }, [ready, router, user]);
  if (!ready) return null;
  if (!user) return null;

  const mine = submissions.filter((s) => s.userId === user.id);
  const verified = verifiedPointsFor(user.id);
  const available = availablePointsFor(user.id);
  const pending = mine
    .filter((s) => s.status === "pending" || s.status === "accepted")
    .reduce((a, b) => a + b.points, 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <aside className="rounded-3xl border bg-card p-6 h-fit shadow-soft">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-3xl font-bold shadow-glow">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 text-xl font-bold">{user.fullName}</h2>
          <p className="text-sm text-muted-foreground capitalize">{user.userType}</p>
          <div className="mt-6 space-y-3 text-sm">
            <Row label="Phone" value={user.phone} />
            {user.email && <Row label="Email" value={user.email} />}
            <Row label="Location" value={user.location} />
            <Row label="Joined" value={new Date(user.joinDate).toLocaleDateString()} />
          </div>

          <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Wallet Balance</div>
                <div className="text-2xl font-bold text-primary">{available} pts</div>
                <div className="text-xs text-muted-foreground">
                  ≈ ₹{Math.floor(available / POINTS_PER_RUPEE)}
                </div>
              </div>
              <Wallet className="h-8 w-8 text-primary/60" />
            </div>
            <Link to="/redeem">
              <Button size="sm" className="mt-3 w-full rounded-xl bg-primary hover:bg-primary/90">
                Redeem Points
              </Button>
            </Link>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat icon={Award} label="Verified Points" value={verified} accent />
            <Stat icon={Clock} label="Pending Points" value={pending} />
            <Stat icon={Wallet} label="Available to Redeem" value={available} />
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">My Submissions ({mine.length})</h3>
              <Link to="/select-role">
                <Button
                  size="sm"
                  className="rounded-xl bg-gradient-to-r from-primary to-primary-glow"
                >
                  <Upload className="h-4 w-4 mr-1.5" />
                  New Upload
                </Button>
              </Link>
            </div>
            {mine.length === 0 ? (
              <div className="mt-8 text-center text-muted-foreground py-12">
                No submissions yet. Start uploading to earn rewards!
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {mine.map((s) => (
                  <SubmissionCard key={s.id} s={s} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-soft ${accent ? "bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20" : "bg-card"}`}
    >
      <Icon className={`h-5 w-5 ${accent ? "text-primary" : "text-muted-foreground"}`} />
      <div className={`mt-3 text-3xl font-bold ${accent ? "text-primary" : ""}`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function SubmissionCard({ s }: { s: import("@/lib/auth-context").Submission }) {
  const statusStyles: Record<string, string> = {
    pending: "bg-warning/15 text-warning",
    accepted: "bg-sky-100 text-sky-700",
    verified: "bg-primary/15 text-primary",
    rejected: "bg-destructive/15 text-destructive",
  };
  const StatusIcon =
    s.status === "verified"
      ? CheckCircle2
      : s.status === "rejected"
        ? XCircle
        : s.status === "accepted"
          ? ShieldCheck
          : Clock;
  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium">
            {s.diseaseName ?? (s.category === "feed" ? "Feed Upload" : "Disease Upload")}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {new Date(s.date).toLocaleString()} · {s.items.length} images · {s.points} pts
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[s.status]}`}
        >
          <StatusIcon className="h-3 w-3" /> {s.status}
        </span>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {s.items.slice(0, 6).map((it, idx) => (
          <div key={idx} className="relative">
            <img
              src={it.imageUrl}
              alt={it.label}
              className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
            />
            <span
              className={`absolute bottom-1 right-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${it.status === "accepted" ? "bg-primary text-primary-foreground" : it.status === "rejected" ? "bg-destructive text-destructive-foreground" : "bg-warning text-black"}`}
            >
              {it.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
