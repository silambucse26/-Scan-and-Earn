import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, P as POINTS_PER_RUPEE, B as Button } from "./router-2Yo8rrpi.mjs";
import "../_libs/sonner.mjs";
import { W as Wallet, c as Award, h as Clock, U as Upload, d as CircleCheck, f as CircleX, S as ShieldCheck } from "../_libs/lucide-react.mjs";
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
function Profile() {
  const {
    user,
    ready,
    submissions,
    availablePointsFor,
    verifiedPointsFor
  } = useAuth();
  const router = useRouter();
  reactExports.useEffect(() => {
    if (ready && !user) router.navigate({
      to: "/login"
    });
  }, [ready, router, user]);
  if (!ready) return null;
  if (!user) return null;
  const mine = submissions.filter((s) => s.userId === user.id);
  const verified = verifiedPointsFor(user.id);
  const available = availablePointsFor(user.id);
  const pending = mine.filter((s) => s.status === "pending" || s.status === "accepted").reduce((a, b) => a + b.points, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_2fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-3xl border bg-card p-6 h-fit shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-3xl font-bold shadow-glow", children: user.fullName.charAt(0).toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-bold", children: user.fullName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground capitalize", children: user.userType }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Phone", value: user.phone }),
        user.email && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Email", value: user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Location", value: user.location }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Joined", value: new Date(user.joinDate).toLocaleDateString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Wallet Balance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-primary", children: [
              available,
              " pts"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "≈ ₹",
              Math.floor(available / POINTS_PER_RUPEE)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-8 w-8 text-primary/60" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/redeem", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "mt-3 w-full rounded-xl bg-primary hover:bg-primary/90", children: "Redeem Points" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Award, label: "Verified Points", value: verified, accent: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Clock, label: "Pending Points", value: pending }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Wallet, label: "Available to Redeem", value: available })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold", children: [
            "My Submissions (",
            mine.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/select-role", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "rounded-xl bg-gradient-to-r from-primary to-primary-glow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-1.5" }),
            "New Upload"
          ] }) })
        ] }),
        mine.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center text-muted-foreground py-12", children: "No submissions yet. Start uploading to earn rewards!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-3", children: mine.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SubmissionCard, { s }, s.id)) })
      ] })
    ] })
  ] }) });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-3 border-b border-border pb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-right", children: value })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border p-5 shadow-soft ${accent ? "bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20" : "bg-card"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${accent ? "text-primary" : "text-muted-foreground"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-3 text-3xl font-bold ${accent ? "text-primary" : ""}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: label })
  ] });
}
function SubmissionCard({
  s
}) {
  const statusStyles = {
    pending: "bg-warning/15 text-warning",
    accepted: "bg-sky-100 text-sky-700",
    verified: "bg-primary/15 text-primary",
    rejected: "bg-destructive/15 text-destructive"
  };
  const StatusIcon = s.status === "verified" ? CircleCheck : s.status === "rejected" ? CircleX : s.status === "accepted" ? ShieldCheck : Clock;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: s.diseaseName ?? (s.category === "feed" ? "Feed Upload" : "Disease Upload") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
          new Date(s.date).toLocaleString(),
          " · ",
          s.items.length,
          " images · ",
          s.points,
          " pts"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[s.status]}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "h-3 w-3" }),
        " ",
        s.status
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2 overflow-x-auto", children: s.items.slice(0, 6).map((it, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.imageUrl, alt: it.label, className: "h-16 w-16 rounded-lg object-cover flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute bottom-1 right-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${it.status === "accepted" ? "bg-primary text-primary-foreground" : it.status === "rejected" ? "bg-destructive text-destructive-foreground" : "bg-warning text-black"}`, children: it.status })
    ] }, idx)) })
  ] });
}
export {
  Profile as component
};
