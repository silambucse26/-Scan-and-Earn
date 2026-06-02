import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth, POINTS_PER_RUPEE, MIN_REDEEM_POINTS } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Wallet, CheckCircle2, Clock, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/redeem")({
  head: () => ({ meta: [{ title: "Redeem Points — Cattle Scan & Earn" }] }),
  component: RedeemPage,
});

function RedeemPage() {
  const { user, ready, availablePointsFor, addRedeem, redeems } = useAuth();
  const router = useRouter();
  const [points, setPoints] = useState<number>(Math.max(MIN_REDEEM_POINTS, 0));
  const [upi, setUpi] = useState("");

  useEffect(() => {
    if (ready && !user) router.navigate({ to: "/login" });
  }, [ready, router, user]);
  if (!ready) return null;
  if (!user) return null;

  const available = availablePointsFor(user.id);
  const myRedeems = redeems.filter((r) => r.userId === user.id);
  const amount = Math.floor(points / POINTS_PER_RUPEE);
  const canRedeem = available >= MIN_REDEEM_POINTS;

  const submit = () => {
    if (!canRedeem)
      return toast.error(`You need at least ${MIN_REDEEM_POINTS} verified points to redeem`);
    if (points < MIN_REDEEM_POINTS) return toast.error(`Minimum ${MIN_REDEEM_POINTS} points`);
    if (points > available) return toast.error("Not enough available points");
    if (!/^[\w.-]{2,}@[\w.-]{2,}$/.test(upi.trim()))
      return toast.error("Enter a valid UPI ID (e.g. name@bank)");
    addRedeem({ points, amount, upiId: upi.trim() });
    toast.success("Redeem request sent to admin", {
      description: `₹${amount} will be paid to ${upi}`,
    });
    setPoints(MIN_REDEEM_POINTS);
    setUpi("");
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        to="/profile"
        className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Profile
      </Link>

      <div className="mt-4 rounded-3xl border bg-card p-8 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
            <Wallet className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">Redeem Points</h1>
            <p className="text-sm text-muted-foreground">
              {POINTS_PER_RUPEE} points = ₹1 · Minimum {MIN_REDEEM_POINTS} points to redeem
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Stat label="Available Points" value={available.toString()} />
          <Stat label="Min Redeem" value={MIN_REDEEM_POINTS.toString()} />
          <Stat label="You Will Earn" value={`₹${amount}`} accent />
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <Label>Points to redeem</Label>
            <Input
              type="number"
              min={MIN_REDEEM_POINTS}
              max={available}
              value={points}
              onChange={(e) => setPoints(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1.5 rounded-xl"
              disabled={!canRedeem}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              You will receive <span className="font-semibold text-primary">₹{amount}</span> for{" "}
              {points} points
            </p>
          </div>
          <div>
            <Label>UPI ID</Label>
            <Input
              placeholder="yourname@bank"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              className="mt-1.5 rounded-xl"
              disabled={!canRedeem}
            />
          </div>
          <Button
            onClick={submit}
            disabled={!canRedeem}
            className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow shadow-glow"
          >
            Submit Redeem Request
          </Button>
          {!canRedeem && (
            <p className="text-center text-xs text-muted-foreground">
              Earn at least {MIN_REDEEM_POINTS} verified points to unlock redemption.
            </p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold">My Redeem Requests</h2>
        {myRedeems.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No redeem requests yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {myRedeems.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border bg-card p-4 shadow-soft flex items-center justify-between gap-3 flex-wrap"
              >
                <div>
                  <div className="font-semibold">
                    ₹{r.amount}{" "}
                    <span className="text-xs text-muted-foreground font-normal">
                      ({r.points} pts → {r.upiId})
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Requested {new Date(r.date).toLocaleString()}
                  </div>
                  {r.status === "paid" && r.paidDate && (
                    <div className="text-xs text-primary mt-0.5">
                      Payment successful · sent by admin on {new Date(r.paidDate).toLocaleString()}
                    </div>
                  )}
                </div>
                {r.status === "paid" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary text-xs font-medium px-3 py-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/15 text-warning text-xs font-medium px-3 py-1.5">
                    <Clock className="h-3.5 w-3.5" /> Pending admin approval
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${accent ? "bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20" : "bg-card"}`}
    >
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${accent ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}
