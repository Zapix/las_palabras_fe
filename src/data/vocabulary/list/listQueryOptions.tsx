import { queryOptions } from "@tanstack/react-query";

import { clientV1 } from "../../../api";

export const listQueryOptions = (page = 0) =>
  queryOptions({
    queryKey: ["vocabulary", "list", page],
    queryFn: () =>
      clientV1
        .GET("/api/v1/vocabulary", { params: { query: { page } } })
        .then(({ data, error }) => {
          if (!data || error) {
            Promise.reject(error || "Can't fetch data");
          }
          return data;
        })
  });
