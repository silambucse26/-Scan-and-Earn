import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as Wheat, A as Activity } from "../_libs/lucide-react.mjs";
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
function FarmerHome() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: "Farmer Upload" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Choose what you'd like to upload today." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/farmer/feed", className: "glass-card rounded-3xl p-8 hover:shadow-elegant transition group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wheat, { className: "h-10 w-10 text-primary group-hover:scale-110 transition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-2xl font-bold", children: "Feed Image Upload" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Upload cattle feed images with feed names." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-primary font-medium", children: "Earn 20 points per image" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/farmer/disease", className: "glass-card rounded-3xl p-8 hover:shadow-elegant transition group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-10 w-10 text-primary group-hover:scale-110 transition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-2xl font-bold", children: "Disease Image Upload" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Upload cattle disease images with descriptions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-primary font-medium", children: "Earn 20 points per image" })
      ] })
    ] })
  ] });
}
export {
  FarmerHome as component
};
