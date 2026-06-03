import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, M as MIN_REDEEM_POINTS, P as POINTS_PER_RUPEE, B as Button } from "./router-2Yo8rrpi.mjs";
import { L as Label, I as Input } from "./label-Da4f15Sy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as ArrowLeft, W as Wallet, d as CircleCheck, h as Clock } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
function RedeemPage() {
  const {
    user,
    ready,
    availablePointsFor,
    addRedeem,
    redeems
  } = useAuth();
  const router = useRouter();
  const [points, setPoints] = reactExports.useState(Math.max(MIN_REDEEM_POINTS, 0));
  const [upi, setUpi] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (ready && !user) router.navigate({
      to: "/login"
    });
  }, [ready, router, user]);
  if (!ready) return null;
  if (!user) return null;
  const available = availablePointsFor(user.id);
  const myRedeems = redeems.filter((r) => r.userId === user.id);
  const amount = Math.floor(points / POINTS_PER_RUPEE);
  const canRedeem = available >= MIN_REDEEM_POINTS;
  const submit = () => {
    if (!canRedeem) return toast.error(`You need at least ${MIN_REDEEM_POINTS} verified points to redeem`);
    if (points < MIN_REDEEM_POINTS) return toast.error(`Minimum ${MIN_REDEEM_POINTS} points`);
    if (points > available) return toast.error("Not enough available points");
    if (!/^[\w.-]{2,}@[\w.-]{2,}$/.test(upi.trim())) return toast.error("Enter a valid UPI ID (e.g. name@bank)");
    addRedeem({
      points,
      amount,
      upiId: upi.trim()
    });
    toast.success("Redeem request sent to admin", {
      description: `₹${amount} will be paid to ${upi}`
    });
    setPoints(MIN_REDEEM_POINTS);
    setUpi("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/profile", className: "text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Back to Profile"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-3xl border bg-card p-8 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Redeem Points" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            POINTS_PER_RUPEE,
            " points = ₹1 · Minimum ",
            MIN_REDEEM_POINTS,
            " points to redeem"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Available Points", value: available.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Min Redeem", value: MIN_REDEEM_POINTS.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "You Will Earn", value: `₹${amount}`, accent: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Points to redeem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: MIN_REDEEM_POINTS, max: available, value: points, onChange: (e) => setPoints(Math.max(0, Number(e.target.value) || 0)), className: "mt-1.5 rounded-xl", disabled: !canRedeem }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            "You will receive ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
              "₹",
              amount
            ] }),
            " for",
            " ",
            points,
            " points"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "UPI ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "yourname@bank", value: upi, onChange: (e) => setUpi(e.target.value), className: "mt-1.5 rounded-xl", disabled: !canRedeem })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: !canRedeem, className: "w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow shadow-glow", children: "Submit Redeem Request" }),
        !canRedeem && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
          "Earn at least ",
          MIN_REDEEM_POINTS,
          " verified points to unlock redemption."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "My Redeem Requests" }),
      myRedeems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "No redeem requests yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: myRedeems.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-4 shadow-soft flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
            "₹",
            r.amount,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-normal", children: [
              "(",
              r.points,
              " pts → ",
              r.upiId,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
            "Requested ",
            new Date(r.date).toLocaleString()
          ] }),
          r.status === "paid" && r.paidDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-primary mt-0.5", children: [
            "Payment successful · sent by admin on ",
            new Date(r.paidDate).toLocaleString()
          ] })
        ] }),
        r.status === "paid" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary text-xs font-medium px-3 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
          " Paid"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-warning/15 text-warning text-xs font-medium px-3 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
          " Pending admin approval"
        ] })
      ] }, r.id)) })
    ] })
  ] });
}
function Stat({
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border p-4 ${accent ? "bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20" : "bg-card"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 text-2xl font-bold ${accent ? "text-primary" : ""}`, children: value })
  ] });
}
export {
  RedeemPage as component
};
