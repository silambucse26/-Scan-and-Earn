import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "Home — Cattle Scan & Earn" }],
  }),
  component: Contact,
});

function Contact() {
  const router = useRouter();

  useEffect(() => {
    router.navigate({ to: "/", replace: true });
  }, [router]);

  return null;
}
