import type {
  DefaultError,
  MutationOptions,
  QueryClient
} from "@tanstack/react-query";

import { clientV1 } from "../../../api";
import type { EditWordInputs, Word } from "../model";

export const updateMutationOptions = (
  id: Word["id"],
  queryClient?: QueryClient
): MutationOptions<Word, DefaultError, EditWordInputs> => ({
  mutationFn: async (updatedWord: EditWordInputs) => {
    const { data, error } = await clientV1.PATCH("/api/v1/vocabulary/{id}", {
      params: { path: { id } },
      body: updatedWord
    });
    if (!data || error) {
      throw new Error("Error updating word");
    }
    return data;
  },
  onSuccess: (data: Word) => {
    if (queryClient) {
      queryClient.setQueryData(["vocabulary", "details", id], data);
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ["vocabulary", "list"] })
        .forEach((query) => {
          queryClient.setQueryData(query.queryKey, (oldData) => {
            const { items, ...rest } = oldData as {
              items: Word[];
              [key: string]: unknown;
            };
            const newItems = items.map((item) =>
              item.id === data.id ? data : item
            );
            return { items: newItems, ...rest };
          });
        });
    }
  }
});
