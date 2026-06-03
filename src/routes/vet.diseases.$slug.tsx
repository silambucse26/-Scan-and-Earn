import { createFileRoute, useRouter, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getDisease } from "@/lib/diseases";
import { ImageUploadList, hasMinWords, type ImageItem } from "@/components/image-upload-list";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/vet/diseases/$slug")({
  head: ({ params }) => ({ meta: [{ title: `${getDisease(params.slug)?.name ?? "Disease"} — Upload` }] }),
  loader: ({ params }) => {
    const d = getDisease(params.slug);
    if (!d) throw notFound();
    return d;
  },
  component: DiseaseDetail,
});

function DiseaseDetail() {
  const d = Route.useLoaderData();
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
      category: "disease-vet",
      diseaseName: d.name,
      items: valid.map((i) => ({ file: i.file!, label: i.label })),
    });

    if (!result.ok) return toast.error(result.error || "Could not upload disease images");

    router.navigate({ to: "/success", search: { points } });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="text-5xl">{d.emoji}</div>
          <h1 className="mt-3 text-3xl font-bold">{d.name}</h1>
          <p className="mt-2 text-muted-foreground">{d.short}</p>

          {([
            ["Symptoms", d.symptoms],
            ["Causes", d.causes],
            ["Prevention", d.prevention],
            ["Treatment", d.treatment],
          ] as [string, string[]][]).map(([title, list]) => (
            <section key={title} className="glass-card rounded-2xl p-5 mt-5">
              <h3 className="font-semibold">{title}</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {list.map((it) => (
                  <li key={it} className="flex gap-2"><span className="text-primary mt-1">•</span><span>{it}</span></li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div>
          <div className="glass-card rounded-3xl p-6 sticky top-24">
            <h2 className="text-xl font-bold">Upload Dataset</h2>
            <p className="text-sm text-muted-foreground mt-1">Minimum 4 images with descriptions of at least 5 words. Each completed image = 20 points.</p>
            <div className="mt-6">
              <ImageUploadList labelName="Description" multiline minWordsForReward={5} onChange={(i, p) => { setItems(i); setPoints(p); }} />
            </div>
            <Button size="lg" onClick={submit} className="mt-6 w-full rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow">Submit Dataset ({points} pts)</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
