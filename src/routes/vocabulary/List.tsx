import { useLoaderData } from "react-router";
import { Box, Pagination, PaginationItem, Link } from "@mui/material";

import type { loader } from "../../data/vocabulary/list";
import type { LoaderReturnData } from "../../data";
import { WordTable } from "../../components/word-table";

const LIST_URL = "/vocabulary";
const pageLink = (page: number) =>
  page === 0 || page === 1 ? LIST_URL : `${LIST_URL}?page=${page}`;

export const List = () => {
  const data = useLoaderData<LoaderReturnData<typeof loader>>();
  if (!data) {
    return;
  }
  const { items, page, per_page, total } = data;
  const pages = Math.ceil(total / per_page);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <WordTable vocabulary={items} />
      <Pagination
        sx={{ mt: 4 }}
        count={pages}
        page={page + 1}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={pageLink(item.page || 1)}
            {...item}
          />
        )}
      />
    </Box>
  );
};
