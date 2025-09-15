import type { QueryClient } from "@tanstack/react-query";
import { infoQueryOptions } from "./infoQueryOptions.tsx";

export const loader = (queryClient: QueryClient) => () =>
  queryClient.ensureQueryData(infoQueryOptions());
