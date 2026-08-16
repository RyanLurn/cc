import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <div>Hello "/_authenticated"!</div>;
}
