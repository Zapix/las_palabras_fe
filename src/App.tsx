import { RouterProvider } from "react-router/dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { router } from "./routes";
import { queryClient } from "./queryClient.tsx";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
export default App;
