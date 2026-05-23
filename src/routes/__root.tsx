import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import wireframeGrayscaleCss from "../styles/wireframe-grayscale.css?url";
import wireframeSketchyCss from "../styles/wireframe-sketchy.css?url";
import wireframeBlueprintCss from "../styles/wireframe-blueprint.css?url";
import wireframeSkeletonCss from "../styles/wireframe-skeleton.css?url";

const WIREFRAME_STYLES = new Set(["grayscale", "sketchy", "blueprint", "skeleton"]);

function WireframeToggle() {
  const search = useRouterState({ select: (s) => s.location.searchStr });
  useEffect(() => {
    const params = new URLSearchParams(search);
    const wf = params.get("wf");
    const root = document.documentElement;
    if (wf && WIREFRAME_STYLES.has(wf)) {
      root.dataset.wireframe = wf;
    } else {
      delete root.dataset.wireframe;
    }
  }, [search]);
  return null;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Patria C — Plataforma de evaluación" },
      { name: "description", content: "Academia ciudadana de #PerúTeQuiero. Forma jóvenes peruanos en liderazgo y democracia." },
      { name: "author", content: "Patria C" },
      { property: "og:title", content: "Patria C — Plataforma de evaluación" },
      { property: "og:description", content: "Academia ciudadana de #PerúTeQuiero. Forma jóvenes peruanos en liderazgo y democracia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Patria C — Plataforma de evaluación" },
      { name: "twitter:description", content: "Academia ciudadana de #PerúTeQuiero. Forma jóvenes peruanos en liderazgo y democracia." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/04bdc937-0c81-4a50-81cc-5134e0f6e2ca/id-preview-f0c12b80--08e71c51-36bc-4c9e-a9a3-0631cea481e8.lovable.app-1778342013507.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/04bdc937-0c81-4a50-81cc-5134e0f6e2ca/id-preview-f0c12b80--08e71c51-36bc-4c9e-a9a3-0631cea481e8.lovable.app-1778342013507.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "stylesheet", href: wireframeGrayscaleCss },
      { rel: "stylesheet", href: wireframeSketchyCss },
      { rel: "stylesheet", href: wireframeBlueprintCss },
      { rel: "stylesheet", href: wireframeSkeletonCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <WireframeToggle />
      <Outlet />
    </QueryClientProvider>
  );
}
