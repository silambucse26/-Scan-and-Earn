import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Upload, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ImageItem {
  id: string;
  file?: File;
  url?: string;
  label: string;
}

const POINTS_PER = 20;
const MIN = 4;
const MAX = 10;

export function hasMinWords(value: string, minWords: number) {
  return value.trim().split(/\s+/).filter(Boolean).length >= minWords;
}

export function ImageUploadList({
  labelName,
  multiline = false,
  initialCount = MIN,
  minWordsForReward = 1,
  onChange,
}: {
  labelName: string;
  multiline?: boolean;
  initialCount?: number;
  minWordsForReward?: number;
  onChange?: (items: ImageItem[], points: number) => void;
}) {
  const [items, setItems] = useState<ImageItem[]>(
    Array.from({ length: initialCount }, () => ({ id: crypto.randomUUID(), label: "" })),
  );

  const update = (next: ImageItem[]) => {
    setItems(next);
    const points =
      next.filter((i) => i.file && hasMinWords(i.label, minWordsForReward)).length * POINTS_PER;
    onChange?.(next, points);
  };

  const setFile = (id: string, file?: File) => {
    const url = file ? URL.createObjectURL(file) : undefined;
    update(items.map((i) => (i.id === id ? { ...i, file, url } : i)));
  };
  const setLabel = (id: string, label: string) =>
    update(items.map((i) => (i.id === id ? { ...i, label } : i)));
  const remove = (id: string) => update(items.filter((i) => i.id !== id));
  const add = () => {
    if (items.length >= MAX) return;
    update([...items, { id: crypto.randomUUID(), label: "" }]);
  };

  const validCount = items.filter((i) => i.file && hasMinWords(i.label, minWordsForReward)).length;
  const totalPoints = validCount * POINTS_PER;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-card rounded-2xl p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Image {idx + 1}</span>
                {items.length > MIN && (
                  <button
                    onClick={() => remove(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <ImagePicker url={item.url} onPick={(f) => setFile(item.id, f)} />
              <div className="mt-3">
                <Label className="text-xs">{labelName}</Label>
                {multiline ? (
                  <Textarea
                    className="mt-1 rounded-xl"
                    rows={2}
                    value={item.label}
                    onChange={(e) => setLabel(item.id, e.target.value)}
                    placeholder={`Enter ${labelName.toLowerCase()}`}
                  />
                ) : (
                  <Input
                    className="mt-1 rounded-xl"
                    value={item.label}
                    onChange={(e) => setLabel(item.id, e.target.value)}
                    placeholder={`Enter ${labelName.toLowerCase()}`}
                  />
                )}
              </div>
              {item.url && hasMinWords(item.label, minWordsForReward) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 220 }}
                  className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary/15 to-primary-glow/15 border border-primary/30 px-4 py-3 text-primary shadow-soft"
                >
                  <Award className="h-6 w-6" />
                  <span className="text-2xl font-extrabold tracking-tight">+{POINTS_PER}</span>
                  <span className="text-sm font-semibold">points earned</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl"
          onClick={add}
          disabled={items.length >= MAX}
        >
          <Plus className="h-4 w-4 mr-1.5" /> Add More ({items.length}/{MAX})
        </Button>
        <div className="glass-card rounded-2xl px-5 py-3">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Total Reward Points</div>
              <div className="text-2xl font-bold text-gradient">{totalPoints}</div>
            </div>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {validCount} of {items.length} images complete
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagePicker({ url, onPick }: { url?: string; onPick: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="mt-3">
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onPick(e.target.files[0])}
      />
      {url ? (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="relative block w-full aspect-square overflow-hidden rounded-xl group"
        >
          <img src={url} alt="upload" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition grid place-items-center text-white text-xs font-medium">
            Replace
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground hover:border-primary hover:bg-primary/5 transition"
        >
          <Upload className="h-6 w-6" />
          <span className="text-xs">Click to upload</span>
        </button>
      )}
    </div>
  );
}

export function pointsFromItems(items: ImageItem[], minWordsForReward = 1) {
  return items.filter((i) => i.file && hasMinWords(i.label, minWordsForReward)).length * POINTS_PER;
}
