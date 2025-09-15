import type { QueryClient } from "@tanstack/react-query";

import { listQueryOptions } from "./listQueryOptions.tsx";
import type { LoaderFunctionArgs } from "react-router";

export const loader =
  (queryClient: QueryClient) =>
  ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    return queryClient.ensureQueryData(
      listQueryOptions(+(searchParams.get("page") || "1") - 1)
    );
  };
