import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Clock3,
  ImageIcon,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Upload,
  UserCircle2,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import heroImg from "@/assets/hero-cattle.jpg";
import { useAuth } from "@/lib/auth-context";
import { useRequireAuth } from "@/lib/require-auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cattle Scan & Earn — Scan, Submit, Earn Rewards" },
      {
        name: "description",
        content:
          "Help build the world's largest cattle disease dataset. Farmers and vets earn rewards for verified image submissions.",
      },
      { property: "og:title", content: "Cattle Scan & Earn" },
      {
        property: "og:description",
        content: "Premium veterinary data collection platform with rewards.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { label: "Images Collected", value: "128,400+", icon: ImageIcon },
  { label: "Farmers", value: "12,300+", icon: Users },
  { label: "Veterinarians", value: "1,840+", icon: Stethoscope },
  { label: "Rewards Paid", value: "₹24.6L+", icon: IndianRupee },
];

function Home() {
  const { user, submissions, availablePointsFor } = useAuth();
  const guard = useRequireAuth();

  if (user?.userType === "admin") {
    window.location.assign("/admin");
    return null;
  }

  if (user) {
    const mine = submissions.filter((submission) => submission.userId === user.id);
    const verified = mine.filter((submission) => submission.status === "verified").length;
    const pending = mine.filter(
      (submission) => submission.status === "pending" || submission.status === "accepted",
    ).length;
    const rewards = availablePointsFor(user.id);

    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
  <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
    {/* Left Content */}
    <div>
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        Working Dashboard
      </div>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        Welcome back, {user.fullName?.split(" ")[0] || "User"}.
      </h1>

      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
        Manage uploads, track approvals, and redeem rewards from one place.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link to="/select-role">
          <Button className="w-full rounded-xl bg-primary px-5 shadow-sm sm:w-auto">
            Start Upload
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <Link to="/profile">
          <Button variant="outline" className="w-full rounded-xl sm:w-auto">
            View Profile
          </Button>
        </Link>

        <Link to="/redeem">
          <Button variant="outline" className="w-full rounded-xl sm:w-auto">
            Redeem Rewards
          </Button>
        </Link>
      </div>
    </div>

    {/* Metrics */}
    <div className="grid grid-cols-2 gap-3">
      <DashboardMetric
        icon={Upload}
        label="Uploads"
        value={String(mine.length)}
        note="Total"
        accent
      />

      <DashboardMetric
        icon={ShieldCheck}
        label="Verified"
        value={String(verified)}
        note="Approved"
      />

      <DashboardMetric
        icon={Clock3}
        label="Pending"
        value={String(pending)}
        note="Review"
      />

      <DashboardMetric
        icon={Wallet}
        label="Wallet"
        value={`${rewards} pts`}
        note={`₹${Math.floor(rewards / 10)}`}
      />
    </div>
  </div>
</section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Quick actions</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Go directly to the main workflows.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <QuickActionCard
                to="/select-role"
                icon={Upload}
                title="Upload data"
                desc="Feed or disease images"
              />
              <QuickActionCard
                to="/profile"
                icon={UserCircle2}
                title="Track status"
                desc="See pending and verified uploads"
              />
              <QuickActionCard
                to="/redeem"
                icon={IndianRupee}
                title="Redeem points"
                desc="Convert wallet points to cash"
              />
            </div>
          </div>

          <div className="rounded-[2rem] border bg-card p-6 shadow-soft">
            <h2 className="text-xl font-bold">Recent submission status</h2>
            <div className="mt-5 space-y-3">
              {mine.slice(0, 4).map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border bg-secondary/35 px-4 py-3"
                >
                  <div>
                    <div className="font-medium">
                      {submission.diseaseName ??
                        (submission.category === "feed" ? "Feed upload" : "Disease upload")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {submission.items.length} images •{" "}
                      {new Date(submission.date).toLocaleDateString()}
                    </div>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
                    {submission.status}
                  </span>
                </div>
              ))}
              {mine.length === 0 && (
                <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
                  No uploads yet. Start with your first submission.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Healthy cattle on dairy farm"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-28 md:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Powered by community veterinary data
            </div>
            <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              <span className="text-gradient">SCAN</span> &<br className="hidden md:block" />{" "}
              <span className="text-gradient">EARN</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              A working cattle data application for farmers and veterinarians to upload verified
              images, track reviews, and earn rewards.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-2xl h-12 px-6 bg-gradient-to-r from-primary to-primary-glow shadow-glow"
                onClick={() => guard(() => window.location.assign("/select-role"))}
              >
                Start Scanning <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <a href="/admin-login">
                <Button size="lg" variant="outline" className="rounded-2xl h-12 px-6 glass-card">
                  Admin Login
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 -mt-16 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6"
            >
              <s.icon className="h-6 w-6 text-primary" />
              <div className="mt-4 text-3xl font-bold tracking-tight">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Role select */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Choose how you contribute
          </h2>
          <p className="mt-3 text-muted-foreground">
            Whether you're a farmer or a veterinarian, your contribution matters and earns rewards.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <RoleCard role="farmer" />
          <RoleCard role="veterinarian" />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Upload,
              title: "Easy Upload",
              desc: "Snap & upload from any device. Mobile-first workflow.",
            },
            {
              icon: ShieldCheck,
              title: "Verified Rewards",
              desc: "Our vet team verifies every submission for quality.",
            },
            {
              icon: Zap,
              title: "Instant Points",
              desc: "Earn 20 points per valid image — see your total grow in real time.",
            },
          ].map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DashboardMetric({
  icon: Icon,
  label,
  value,
  note,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-soft ${accent ? "bg-card/95" : "bg-background/80"}`}
    >
      <Icon className={`h-5 w-5 ${accent ? "text-primary" : "text-muted-foreground"}`} />
      <div className="mt-3 text-3xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 text-sm font-medium">{label}</div>
      <div className="mt-1 text-xs text-muted-foreground">{note}</div>
    </div>
  );
}

function QuickActionCard({
  to,
  icon: Icon,
  title,
  desc,
}: {
  to: "/select-role" | "/profile" | "/redeem";
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-2xl border bg-secondary/35 p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
    >
      <Icon className="h-5 w-5 text-primary" />
      <div className="mt-4 text-lg font-semibold">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
    </Link>
  );
}

function RoleCard({ role }: { role: "farmer" | "veterinarian" }) {
  const guard = useRequireAuth();
  const isFarmer = role === "farmer";
  return (
    <motion.div whileHover={{ y: -4 }} className="glass-card rounded-3xl p-8 shadow-soft">
      <div className="text-5xl">{isFarmer ? "👨‍🌾" : "👨‍⚕️"}</div>
      <h3 className="mt-4 text-2xl font-bold">{isFarmer ? "Farmer" : "Veterinarian"}</h3>
      <p className="mt-3 text-muted-foreground">
        {isFarmer
          ? "Upload feed images and cattle disease images from your farm to earn rewards."
          : "Upload disease-specific cattle datasets with professional descriptions."}
      </p>
      <Button
        className="mt-6 rounded-xl w-full bg-gradient-to-r from-primary to-primary-glow shadow-glow"
        onClick={() => guard(() => window.location.assign(isFarmer ? "/farmer" : "/vet"))}
      >
        Continue as {isFarmer ? "Farmer" : "Veterinarian"} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
}
