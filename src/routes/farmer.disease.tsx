import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ImageUploadList, hasMinWords, type ImageItem } from "@/components/image-upload-list";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/farmer/disease")({
  head: () => ({ meta: [{ title: "Disease Image Upload — Farmer" }] }),
  component: DiseaseUpload,
});

function DiseaseUpload() {
  const { addSubmission } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<ImageItem[]>([]);
  const [points, setPoints] = useState(0);

  const submit = async () => {
    const valid = items.filter((i) => i.file && hasMinWords(i.label, 5));
    if (valid.length < 4) {
      return toast.error("Please upload at least 4 images with descriptions of at least 5 words.");
    }

    const result = await addSubmission({
      category: "disease-farmer",
      items: valid.map((i) => ({ file: i.file!, label: i.label })),
    });

    if (!result.ok) return toast.error(result.error || "Could not upload disease images");

    router.navigate({ to: "/success", search: { points } });
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Disease Image Upload</h1>
      <p className="text-muted-foreground mt-2">
        Upload at least 4 disease images with descriptions of at least 5 words. Each completed image earns 20 points.
      </p>
      <div className="mt-8">
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
      <div className="mt-8 flex justify-end">
        <Button
          size="lg"
          onClick={submit}
          className="rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow px-8"
        >
          Submit ({points} pts)
        </Button>
      </div>
    </div>
  );
}
