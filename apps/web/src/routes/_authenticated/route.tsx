import { createFileRoute, redirect } from "@tanstack/react-router";

import { getUser } from "@/features/auth/ops/get-user.function";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const getUserResult = await getUser();

    if (getUserResult.ok) {
      return getUserResult.data;
    }

    const error = getUserResult.error;
    if (error.code === "UNAUTHENTICATED_ERROR") {
      throw redirect({
        to: "/sign-in",
        search: { redirect: location.pathname },
      });
    }
    throw redirect({ to: "/500" });
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <div>Hello "/_authenticated"!</div>;
}
