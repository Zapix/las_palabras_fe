import { useLoaderData, useSearchParams } from "react-router";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  Typography,
  IconButton
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import type { LoaderReturnData } from "../../data";
import type { loader } from "../../data/vocabulary/details";

export const Details = () => {
  const [searchParams] = useSearchParams();
  const prevPage = searchParams.get("refer") || "/vocabulary";

  const data = useLoaderData<LoaderReturnData<typeof loader>>();
  if (!data) {
    return <Box>No data found</Box>;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">
        <IconButton
          href={prevPage}
          size="large"
        >
          <ArrowBack />
        </IconButton>
        Word Details:
      </Typography>
      <Divider />
      <Container>
        <List>
          <ListItem>
            <Typography variant="body1">Spanish:</Typography>
            <Typography
              variant="body2"
              sx={{ ml: 2 }}
            >
              {data.spanish}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">Russian:</Typography>
            <Typography
              variant="body2"
              sx={{ ml: 2 }}
            >
              {data.russian}
            </Typography>
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};
