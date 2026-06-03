import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, B as Button } from "./router-2Yo8rrpi.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { p as Sparkles, b as ArrowRight, U as Upload, S as ShieldCheck, i as Clock3, W as Wallet, e as CircleUserRound, j as IndianRupee, I as Image, t as Users, q as Stethoscope, Z as Zap } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const heroImg = "/assets/hero-cattle-s597kqNQ.jpg";
function useRequireAuth() {
  const { user } = useAuth();
  const router = useRouter();
  return (action) => {
    if (!user) {
      toast.error("Please login to continue", {
        description: "Login is required to upload data and earn rewards.",
        action: { label: "Login", onClick: () => router.navigate({ to: "/login" }) },
        position: "top-right"
      });
      return false;
    }
    action?.();
    return true;
  };
}
const stats = [{
  label: "Images Collected",
  value: "128,400+",
  icon: Image
}, {
  label: "Farmers",
  value: "12,300+",
  icon: Users
}, {
  label: "Veterinarians",
  value: "1,840+",
  icon: Stethoscope
}, {
  label: "Rewards Paid",
  value: "₹24.6L+",
  icon: IndianRupee
}];
function Home() {
  const {
    user,
    submissions,
    availablePointsFor
  } = useAuth();
  const guard = useRequireAuth();
  if (user?.userType === "admin") {
    window.location.assign("/admin");
    return null;
  }
  if (user) {
    const mine = submissions.filter((submission) => submission.userId === user.id);
    const verified = mine.filter((submission) => submission.status === "verified").length;
    const pending = mine.filter((submission) => submission.status === "pending" || submission.status === "accepted").length;
    const rewards = availablePointsFor(user.id);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            "Working Dashboard"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl", children: [
            "Welcome back, ",
            user.fullName?.split(" ")[0] || "User",
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-sm leading-6 text-muted-foreground md:text-base", children: "Manage uploads, track approvals, and redeem rewards from one place." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/select-role", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full rounded-xl bg-primary px-5 shadow-sm sm:w-auto", children: [
              "Start Upload",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full rounded-xl sm:w-auto", children: "View Profile" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/redeem", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full rounded-xl sm:w-auto", children: "Redeem Rewards" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardMetric, { icon: Upload, label: "Uploads", value: String(mine.length), note: "Total", accent: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardMetric, { icon: ShieldCheck, label: "Verified", value: String(verified), note: "Approved" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardMetric, { icon: Clock3, label: "Pending", value: String(pending), note: "Review" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardMetric, { icon: Wallet, label: "Wallet", value: `${rewards} pts`, note: `₹${Math.floor(rewards / 10)}` })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Quick actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Go directly to the main workflows." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QuickActionCard, { to: "/select-role", icon: Upload, title: "Upload data", desc: "Feed or disease images" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(QuickActionCard, { to: "/profile", icon: CircleUserRound, title: "Track status", desc: "See pending and verified uploads" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(QuickActionCard, { to: "/redeem", icon: IndianRupee, title: "Redeem points", desc: "Convert wallet points to cash" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Recent submission status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3", children: [
            mine.slice(0, 4).map((submission) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-2xl border bg-secondary/35 px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: submission.diseaseName ?? (submission.category === "feed" ? "Feed upload" : "Disease upload") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  submission.items.length,
                  " images •",
                  " ",
                  new Date(submission.date).toLocaleDateString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary", children: submission.status })
            ] }, submission.id)),
            mine.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed p-6 text-sm text-muted-foreground", children: "No uploads yet. Start with your first submission." })
          ] })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 -z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Healthy cattle on dairy farm", width: 1920, height: 1280, className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-28 md:pb-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-xs font-medium text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          " Powered by community veterinary data"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "SCAN" }),
          " &",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "EARN" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-muted-foreground max-w-2xl", children: "A working cattle data application for farmers and veterinarians to upload verified images, track reviews, and earn rewards." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "rounded-2xl h-12 px-6 bg-gradient-to-r from-primary to-primary-glow shadow-glow", onClick: () => guard(() => window.location.assign("/select-role")), children: [
            "Start Scanning ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin-login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", className: "rounded-2xl h-12 px-6 glass-card", children: "Admin Login" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 -mt-16 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.08
    }, className: "glass-card rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-6 w-6 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-3xl font-bold tracking-tight", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: s.label })
    ] }, s.label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "Choose how you contribute" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Whether you're a farmer or a veterinarian, your contribution matters and earns rewards." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RoleCard, { role: "farmer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RoleCard, { role: "veterinarian" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: [{
      icon: Upload,
      title: "Easy Upload",
      desc: "Snap & upload from any device. Mobile-first workflow."
    }, {
      icon: ShieldCheck,
      title: "Verified Rewards",
      desc: "Our vet team verifies every submission for quality."
    }, {
      icon: Zap,
      title: "Instant Points",
      desc: "Earn 20 points per valid image — see your total grow in real time."
    }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-semibold", children: f.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: f.desc })
    ] }, f.title)) }) })
  ] });
}
function DashboardMetric({
  icon: Icon,
  label,
  value,
  note,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border p-5 shadow-soft ${accent ? "bg-card/95" : "bg-background/80"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${accent ? "text-primary" : "text-muted-foreground"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-3xl font-bold tracking-tight", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: note })
  ] });
}
function QuickActionCard({
  to,
  icon: Icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "rounded-2xl border bg-secondary/35 p-5 transition hover:-translate-y-0.5 hover:shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-lg font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: desc })
  ] });
}
function RoleCard({
  role
}) {
  const guard = useRequireAuth();
  const isFarmer = role === "farmer";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { whileHover: {
    y: -4
  }, className: "glass-card rounded-3xl p-8 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", children: isFarmer ? "👨‍🌾" : "👨‍⚕️" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-2xl font-bold", children: isFarmer ? "Farmer" : "Veterinarian" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: isFarmer ? "Upload feed images and cattle disease images from your farm to earn rewards." : "Upload disease-specific cattle datasets with professional descriptions." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-6 rounded-xl w-full bg-gradient-to-r from-primary to-primary-glow shadow-glow", onClick: () => guard(() => window.location.assign(isFarmer ? "/farmer" : "/vet")), children: [
      "Continue as ",
      isFarmer ? "Farmer" : "Veterinarian",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
    ] })
  ] });
}
export {
  Home as component
};
