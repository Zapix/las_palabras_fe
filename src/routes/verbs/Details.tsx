import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useLoaderData } from "react-router";

import type { LoaderReturnData } from "../../data";
import type { loader } from "../../data/verbs/details";

export const Details = () => {
  const data = useLoaderData<LoaderReturnData<typeof loader>>();

  if (!data) return <Box>No data found</Box>;

  const updatedAt = new Date(data.updated_at).toLocaleString();

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">
        <IconButton href="/verbs" size="large" data-transition-type="ltr">
          <ArrowBack />
        </IconButton>
        Verb Details:
      </Typography>
      <Divider />
      <Container sx={{ mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          {data.verb}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Updated at: {updatedAt}
        </Typography>

        {/* Render simple sections if present, minimal formatting */}
        {data.indicativo && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Indicativo</Typography>
            <Typography variant="subtitle2">Presente</Typography>
            <pre>{JSON.stringify(data.indicativo.presente, null, 2)}</pre>
          </Box>
        )}
        {data.subjuntivo && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Subjuntivo</Typography>
            <Typography variant="subtitle2">Presente</Typography>
            <pre>{JSON.stringify(data.subjuntivo.presente, null, 2)}</pre>
          </Box>
        )}
      </Container>
    </Box>
  );
};
