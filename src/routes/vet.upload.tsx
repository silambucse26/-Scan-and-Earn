import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ImageUploadList, hasMinWords, type ImageItem } from "@/components/image-upload-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/vet/upload")({
  head: () => ({ meta: [{ title: "Upload Images — Veterinarian" }] }),
  component: VetUpload,
});

function VetUpload() {
  const { addSubmission } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<ImageItem[]>([]);
  const [points, setPoints] = useState(0);

  const submit = async () => {
    const valid = items.filter((i) => i.file && hasMinWords(i.label, 5));
    if (!title.trim()) return toast.error("Add a case title.");
    if (valid.length < 4) {
      return toast.error("Please upload at least 4 images with descriptions of at least 5 words.");
    }

    const result = await addSubmission({
      category: "disease-vet",
      diseaseName: notes.trim() ? `${title.trim()} — ${notes.trim()}` : title.trim(),
      items: valid.map((i) => ({ file: i.file!, label: i.label })),
    });

    if (!result.ok) return toast.error(result.error || "Could not upload case images");

    router.navigate({ to: "/success", search: { points } });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="glass-card rounded-3xl p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold">Case Information</h2>
          <div className="mt-4 space-y-4">
            <div>
              <Label>Case Title</Label>
              <Input
                className="mt-1.5 rounded-xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Bovine pneumonia case"
              />
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea
                className="mt-1.5 rounded-xl"
                rows={6}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Background and observations"
              />
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-sm">
              <div className="font-medium text-primary">Reward Preview</div>
              <div className="mt-1 text-2xl font-bold text-gradient">{points} points</div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">Upload Images With Description</h1>
          <p className="text-muted-foreground mt-2">
            Minimum 4 images with descriptions of at least 5 words. Each completed image earns 20 points.
          </p>
          <div className="mt-6">
            <ImageUploadList
              labelName="Description"
              multiline
              minWordsForReward={5}
              onChange={(i, p) => {
                setItems(i);
                setPoints(p);
              }}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              size="lg"
              onClick={submit}
              className="rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow px-8"
            >
              Submit Case
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
