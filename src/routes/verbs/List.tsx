import { useMemo } from "react";
import { useLocation } from "react-router";
import {
  Container,
  List as MUIList,
  ListItem,
  ListItemText,
  Pagination,
  PaginationItem,
  Link
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { listQueryOptions } from "../../data/verbs/list";

const LIST_URL = "/verbs";
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

  if (!data) return null;

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <MUIList sx={{ width: "100%", maxWidth: 800 }}>
        {items.map((v) => (
          <ListItem
            key={v.id}
            divider
          >
            <ListItemText
              primary={v.verb}
              secondary={new Date(v.updated_at).toLocaleString()}
            />
          </ListItem>
        ))}
      </MUIList>
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
