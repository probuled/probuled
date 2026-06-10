import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { LandingPage } from "@/pages/landing";

const landingSearchSchema = z.object({
  ref: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: landingSearchSchema,
  component: LandingPage,

  pendingComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <span className="font-display text-neutral-400">Loading…</span>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center px-6 text-center text-neutral-500">
      {error.message}
    </div>
  ),
});
