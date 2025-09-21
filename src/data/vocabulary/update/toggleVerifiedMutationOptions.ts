import type { MutationOptions, QueryClient } from "@tanstack/react-query";
import type { VocabularyListLoaderData, Word } from "../model";
import { clientV1 } from "../../../api";

export const toggleVerifiedMutationOptions = (
  queryClient: QueryClient,
  revalidate: () => void = () => {}
): MutationOptions<
  Word,
  unknown,
  { id: Word["id"]; isVerified: boolean },
  { previousWord?: Word }
> => ({
  mutationFn: async ({ id, isVerified }) => {
    const { data, error } = await clientV1.PATCH("/api/v1/vocabulary/{id}", {
      params: { path: { id } },
      body: { is_verified: isVerified }
    });
    if (!data || error) {
      throw new Error("Error toggling verified status");
    }
    return data;
  },
  onMutate: async ({ id, isVerified }) => {
    await queryClient.cancelQueries({ queryKey: ["vocabulary", "list"] });
    await queryClient.cancelQueries({
      queryKey: ["vocabulary", "details", id]
    });
    const previousWord = queryClient.getQueryData<Word>([
      "vocabulary",
      "details",
      id
    ]);
    if (previousWord) {
      queryClient.setQueryData<Word>(["vocabulary", "details", id], (old) =>
        old
          ? {
              ...old,
              is_verified: isVerified,
              updated_at: new Date().toISOString()
            }
          : old
      );
    }
    queryClient
      .getQueryCache()
      .findAll({ queryKey: ["vocabulary", "list"] })
      .forEach((query) => {
        queryClient.setQueryData<VocabularyListLoaderData>(
          query.queryKey,
          (oldData) => {
            if (!oldData) {
              return oldData;
            }
            const { items, ...rest } = oldData;
            const newItems = items.map((item) =>
              item.id === id ? { ...item, is_verified: isVerified } : item
            );
            return { items: newItems, ...rest };
          }
        );
      });
    revalidate();
    return { previousWord };
  },
  onError: (_err, variables, context) => {
    if (context?.previousWord) {
      queryClient.setQueryData<Word>(
        ["vocabulary", "details", variables.id],
        context.previousWord
      );
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
              item.id === context.previousWord!.id
                ? context.previousWord!
                : item
            );
            return { items: newItems, ...rest };
          });
        });
    }
    revalidate();
  },
  onSettled: async (_data, _error, variables) => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["vocabulary", "details", variables.id]
      }),
      queryClient.invalidateQueries({ queryKey: ["vocabulary", "list"] })
    ]);
    revalidate();
  }
});
