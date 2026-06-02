import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { AuthProvider } from "../lib/auth-context";
import { Toaster } from "../components/ui/sonner";
import { Navbar, Footer } from "../components/layout";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cattle Scan & Earn — Veterinary Data Platform" },
      { name: "description", content: "Upload cattle disease and feed images to help build the world's largest veterinary dataset and earn rewards." },
      { property: "og:title", content: "Cattle Scan & Earn — Veterinary Data Platform" },
      { name: "twitter:title", content: "Cattle Scan & Earn — Veterinary Data Platform" },
      { property: "og:description", content: "Upload cattle disease and feed images to help build the world's largest veterinary dataset and earn rewards." },
      { name: "twitter:description", content: "Upload cattle disease and feed images to help build the world's largest veterinary dataset and earn rewards." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ca90d58c-cf9d-4b1c-8567-88a0dc99bc3b/id-preview-59eedc02--e68e9076-0ec1-479d-879c-075a152d2a7a.lovable.app-1780148776453.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ca90d58c-cf9d-4b1c-8567-88a0dc99bc3b/id-preview-59eedc02--e68e9076-0ec1-479d-879c-075a152d2a7a.lovable.app-1780148776453.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1"><Outlet /></main>
          <Footer />
        </div>
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
