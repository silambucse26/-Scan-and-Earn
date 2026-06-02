import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const searchSchema = z.object({
  points: z.coerce.number().optional(),
});

export const Route = createFileRoute("/success")({
  head: () => ({ meta: [{ title: "Submission Received" }] }),
  validateSearch: searchSchema,
  component: Success,
});

function Success() {
  const { points } = useSearch({ from: "/success" });
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 180 }}
        className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow">
        <CheckCircle2 className="h-12 w-12" />
      </motion.div>
      <h1 className="mt-8 text-4xl font-bold">Thank You For Your Submission</h1>

      {points && points > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 180 }}
          className="mt-8 mx-auto max-w-md rounded-3xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border-2 border-primary/30 px-8 py-8 shadow-soft"
        >
          <div className="flex items-center justify-center gap-2 text-primary">
            <Award className="h-7 w-7" />
            <span className="text-sm font-semibold uppercase tracking-wider">You Earned</span>
          </div>
          <div className="mt-2 text-7xl font-extrabold text-gradient leading-none">+{points}</div>
          <div className="mt-2 text-base font-medium text-muted-foreground">reward points (pending verification)</div>
        </motion.div>
      ) : null}

      <p className="mt-6 text-muted-foreground">
        Our veterinary verification team will review your uploaded images. After successful verification, reward points will be credited to your account.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/profile"><Button size="lg" className="rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow">Go To Dashboard</Button></Link>
        <Link to="/"><Button size="lg" variant="outline" className="rounded-2xl">Home</Button></Link>
      </div>
    </div>
  );
}
