import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { I as ImageUploadList, h as hasMinWords } from "./image-upload-list-D882fxLR.mjs";
import { R as Route, u as useAuth, B as Button } from "./router-2Yo8rrpi.mjs";
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
import "./label-Da4f15Sy.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/lucide-react.mjs";
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
import "../_libs/tailwind-merge.mjs";
import "../_libs/zod.mjs";
function DiseaseDetail() {
  const d = Route.useLoaderData();
  const {
    addSubmission
  } = useAuth();
  const router = useRouter();
  const [items, setItems] = reactExports.useState([]);
  const [points, setPoints] = reactExports.useState(0);
  const submit = () => {
    const valid = items.filter((i) => i.url && hasMinWords(i.label, 5));
    if (valid.length < 4) {
      return toast.error("Please upload at least 4 images with descriptions of at least 5 words.");
    }
    addSubmission({
      category: "disease-vet",
      diseaseName: d.name,
      items: valid.map((i) => ({
        imageUrl: i.url,
        label: i.label
      })),
      points
    });
    router.navigate({
      to: "/success",
      search: {
        points
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", children: d.emoji }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-3xl font-bold", children: d.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: d.short }),
      [["Symptoms", d.symptoms], ["Causes", d.causes], ["Prevention", d.prevention], ["Treatment", d.treatment]].map(([title, list]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-card rounded-2xl p-5 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1.5 text-sm text-muted-foreground", children: list.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: it })
        ] }, it)) })
      ] }, title))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-6 sticky top-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Upload Dataset" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Minimum 4 images with descriptions of at least 5 words. Each completed image = 20 points." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUploadList, { labelName: "Description", multiline: true, minWordsForReward: 5, onChange: (i, p) => {
        setItems(i);
        setPoints(p);
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", onClick: submit, className: "mt-6 w-full rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow", children: [
        "Submit Dataset (",
        points,
        " pts)"
      ] })
    ] }) })
  ] }) });
}
export {
  DiseaseDetail as component
};
