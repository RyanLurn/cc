import { createRouter } from "@tanstack/react-router";

import { DefaultNotFoundPage } from "@/components/default-pages/not-found";
import { routeTree } from "@/routeTree.gen";

export function getRouter() {
  const router = createRouter({
    defaultNotFoundComponent: DefaultNotFoundPage,
    scrollRestoration: true,
    routeTree,
  });

  return router;
}
