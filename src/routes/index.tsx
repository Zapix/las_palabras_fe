import { createBrowserRouter } from "react-router";

import { queryClient } from "../queryClient.tsx";
import { loader as infoLoader } from "../data/info";
import { loader as vocabularyDetailsLoader } from "../data/vocabulary/details";
import { loader as vocabularyListLoader } from "../data/vocabulary/list";
import { loader as verbsListLoader } from "../data/verbs/list";
import { loader as verbsDetailsLoader } from "../data/verbs/details";

import Home from "./home";
import Info from "./info";
import { List, Details, Create } from "./vocabulary";
import { List as VerbsList, Details as VerbDetails } from "./verbs";
import { Layout } from "./layout.tsx";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, element: <Home /> },
      { path: "/info", element: <Info />, loader: infoLoader(queryClient) },
      {
        path: "/vocabulary",
        element: <List />,
        loader: vocabularyListLoader(queryClient)
      },
      {
        path: "/verbs",
        element: <VerbsList />,
        loader: verbsListLoader(queryClient)
      },
      {
        path: "/verbs/:id",
        element: <VerbDetails />,
        loader: verbsDetailsLoader(queryClient)
      },
      { path: "/vocabulary/create", element: <Create /> },
      {
        path: "/vocabulary/:id",
        element: <Details />,
        loader: vocabularyDetailsLoader(queryClient)
      }
    ]
  }
]);
