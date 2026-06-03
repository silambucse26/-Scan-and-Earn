import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn, B as Button } from "./router-2Yo8rrpi.mjs";
import { L as Label, I as Input } from "./label-Da4f15Sy.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { T as Trash2, c as Award, o as Plus, U as Upload } from "../_libs/lucide-react.mjs";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const POINTS_PER = 20;
const MIN = 4;
const MAX = 10;
function hasMinWords(value, minWords) {
  return value.trim().split(/\s+/).filter(Boolean).length >= minWords;
}
function ImageUploadList({
  labelName,
  multiline = false,
  initialCount = MIN,
  minWordsForReward = 1,
  onChange
}) {
  const [items, setItems] = reactExports.useState(
    Array.from({ length: initialCount }, () => ({ id: crypto.randomUUID(), label: "" }))
  );
  const update = (next) => {
    setItems(next);
    const points = next.filter((i) => i.file && hasMinWords(i.label, minWordsForReward)).length * POINTS_PER;
    onChange?.(next, points);
  };
  const setFile = (id, file) => {
    const url = file ? URL.createObjectURL(file) : void 0;
    update(items.map((i) => i.id === id ? { ...i, file, url } : i));
  };
  const setLabel = (id, label) => update(items.map((i) => i.id === id ? { ...i, label } : i));
  const remove = (id) => update(items.filter((i) => i.id !== id));
  const add = () => {
    if (items.length >= MAX) return;
    update([...items, { id: crypto.randomUUID(), label: "" }]);
  };
  const validCount = items.filter((i) => i.file && hasMinWords(i.label, minWordsForReward)).length;
  const totalPoints = validCount * POINTS_PER;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        layout: true,
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 },
        className: "glass-card rounded-2xl p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
              "Image ",
              idx + 1
            ] }),
            items.length > MIN && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => remove(item.id),
                className: "text-muted-foreground hover:text-destructive",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePicker, { url: item.url, onPick: (f) => setFile(item.id, f) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: labelName }),
            multiline ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                className: "mt-1 rounded-xl",
                rows: 2,
                value: item.label,
                onChange: (e) => setLabel(item.id, e.target.value),
                placeholder: `Enter ${labelName.toLowerCase()}`
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "mt-1 rounded-xl",
                value: item.label,
                onChange: (e) => setLabel(item.id, e.target.value),
                placeholder: `Enter ${labelName.toLowerCase()}`
              }
            )
          ] }),
          item.url && hasMinWords(item.label, minWordsForReward) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.6 },
              animate: { opacity: 1, scale: 1 },
              transition: { type: "spring", stiffness: 220 },
              className: "mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary/15 to-primary-glow/15 border border-primary/30 px-4 py-3 text-primary shadow-soft",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-6 w-6" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-extrabold tracking-tight", children: [
                  "+",
                  POINTS_PER
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "points earned" })
              ]
            }
          )
        ]
      },
      item.id
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "rounded-xl",
          onClick: add,
          disabled: items.length >= MAX,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
            " Add More (",
            items.length,
            "/",
            MAX,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl px-5 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Total Reward Points" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-gradient", children: totalPoints })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
          validCount,
          " of ",
          items.length,
          " images complete"
        ] })
      ] })
    ] })
  ] });
}
function ImagePicker({ url, onPick }) {
  const ref = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: (e) => e.target.files?.[0] && onPick(e.target.files[0])
      }
    ),
    url ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => ref.current?.click(),
        className: "relative block w-full aspect-square overflow-hidden rounded-xl group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "upload", className: "h-full w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition grid place-items-center text-white text-xs font-medium", children: "Replace" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => ref.current?.click(),
        className: "flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground hover:border-primary hover:bg-primary/5 transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Click to upload" })
        ]
      }
    )
  ] });
}
export {
  ImageUploadList as I,
  Textarea as T,
  hasMinWords as h
};
