import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, B as Button } from "./router-2Yo8rrpi.mjs";
import { L as Label, I as Input } from "./label-Da4f15Sy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
function SignupPage() {
  const {
    signup
  } = useAuth();
  const router = useRouter();
  const [form, setForm] = reactExports.useState({
    fullName: "",
    phone: "",
    password: "",
    userType: "farmer",
    location: ""
  });
  const submit = async () => {
    const res = await signup(form);
    if (!res.ok) return toast.error(res.error || "Signup failed");
    toast.success("Account created!");
    router.navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-md px-6 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-8 shadow-elegant", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Create your account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Join and start earning by contributing." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1.5 rounded-xl", value: form.fullName, onChange: (e) => setForm({
          ...form,
          fullName: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1.5 rounded-xl", placeholder: "10 digits", value: form.phone, onChange: (e) => setForm({
          ...form,
          phone: e.target.value.replace(/\D/g, "").slice(0, 10)
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", className: "mt-1.5 rounded-xl", placeholder: "At least 6 characters", value: form.password, onChange: (e) => setForm({
          ...form,
          password: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "I am a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 grid grid-cols-2 gap-2", children: ["farmer", "veterinarian"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setForm({
          ...form,
          userType: t
        }), className: `rounded-xl border p-3 text-sm font-medium capitalize transition ${form.userType === t ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"}`, children: t === "farmer" ? "👨‍🌾 Farmer" : "👨‍⚕️ Veterinarian" }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1.5 rounded-xl", placeholder: "City, State", value: form.location, onChange: (e) => setForm({
          ...form,
          location: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, className: "w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow shadow-glow", children: "Create Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Have an account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-primary font-medium", children: "Login" })
      ] })
    ] })
  ] }) });
}
export {
  SignupPage as component
};
