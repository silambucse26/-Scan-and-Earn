import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth, type Submission, type AppUser } from "@/lib/auth-context";
import {
  ArrowLeft,
  BadgeIndianRupee,
  Check,
  CheckCircle2,
  Clock,
  Hourglass,
  ImageIcon,
  Layers3,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard" }] }),
  component: Admin,
});

type Tab = "users" | "redeems";

function Admin() {
  const {
    user,
    ready,
    users,
    submissions,
    redeems,
    reviewSubmissionItem,
    markRedeemPaid,
    getUserById,
  } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("users");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.navigate({ to: "/admin-login" });
      return;
    }
    if (user.userType !== "admin") router.navigate({ to: "/" });
  }, [ready, router, user]);
  if (!ready) return null;
  if (!user || user.userType !== "admin") return null;

  const totalImages = submissions.reduce((s, x) => s + x.items.length, 0);
  const pending = submissions.filter(
    (s) => s.status === "pending" || s.status === "accepted",
  ).length;
  const verified = submissions.filter((s) => s.status === "verified").length;
  const pendingRedeems = redeems.filter((r) => r.status === "pending").length;
  const totalPayout = redeems.reduce((sum, redeem) => sum + redeem.amount, 0);
  const approvalRate =
    submissions.length === 0 ? 0 : Math.round((verified / submissions.length) * 100);
  const recentQueue = submissions.slice(0, 5);

  const selectedUser = selectedUserId ? getUserById(selectedUserId) : null;
  const userSubs = selectedUserId ? submissions.filter((s) => s.userId === selectedUserId) : [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <section className="overflow-hidden rounded-[2rem] border border-primary/15 bg-[radial-gradient(circle_at_top_left,_rgba(36,172,99,0.2),_transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.97),rgba(242,250,245,0.92))] p-8 shadow-elegant">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Admin Operations
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Manage user records, review uploads, clear the redemption queue, and monitor
              application activity from one screen.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <PulseStat
              icon={Hourglass}
              label="Review Queue"
              value={String(pending)}
              note="Pending and accepted"
            />
            <PulseStat
              icon={BadgeIndianRupee}
              label="Pending Redeems"
              value={String(pendingRedeems)}
              note="Awaiting payout"
            />
            <PulseStat
              icon={TrendingUp}
              label="Approval Rate"
              value={`${approvalRate}%`}
              note="Verified submissions"
            />
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          { icon: Users, label: "Total Users", value: users.length },
          { icon: ImageIcon, label: "Total Images", value: totalImages },
          { icon: Clock, label: "Pending Reviews", value: pending },
          { icon: CheckCircle2, label: "Verified", value: verified },
          {
            icon: BadgeIndianRupee,
            label: "Payout Volume",
            value: `Rs ${Math.round(totalPayout)}`,
          },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border bg-card p-5 shadow-soft">
            <c.icon className="h-5 w-5 text-primary" />
            <div className="mt-3 text-3xl font-bold">{c.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-[2rem] border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Operations workspace</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Open user records or payment requests and complete the next action.
              </p>
            </div>

            <div className="inline-flex rounded-xl bg-muted p-1">
              <TabBtn
                active={tab === "users"}
                onClick={() => {
                  setTab("users");
                  setSelectedUserId(null);
                }}
              >
                <Users className="mr-2 inline h-4 w-4" />
                Users
              </TabBtn>
              <TabBtn active={tab === "redeems"} onClick={() => setTab("redeems")}>
                <Wallet className="mr-2 inline h-4 w-4" />
                Redeems
                {pendingRedeems > 0 && (
                  <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    {pendingRedeems}
                  </span>
                )}
              </TabBtn>
            </div>
          </div>

          {tab === "users" && !selectedUser && (
            <UsersList users={users} submissions={submissions} onSelect={setSelectedUserId} />
          )}

          {tab === "users" && selectedUser && (
            <UserDetail
              user={selectedUser}
              subs={userSubs}
              onBack={() => setSelectedUserId(null)}
              onReview={async (submissionId, itemIndex, status) => {
                const result = await reviewSubmissionItem(submissionId, itemIndex, status);
                if (!result.ok) {
                  toast.error(result.error || "Could not update image review");
                  return;
                }
                const msg = status === "accepted" ? "Image accepted" : "Image rejected";
                toast.success(msg);
              }}
            />
          )}

          {tab === "redeems" && (
            <RedeemList
              redeems={redeems}
              getUserById={getUserById}
              onPaid={(id) => {
                markRedeemPaid(id);
                toast.success("Payment marked as sent");
              }}
            />
          )}
        </section>

        <section className="space-y-6">
          <div className="rounded-[2rem] border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Layers3 className="h-4 w-4" /> Live queue snapshot
            </div>
            <div className="mt-5 space-y-3">
              {recentQueue.map((submission) => (
                <div key={submission.id} className="rounded-2xl border bg-secondary/35 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium">
                      {submission.diseaseName ??
                        (submission.category === "feed" ? "Feed upload" : "Disease upload")}
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
                      {submission.status}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {submission.items.length} images • {submission.points} pts •{" "}
                    {new Date(submission.date).toLocaleString()}
                  </div>
                </div>
              ))}
              {recentQueue.length === 0 && (
                <div className="rounded-2xl border border-dashed p-5 text-sm text-muted-foreground">
                  No submission data yet.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-bold">Admin notes</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="rounded-2xl border bg-secondary/35 px-4 py-3">
                Approve uploads in two steps: accept for review, then verify to credit points.
              </div>
              <div className="rounded-2xl border bg-secondary/35 px-4 py-3">
                User detail cards group submissions per account, which makes support follow-up
                easier.
              </div>
              <div className="rounded-2xl border bg-secondary/35 px-4 py-3">
                Redeem requests remain visible until marked paid, so payout backlog is clear.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function PulseStat({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border bg-background/75 p-4 shadow-soft">
      <Icon className="h-5 w-5 text-primary" />
      <div className="mt-3 text-2xl font-bold">{value}</div>
      <div className="text-sm font-medium">{label}</div>
      <div className="mt-1 text-xs text-muted-foreground">{note}</div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${active ? "bg-background shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground"}`}
    >
      {children}
    </button>
  );
}

function UsersList({
  users,
  submissions,
  onSelect,
}: {
  users: AppUser[];
  submissions: Submission[];
  onSelect: (id: string) => void;
}) {
  if (users.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border bg-card p-10 text-center text-muted-foreground shadow-soft">
        No registered users yet.
      </div>
    );
  }
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((u) => {
        const subs = submissions.filter((s) => s.userId === u.id);
        const today = new Date().toDateString();
        const todayCount = subs.filter((s) => new Date(s.date).toDateString() === today).length;
        const pendingCount = subs.filter(
          (s) => s.status === "pending" || s.status === "accepted",
        ).length;
        return (
          <button
            key={u.id}
            onClick={() => onSelect(u.id)}
            className="text-left rounded-2xl border bg-card p-5 shadow-soft hover:shadow-elegant hover:border-primary/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-lg font-bold">
                {u.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{u.fullName}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {u.userType} · {u.phone}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 text-xs">
              <span className="rounded-full bg-muted px-2.5 py-1">Total {subs.length}</span>
              {todayCount > 0 && (
                <span className="rounded-full bg-primary/10 text-primary px-2.5 py-1">
                  +{todayCount} today
                </span>
              )}
              {pendingCount > 0 && (
                <span className="rounded-full bg-warning/15 text-warning px-2.5 py-1">
                  {pendingCount} to review
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function UserDetail({
  user,
  subs,
  onBack,
  onReview,
}: {
  user: AppUser;
  subs: Submission[];
  onBack: () => void;
  onReview: (
    submissionId: string,
    itemIndex: number,
    status: "accepted" | "rejected",
  ) => Promise<void>;
}) {
  return (
    <div className="mt-6">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
      >
        <ArrowLeft className="h-4 w-4" /> Back to users
      </button>

      <div className="mt-4 rounded-3xl border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-2xl font-bold">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.fullName}</h2>
            <p className="text-sm text-muted-foreground capitalize">
              {user.userType} · {user.phone} · {user.location}
            </p>
          </div>
        </div>
      </div>

      <h3 className="mt-8 text-lg font-bold">Submissions ({subs.length})</h3>
      {subs.length === 0 ? (
        <div className="mt-4 rounded-2xl border bg-card p-8 text-center text-muted-foreground shadow-soft">
          No submissions yet.
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {subs.map((s) => (
            <SubmissionReviewCard key={s.id} s={s} onReview={onReview} />
          ))}
        </div>
      )}
    </div>
  );
}

function SubmissionReviewCard({
  s,
  onReview,
}: {
  s: Submission;
  onReview: (
    submissionId: string,
    itemIndex: number,
    status: "accepted" | "rejected",
  ) => Promise<void>;
}) {
  const statusStyles: Record<string, string> = {
    pending: "bg-warning/15 text-warning",
    accepted: "bg-sky-100 text-sky-700",
    verified: "bg-primary/15 text-primary",
    rejected: "bg-destructive/15 text-destructive",
  };
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="font-semibold">
            {s.diseaseName ?? (s.category === "feed" ? "Feed Upload" : "Disease Upload")}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {new Date(s.date).toLocaleString()} · {s.items.length} images · {s.points} pts ·{" "}
            <span className="capitalize">{s.category.replace("-", " ")}</span>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[s.status]}`}
        >
          {s.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {s.items.map((it, i) => (
          <div key={i} className="rounded-xl overflow-hidden border bg-muted">
            <img src={it.imageUrl} alt={it.label} className="aspect-square w-full object-cover" />
            <div className="space-y-3 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-medium text-muted-foreground">Image {i + 1}</div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${it.status === "accepted" ? "bg-primary/15 text-primary" : it.status === "rejected" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"}`}
                >
                  {it.status}
                </span>
              </div>
              <div className="text-sm line-clamp-3">{it.label}</div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
                  disabled={it.status === "accepted"}
                  onClick={() => onReview(s.id, i, "accepted")}
                >
                  <Check className="h-4 w-4 mr-1" /> Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10"
                  disabled={it.status === "rejected"}
                  onClick={() => onReview(s.id, i, "rejected")}
                >
                  <X className="h-4 w-4 mr-1" /> Reject
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-secondary px-3 py-1 font-medium">
          Accepted: {s.items.filter((item) => item.status === "accepted").length}
        </span>
        <span className="rounded-full bg-secondary px-3 py-1 font-medium">
          Rejected: {s.items.filter((item) => item.status === "rejected").length}
        </span>
        <span className="rounded-full bg-secondary px-3 py-1 font-medium">
          Pending: {s.items.filter((item) => item.status === "pending").length}
        </span>
        {s.status === "verified" && (
          <span className="inline-flex items-center gap-1.5 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4" /> Points credited for accepted images
          </span>
        )}
      </div>
    </div>
  );
}

function RedeemList({
  redeems,
  getUserById,
  onPaid,
}: {
  redeems: import("@/lib/auth-context").RedeemRequest[];
  getUserById: (id: string) => AppUser | undefined;
  onPaid: (id: string) => void;
}) {
  if (redeems.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border bg-card p-10 text-center text-muted-foreground shadow-soft">
        No redeem requests yet.
      </div>
    );
  }
  return (
    <div className="mt-6 space-y-3">
      {redeems.map((r) => {
        const u = getUserById(r.userId);
        return (
          <div
            key={r.id}
            className="rounded-2xl border bg-card p-5 shadow-soft flex items-start justify-between gap-4 flex-wrap"
          >
            <div>
              <div className="font-semibold">
                {u?.fullName ?? "Unknown user"}{" "}
                <span className="text-xs text-muted-foreground font-normal">· {u?.phone}</span>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                UPI: <span className="font-medium text-foreground">{r.upiId}</span>
              </div>
              <div className="mt-1 text-sm">
                <span className="font-semibold">{r.points} pts</span> →{" "}
                <span className="font-semibold text-primary">₹{r.amount}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Requested {new Date(r.date).toLocaleString()}
                {r.paidDate && ` · Paid ${new Date(r.paidDate).toLocaleString()}`}
              </div>
            </div>
            <div>
              {r.status === "pending" ? (
                <Button size="sm" className="rounded-xl bg-primary" onClick={() => onPaid(r.id)}>
                  <Check className="h-4 w-4 mr-1" /> Mark as Paid
                </Button>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary text-xs font-medium px-3 py-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Paid
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
