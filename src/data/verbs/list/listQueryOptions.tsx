import { queryOptions } from "@tanstack/react-query";

import { clientV1 } from "../../../api";

export const listQueryOptions = (page = 0) =>
  queryOptions({
    queryKey: ["verbs", "list", page],
    queryFn: async () => {
      const { data, error } = await clientV1.GET("/api/v1/verbs", {
        params: { query: { page } }
      });
      if (!data || error) {
        return Promise.reject(error || "Can't fetch data");
      }
      return data;
    }
  });
