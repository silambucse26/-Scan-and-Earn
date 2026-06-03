import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, B as Button } from "./router-2Yo8rrpi.mjs";
import { L as Label, I as Input } from "./label-Da4f15Sy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as Phone, b as ArrowRight } from "../_libs/lucide-react.mjs";
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
function LoginPage() {
  const {
    loginWithPhone
  } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const doPhone = async () => {
    if (!/^\d{10}$/.test(phone)) return toast.error("Enter a valid 10-digit phone number");
    if (!password) return toast.error("Enter your password");
    const res = await loginWithPhone(phone, password);
    if (!res.ok) return toast.error(res.error || "Login failed");
    toast.success("Welcome back!");
    router.navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-[2rem] border border-primary/15 bg-[radial-gradient(circle_at_top_left,_rgba(36,172,99,0.18),_transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.95),rgba(243,250,244,0.92))] p-8 shadow-elegant lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
        " User Access"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 max-w-xl text-4xl font-bold tracking-tight md:text-5xl", children: "Sign in to upload cattle data, track rewards, and manage submissions." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-base text-muted-foreground md:text-lg", children: "Farmers and veterinarians use this login. The app keeps your uploads, verification status, and wallet balance in one place." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-3", children: [{
        label: "Upload workflow",
        value: "Fast",
        note: "Feed and disease images"
      }, {
        label: "Verification",
        value: "Tracked",
        note: "Pending to approved"
      }, {
        label: "Rewards",
        value: "Visible",
        note: "Points and redemption"
      }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-background/78 p-4 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-2xl font-bold text-primary", children: item.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: item.note })
      ] }, item.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-[2rem] border bg-card p-8 shadow-soft lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "User sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Login with your registered phone number and password." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1.5 h-12 rounded-2xl", placeholder: "10-digit mobile", value: phone, onChange: (event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", className: "mt-1.5 h-12 rounded-2xl", placeholder: "Your password", value: password, onChange: (event) => setPassword(event.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: doPhone, className: "h-12 w-full rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow", children: [
          "Login ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 text-center text-sm text-muted-foreground", children: [
        "No account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "font-semibold text-primary", children: "Sign up" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-dashed border-border bg-secondary/45 p-4 text-sm text-muted-foreground", children: [
        "Admin access is separate.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin-login", className: "font-semibold text-primary", children: "Open admin login" }),
        "."
      ] })
    ] })
  ] });
}
export {
  LoginPage as component
};
