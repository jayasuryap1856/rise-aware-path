import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Safe Harbor Alerts" },
      { name: "description", content: "Safe Harbor Alerts provides early flood warnings, safe zones, and evacuation routes for India." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Safe Harbor Alerts" },
      { property: "og:description", content: "Safe Harbor Alerts provides early flood warnings, safe zones, and evacuation routes for India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Safe Harbor Alerts" },
      { name: "twitter:description", content: "Safe Harbor Alerts provides early flood warnings, safe zones, and evacuation routes for India." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7f36a6dc-5a64-4ca2-9aaf-e42e97b81009/id-preview-06871487--d309f717-531b-4e09-8ef2-0dae4e5eca4d.lovable.app-1778068698994.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7f36a6dc-5a64-4ca2-9aaf-e42e97b81009/id-preview-06871487--d309f717-531b-4e09-8ef2-0dae4e5eca4d.lovable.app-1778068698994.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
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
  return <Outlet />;
}
