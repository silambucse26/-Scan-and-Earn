import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { I as ImageUploadList, h as hasMinWords } from "./image-upload-list-D882fxLR.mjs";
import { u as useAuth, B as Button } from "./router-2Yo8rrpi.mjs";
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
function DiseaseUpload() {
  const {
    addSubmission
  } = useAuth();
  const router = useRouter();
  const [items, setItems] = reactExports.useState([]);
  const [points, setPoints] = reactExports.useState(0);
  const submit = async () => {
    const valid = items.filter((i) => i.file && hasMinWords(i.label, 5));
    if (valid.length < 4) {
      return toast.error("Please upload at least 4 images with descriptions of at least 5 words.");
    }
    const result = await addSubmission({
      category: "disease-farmer",
      items: valid.map((i) => ({
        file: i.file,
        label: i.label
      }))
    });
    if (!result.ok) return toast.error(result.error || "Could not upload disease images");
    router.navigate({
      to: "/success",
      search: {
        points
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Disease Image Upload" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Upload at least 4 disease images with descriptions of at least 5 words. Each completed image earns 20 points." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUploadList, { labelName: "Description", multiline: true, minWordsForReward: 5, onChange: (i, p) => {
      setItems(i);
      setPoints(p);
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", onClick: submit, className: "rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow px-8", children: [
      "Submit (",
      points,
      " pts)"
    ] }) })
  ] });
}
export {
  DiseaseUpload as component
};
