import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Nav } from "@/widgets/nav";
import { Footer } from "@/widgets/footer";
import { Button } from "@/shared/ui";
import { useReveal } from "@/shared/hooks";

function RootLayout() {
  useReveal();
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

function RootError({ error }: { error: Error }) {
  return (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div className="max-w-narrow">
        <h1 className="font-display font-bold text-[clamp(2rem,1.4rem+2.6vw,3rem)]">
          Something broke.
        </h1>
        <p className="text-neutral-500 mt-4">{error.message}</p>
        <Button as="a" href="/" className="mt-8">
          Back to home
        </Button>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div className="max-w-narrow">
        <span className="font-display font-extrabold text-[6rem] leading-none text-purple-200">
          404
        </span>
        <h1 className="font-display font-bold text-[clamp(1.6rem,1.2rem+2vw,2.4rem)] mt-2">
          Page not found.
        </h1>
        <Button as="a" href="/" className="mt-8">
          Back to home
        </Button>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: RootError,
  notFoundComponent: NotFound,
});
