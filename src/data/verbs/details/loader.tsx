import { detailsQueryOptions } from "./detailsQueryOptions";
import type { LoaderFunctionArgs } from "react-router";
import type { QueryClient } from "@tanstack/react-query";

export const loader = (queryClient: QueryClient) => (args: LoaderFunctionArgs) =>
  queryClient.ensureQueryData(detailsQueryOptions(args.params.id || ""));
