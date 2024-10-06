import { FC, StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { getCurrentUser } from "../backend/auth";

export type User = {
  id: number;
  name: string;
};

// Create a new router instance
const router = createRouter({ routeTree, context: { user: null, value: 12, update: () => {} } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Main: FC = () => {
  console.log("Application startup. Loading authentication info ... ");
  const [currentUserPromise] = useState<Promise<User | null>>(() => getCurrentUser());
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    currentUserPromise.then((user) => {
      setCurrentUser(user);
    });
  }, []);

  if (currentUser === undefined) {
    return <div>Loading ...</div>;
  }

  return <RouterProvider router={router} context={{ user: currentUser }} />;
};

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Main />
    </StrictMode>
  );
}
