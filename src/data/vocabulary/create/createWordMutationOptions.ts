import type {
  DefaultError,
  MutationOptions,
  QueryClient
} from "@tanstack/react-query";
import { clientV1 } from "../../../api";
import type { Word } from "../model";

// Inputs for creating a word match the RawWord schema from the API
export type CreateWordInputs = Pick<
  Word,
  "spanish" | "russian" | "part_of_speech"
> & { is_verified?: boolean | null };

export const createWordMutationOptions = (
  queryClient?: QueryClient
): MutationOptions<Word, DefaultError, CreateWordInputs> => ({
  mutationFn: async (newWord: CreateWordInputs) => {
    const { data, error } = await clientV1.POST("/api/v1/vocabulary", {
      body: newWord
    });
    if (!data || error) {
      throw new Error("Error creating word");
    }
    return data;
  },
  onSuccess: (data: Word) => {
    if (!queryClient) return;
    // Populate details cache for the newly created word
    queryClient.setQueryData(["vocabulary", "details", data.id], data);
    // Invalidate any list caches to refetch with the new item included
    queryClient
      .getQueryCache()
      .findAll({ queryKey: ["vocabulary", "list"] })
      .forEach((query) => {
        queryClient
          .invalidateQueries({ queryKey: query.queryKey })
          .catch(() => {});
      });
  }
});
