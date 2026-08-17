import { createFileRoute } from "@tanstack/react-router";

import { getUser } from "@/features/auth/ops/get-user.function";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => getUser(),
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <div>Hello "/_authenticated"!</div>;
}
