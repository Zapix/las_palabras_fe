import { queryOptions } from "@tanstack/react-query";
import { clientV1 } from "../../../api";

export const detailsQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["verbs", "details", id],
    queryFn: async () => {
      if (!id) return Promise.reject("No id provided");
      const { data, error } = await clientV1.GET("/api/v1/verbs/{id}", {
        params: { path: { id } }
      });
      if (!data || error) {
        return Promise.reject(error || "Can't fetch data");
      }
      return data;
    }
  });
