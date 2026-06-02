import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "Home — Cattle Scan & Earn" }],
  }),
  component: About,
});

function About() {
  const router = useRouter();

  useEffect(() => {
    router.navigate({ to: "/", replace: true });
  }, [router]);

  return null;
}
