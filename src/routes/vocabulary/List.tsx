import { useMemo, useEffect } from "react";
import { useLocation } from "react-router";
import { Container, Pagination, PaginationItem, Link } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { listQueryOptions } from "../../data/vocabulary/list";
import { WordTable } from "../../components/word-table";
import { toggleVerifiedMutationOptions } from "../../data/vocabulary/update";
import type { Word } from "../../data/vocabulary/model";

const LIST_URL = "/vocabulary";
const pageLink = (page: number) =>
  page === 0 || page === 1 ? LIST_URL : `${LIST_URL}?page=${page}`;

export const List = () => {
  const location = useLocation();
  const pageParam = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return +(params.get("page") || "1");
  }, [location]);

  const { data } = useQuery(listQueryOptions(pageParam - 1));
  const { items = [], page = 1, per_page = 20, total = 0 } = data || {};
  const pages = Math.ceil(total / per_page);

  useEffect(() => {
    if (!document.startViewTransition) return;
    const transition = document.startViewTransition(() => {
      // React Router already swapped children by now
    });

    transition.finished.then(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [page]);

  const queryClient = useQueryClient();
  const toggleVerifiedMutation = useMutation(
    toggleVerifiedMutationOptions(queryClient)
  );
  const toggleVerified = (id: Word["id"], isVerified: boolean) => {
    toggleVerifiedMutation.mutate({ id, isVerified });
  };

  if (!data) {
    return;
  }

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <WordTable
        vocabulary={items}
        onVerifiedChange={toggleVerified}
      />
      <Pagination
        sx={{ mt: 4 }}
        count={pages}
        page={page + 1}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            href={pageLink(item.page || 1)}
            data-transition-type={(item.page || 1) > pageParam ? "rtl" : "ltr"}
            {...item}
          />
        )}
      />
    </Container>
  );
};
