import { createFileRoute, Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import { RedirectSearchParamSchema } from "@/lib/schemas";

export const Route = createFileRoute("/500/")({
  validateSearch: RedirectSearchParamSchema,
  component: InternalServerErrorPage,
});

function InternalServerErrorPage() {
  const { redirect } = Route.useSearch();
  const linkClassName = buttonVariants({ variant: "outline" });

  return (
    <div className="typeset flex h-full flex-col items-center justify-center gap-y-3">
      <h1 className="text-destructive">500 - Internal server error</h1>
      <p>Something went wrong. Please try again later or contact support.</p>
      {redirect ? (
        <Link className={linkClassName} to={redirect}>
          Retry
        </Link>
      ) : (
        <Link className={linkClassName} to="/">
          Back to Home page
        </Link>
      )}
    </div>
  );
}
