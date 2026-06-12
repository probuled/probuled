import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Nav } from "@/widgets/nav";
import { Footer } from "@/widgets/footer";
import { useReveal } from "@/shared/hooks";

function LayoutWithNavFooter() {
  useReveal();
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export const Route = createFileRoute("/_layout")({
  component: LayoutWithNavFooter,
});
