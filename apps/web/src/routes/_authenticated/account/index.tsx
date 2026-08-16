import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/account/")({
  component: AccountPage,
});

function AccountPage() {
  return <div>Hello "/_authenticated/account/"!</div>;
}
