import type { QueryClient } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router";

import { listQueryOptions } from "./listQueryOptions";

export const loader =
  (queryClient: QueryClient) =>
  ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    return queryClient.ensureQueryData(
      listQueryOptions(+(searchParams.get("page") || "1") - 1)
    );
  };
