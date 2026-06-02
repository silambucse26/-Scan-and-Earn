import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ImageUploadList, type ImageItem } from "@/components/image-upload-list";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/farmer/feed")({
  head: () => ({ meta: [{ title: "Feed Image Upload — Farmer" }] }),
  component: FeedUpload,
});

function FeedUpload() {
  const { addSubmission } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<ImageItem[]>([]);
  const [points, setPoints] = useState(0);

  const submit = async () => {
    const valid = items.filter((i) => i.file && i.label.trim());
    if (valid.length < 4) return toast.error("Please upload at least 4 images with feed names.");

    const result = await addSubmission({
      category: "feed",
      items: valid.map((i) => ({ file: i.file!, label: i.label })),
    });

    if (!result.ok) return toast.error(result.error || "Could not upload feed images");

    router.navigate({ to: "/success", search: { points } });
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Feed Image Upload</h1>
      <p className="text-muted-foreground mt-2">
        Upload at least 4 cattle feed images. Each completed image earns 20 points.
      </p>
      <div className="mt-8">
        <ImageUploadList
          labelName="Feed Name"
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
