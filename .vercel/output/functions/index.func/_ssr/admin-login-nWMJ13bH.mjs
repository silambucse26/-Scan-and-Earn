import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, B as Button } from "./router-2Yo8rrpi.mjs";
import { L as Label, I as Input } from "./label-Da4f15Sy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as ShieldCheck, M as Mail, l as LockKeyhole, b as ArrowRight } from "../_libs/lucide-react.mjs";
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
function AdminLoginPage() {
  const {
    loginAdmin
  } = useAuth();
  const router = useRouter();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const doAdminLogin = async () => {
    if (!email.trim()) return toast.error("Enter the admin email");
    if (!password.trim()) return toast.error("Enter the admin password");
    const result = await loginAdmin(email, password);
    if (!result.ok) return toast.error(result.error || "Admin login failed");
    toast.success("Admin signed in");
    router.navigate({
      to: "/admin"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-[2rem] border border-primary/15 bg-[radial-gradient(circle_at_top_left,_rgba(36,172,99,0.18),_transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.94),rgba(244,251,246,0.92))] p-8 shadow-elegant lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
        " Admin Console"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 max-w-xl text-4xl font-bold tracking-tight md:text-5xl", children: "Review uploads, approve rewards, and track platform growth." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-base text-muted-foreground md:text-lg", children: "This login is separate from user accounts. Admin access opens the verification queue, redemption review, and analytics dashboard." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-3", children: [{
        label: "Verification Queue",
        value: "Realtime",
        note: "Submission review"
      }, {
        label: "Reward Control",
        value: "Secure",
        note: "Redeem approvals"
      }, {
        label: "Platform Analytics",
        value: "Live",
        note: "Users and uploads"
      }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-background/78 p-4 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-2xl font-bold text-primary", children: item.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: item.note })
      ] }, item.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-[2rem] border bg-card p-8 shadow-soft lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Admin sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Use the configured admin credentials to access the dashboard." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-12 rounded-2xl pl-10", placeholder: "admin@cattlescan.app", value: email, onChange: (event) => setEmail(event.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", className: "h-12 rounded-2xl pl-10", placeholder: "Admin password", value: password, onChange: (event) => setPassword(event.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: doAdminLogin, className: "h-12 w-full rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow", children: [
          "Open Admin Dashboard ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-dashed border-border bg-secondary/45 p-4 text-sm text-muted-foreground", children: [
        "User accounts continue to sign in from",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", className: "font-semibold text-primary", children: "the user login page" }),
        "."
      ] })
    ] })
  ] });
}
export {
  AdminLoginPage as component
};
