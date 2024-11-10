import { FC, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type User = {
  id: number;
  name: string;
};

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({ routeTree, defaultPendingMinMs: 0, context: { queryClient } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Main: FC = () => {
  console.log("Application startup... ");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ queryClient }} />
      </QueryClientProvider>
      <TanStackRouterDevtools router={router} />
    </>
  );
};

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Main />
    </StrictMode>,
  );
}
