import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useSearch, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./router-2Yo8rrpi.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { d as CircleCheck, c as Award } from "../_libs/lucide-react.mjs";
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
function Success() {
  const {
    points
  } = useSearch({
    from: "/success"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-6 py-24 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      scale: 0.5,
      opacity: 0
    }, animate: {
      scale: 1,
      opacity: 1
    }, transition: {
      type: "spring",
      stiffness: 180
    }, className: "mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-8 text-4xl font-bold", children: "Thank You For Your Submission" }),
    points && points > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20,
      scale: 0.8
    }, animate: {
      opacity: 1,
      y: 0,
      scale: 1
    }, transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 180
    }, className: "mt-8 mx-auto max-w-md rounded-3xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border-2 border-primary/30 px-8 py-8 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-7 w-7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold uppercase tracking-wider", children: "You Earned" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-7xl font-extrabold text-gradient leading-none", children: [
        "+",
        points
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-base font-medium text-muted-foreground", children: "reward points (pending verification)" })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground", children: "Our veterinary verification team will review your uploaded images. After successful verification, reward points will be credited to your account." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow", children: "Go To Dashboard" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", className: "rounded-2xl", children: "Home" }) })
    ] })
  ] });
}
export {
  Success as component
};
