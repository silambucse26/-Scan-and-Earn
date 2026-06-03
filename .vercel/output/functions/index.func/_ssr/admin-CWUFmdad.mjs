import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, B as Button } from "./router-2Yo8rrpi.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as ShieldCheck, H as Hourglass, B as BadgeIndianRupee, r as TrendingUp, t as Users, I as Image, h as Clock, d as CircleCheck, W as Wallet, L as Layers, a as ArrowLeft, C as Check, X } from "../_libs/lucide-react.mjs";
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
function Admin() {
  const {
    user,
    ready,
    users,
    submissions,
    redeems,
    reviewSubmissionItem,
    markRedeemPaid,
    getUserById
  } = useAuth();
  const router = useRouter();
  const [tab, setTab] = reactExports.useState("users");
  const [selectedUserId, setSelectedUserId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.navigate({
        to: "/admin-login"
      });
      return;
    }
    if (user.userType !== "admin") router.navigate({
      to: "/"
    });
  }, [ready, router, user]);
  if (!ready) return null;
  if (!user || user.userType !== "admin") return null;
  const totalImages = submissions.reduce((s, x) => s + x.items.length, 0);
  const pending = submissions.filter((s) => s.status === "pending" || s.status === "accepted").length;
  const verified = submissions.filter((s) => s.status === "verified").length;
  const pendingRedeems = redeems.filter((r) => r.status === "pending").length;
  const totalPayout = redeems.reduce((sum, redeem) => sum + redeem.amount, 0);
  const approvalRate = submissions.length === 0 ? 0 : Math.round(verified / submissions.length * 100);
  const recentQueue = submissions.slice(0, 5);
  const selectedUser = selectedUserId ? getUserById(selectedUserId) : null;
  const userSubs = selectedUserId ? submissions.filter((s) => s.userId === selectedUserId) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "overflow-hidden rounded-[2rem] border border-primary/15 bg-[radial-gradient(circle_at_top_left,_rgba(36,172,99,0.2),_transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.97),rgba(242,250,245,0.92))] p-8 shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
          " Admin Operations"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-4xl font-bold tracking-tight", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-muted-foreground", children: "Manage user records, review uploads, clear the redemption queue, and monitor application activity from one screen." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PulseStat, { icon: Hourglass, label: "Review Queue", value: String(pending), note: "Pending and accepted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PulseStat, { icon: BadgeIndianRupee, label: "Pending Redeems", value: String(pendingRedeems), note: "Awaiting payout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PulseStat, { icon: TrendingUp, label: "Approval Rate", value: `${approvalRate}%`, note: "Verified submissions" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5", children: [{
      icon: Users,
      label: "Total Users",
      value: users.length
    }, {
      icon: Image,
      label: "Total Images",
      value: totalImages
    }, {
      icon: Clock,
      label: "Pending Reviews",
      value: pending
    }, {
      icon: CircleCheck,
      label: "Verified",
      value: verified
    }, {
      icon: BadgeIndianRupee,
      label: "Payout Volume",
      value: `Rs ${Math.round(totalPayout)}`
    }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-5 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-3xl font-bold", children: c.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: c.label })
    ] }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-[2rem] border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Operations workspace" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Open user records or payment requests and complete the next action." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-xl bg-muted p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabBtn, { active: tab === "users", onClick: () => {
              setTab("users");
              setSelectedUserId(null);
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mr-2 inline h-4 w-4" }),
              "Users"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabBtn, { active: tab === "redeems", onClick: () => setTab("redeems"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "mr-2 inline h-4 w-4" }),
              "Redeems",
              pendingRedeems > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground", children: pendingRedeems })
            ] })
          ] })
        ] }),
        tab === "users" && !selectedUser && /* @__PURE__ */ jsxRuntimeExports.jsx(UsersList, { users, submissions, onSelect: setSelectedUserId }),
        tab === "users" && selectedUser && /* @__PURE__ */ jsxRuntimeExports.jsx(UserDetail, { user: selectedUser, subs: userSubs, onBack: () => setSelectedUserId(null), onReview: async (submissionId, itemIndex, status) => {
          const result = await reviewSubmissionItem(submissionId, itemIndex, status);
          if (!result.ok) {
            toast.error(result.error || "Could not update image review");
            return;
          }
          const msg = status === "accepted" ? "Image accepted" : "Image rejected";
          toast.success(msg);
        } }),
        tab === "redeems" && /* @__PURE__ */ jsxRuntimeExports.jsx(RedeemList, { redeems, getUserById, onPaid: (id) => {
          markRedeemPaid(id);
          toast.success("Payment marked as sent");
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
            " Live queue snapshot"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3", children: [
            recentQueue.map((submission) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-secondary/35 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: submission.diseaseName ?? (submission.category === "feed" ? "Feed upload" : "Disease upload") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary", children: submission.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
                submission.items.length,
                " images • ",
                submission.points,
                " pts •",
                " ",
                new Date(submission.date).toLocaleString()
              ] })
            ] }, submission.id)),
            recentQueue.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed p-5 text-sm text-muted-foreground", children: "No submission data yet." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: "Admin notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border bg-secondary/35 px-4 py-3", children: "Approve uploads in two steps: accept for review, then verify to credit points." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border bg-secondary/35 px-4 py-3", children: "User detail cards group submissions per account, which makes support follow-up easier." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border bg-secondary/35 px-4 py-3", children: "Redeem requests remain visible until marked paid, so payout backlog is clear." })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function PulseStat({
  icon: Icon,
  label,
  value,
  note
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-background/75 p-4 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-2xl font-bold", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: note })
  ] });
}
function TabBtn({
  active,
  onClick,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, className: `rounded-lg px-4 py-2 text-sm font-medium transition ${active ? "bg-background shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground"}`, children });
}
function UsersList({
  users,
  submissions,
  onSelect
}) {
  if (users.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 rounded-3xl border bg-card p-10 text-center text-muted-foreground shadow-soft", children: "No registered users yet." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: users.map((u) => {
    const subs = submissions.filter((s) => s.userId === u.id);
    const today = (/* @__PURE__ */ new Date()).toDateString();
    const todayCount = subs.filter((s) => new Date(s.date).toDateString() === today).length;
    const pendingCount = subs.filter((s) => s.status === "pending" || s.status === "accepted").length;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onSelect(u.id), className: "text-left rounded-2xl border bg-card p-5 shadow-soft hover:shadow-elegant hover:border-primary/40 transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-lg font-bold", children: u.fullName.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: u.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground capitalize", children: [
            u.userType,
            " · ",
            u.phone
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-muted px-2.5 py-1", children: [
          "Total ",
          subs.length
        ] }),
        todayCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-primary/10 text-primary px-2.5 py-1", children: [
          "+",
          todayCount,
          " today"
        ] }),
        pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-warning/15 text-warning px-2.5 py-1", children: [
          pendingCount,
          " to review"
        ] })
      ] })
    ] }, u.id);
  }) });
}
function UserDetail({
  user,
  subs,
  onBack,
  onReview
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onBack, className: "text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to users"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-3xl border bg-card p-6 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-2xl font-bold", children: user.fullName.charAt(0).toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: user.fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground capitalize", children: [
          user.userType,
          " · ",
          user.phone,
          " · ",
          user.location
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-8 text-lg font-bold", children: [
      "Submissions (",
      subs.length,
      ")"
    ] }),
    subs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-2xl border bg-card p-8 text-center text-muted-foreground shadow-soft", children: "No submissions yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-4", children: subs.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SubmissionReviewCard, { s, onReview }, s.id)) })
  ] });
}
function SubmissionReviewCard({
  s,
  onReview
}) {
  const statusStyles = {
    pending: "bg-warning/15 text-warning",
    accepted: "bg-sky-100 text-sky-700",
    verified: "bg-primary/15 text-primary",
    rejected: "bg-destructive/15 text-destructive"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-5 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: s.diseaseName ?? (s.category === "feed" ? "Feed Upload" : "Disease Upload") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
          new Date(s.date).toLocaleString(),
          " · ",
          s.items.length,
          " images · ",
          s.points,
          " pts ·",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: s.category.replace("-", " ") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[s.status]}`, children: s.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3", children: s.items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border bg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.imageUrl, alt: it.label, className: "aspect-square w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-medium text-muted-foreground", children: [
            "Image ",
            i + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${it.status === "accepted" ? "bg-primary/15 text-primary" : it.status === "rejected" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"}`, children: it.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm line-clamp-3", children: it.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "flex-1 rounded-xl bg-primary hover:bg-primary/90", disabled: it.status === "accepted", onClick: () => onReview(s.id, i, "accepted"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mr-1" }),
            " Accept"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "flex-1 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10", disabled: it.status === "rejected", onClick: () => onReview(s.id, i, "rejected"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-1" }),
            " Reject"
          ] })
        ] })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-secondary px-3 py-1 font-medium", children: [
        "Accepted: ",
        s.items.filter((item) => item.status === "accepted").length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-secondary px-3 py-1 font-medium", children: [
        "Rejected: ",
        s.items.filter((item) => item.status === "rejected").length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-secondary px-3 py-1 font-medium", children: [
        "Pending: ",
        s.items.filter((item) => item.status === "pending").length
      ] }),
      s.status === "verified" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
        " Points credited for accepted images"
      ] })
    ] })
  ] });
}
function RedeemList({
  redeems,
  getUserById,
  onPaid
}) {
  if (redeems.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 rounded-3xl border bg-card p-10 text-center text-muted-foreground shadow-soft", children: "No redeem requests yet." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-3", children: redeems.map((r) => {
    const u = getUserById(r.userId);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-5 shadow-soft flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
          u?.fullName ?? "Unknown user",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-normal", children: [
            "· ",
            u?.phone
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-sm text-muted-foreground", children: [
          "UPI: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: r.upiId })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
            r.points,
            " pts"
          ] }),
          " →",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
            "₹",
            r.amount
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
          "Requested ",
          new Date(r.date).toLocaleString(),
          r.paidDate && ` · Paid ${new Date(r.paidDate).toLocaleString()}`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: r.status === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "rounded-xl bg-primary", onClick: () => onPaid(r.id), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mr-1" }),
        " Mark as Paid"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary text-xs font-medium px-3 py-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
        " Paid"
      ] }) })
    ] }, r.id);
  }) });
}
export {
  Admin as component
};
