import { createBrowserRouter } from "react-router";

import { queryClient } from "../queryClient.tsx";
import { loader as infoLoader } from "../data/info";

import Home from "./home";
import Info from "./info";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/info", element: <Info />, loader: infoLoader(queryClient) }
]);
