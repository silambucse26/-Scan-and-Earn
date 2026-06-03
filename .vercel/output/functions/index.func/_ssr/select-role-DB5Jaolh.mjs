import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-2Yo8rrpi.mjs";
import "../_libs/sonner.mjs";
import { u as Wheat, q as Stethoscope } from "../_libs/lucide-react.mjs";
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
function SelectRole() {
  const {
    user,
    ready
  } = useAuth();
  const router = useRouter();
  reactExports.useEffect(() => {
    if (ready && !user) router.navigate({
      to: "/login"
    });
  }, [ready, router, user]);
  if (!ready) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-center", children: "How would you like to contribute?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground mt-3", children: "Select your role to begin uploading." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/farmer", className: "glass-card rounded-3xl p-10 hover:shadow-elegant transition group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wheat, { className: "h-12 w-12 text-primary group-hover:scale-110 transition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-2xl font-bold", children: "Continue as Farmer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Upload feed and disease images from your cattle." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vet", className: "glass-card rounded-3xl p-10 hover:shadow-elegant transition group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-12 w-12 text-primary group-hover:scale-110 transition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-2xl font-bold", children: "Continue as Veterinarian" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Submit professionally annotated disease datasets." })
      ] })
    ] })
  ] });
}
export {
  SelectRole as component
};
