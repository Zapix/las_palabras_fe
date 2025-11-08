import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useLoaderData } from "react-router";

import type { LoaderReturnData } from "../../data";
import { TIMES } from "../../data/verbs/";
import type { loader } from "../../data/verbs/details";
import { TimeAccordion } from "../../components/time-accordion";

export const Details = () => {
  const data = useLoaderData<LoaderReturnData<typeof loader>>();

  if (!data) return <Box>No data found</Box>;

  const updatedAt = new Date(data.updated_at).toLocaleString();

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">
        <IconButton
          href="/verbs"
          size="large"
          data-transition-type="ltr"
        >
          <ArrowBack />
        </IconButton>
        Verb Details:
      </Typography>
      <Divider />
      <Container sx={{ mt: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
        >
          {data.verb}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          Updated at: {updatedAt}
        </Typography>
        {TIMES.map((timeType) => {
          const timeData = data[timeType];
          if (!timeData) {
            return null;
          }
          return (
            <TimeAccordion
              key={timeType}
              timeType={timeType}
              time={timeData}
            />
          );
        })}
      </Container>
    </Box>
  );
};
