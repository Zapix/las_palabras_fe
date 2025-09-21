import { createBrowserRouter } from "react-router";

import { queryClient } from "../queryClient.tsx";
import { loader as infoLoader } from "../data/info";
import { loader as vocabularyDetailsLoader } from "../data/vocabulary/details";

import Home from "./home";
import Info from "./info";
import { List, Details } from "./vocabulary";
import { Layout } from "./layout.tsx";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, element: <Home /> },
      { path: "/info", element: <Info />, loader: infoLoader(queryClient) },
      { path: "/vocabulary", element: <List /> },
      {
        path: "/vocabulary/:id",
        element: <Details />,
        loader: vocabularyDetailsLoader(queryClient)
      }
    ]
  }
]);
