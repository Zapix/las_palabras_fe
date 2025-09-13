import { createBrowserRouter } from "react-router";

import { queryClient } from "../queryClient.tsx";
import { loader as infoLoader } from "../data/info";

import Home from "./home";
import Info from "./info";
import { Layout } from "./layout.tsx";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, element: <Home /> },
      { path: "/info", element: <Info />, loader: infoLoader(queryClient) }
    ]
  }
]);
