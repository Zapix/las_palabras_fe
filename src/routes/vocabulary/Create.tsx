import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AddWordForm } from "../../components/add-word-form/AddWordForm";
import { createWordMutationOptions } from "../../data/vocabulary/create";

export const Create = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(createWordMutationOptions(queryClient));

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton href="/vocabulary" size="large" data-transition-type="ltr">
          <ArrowBack />
        </IconButton>
        Add New Word
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Container>
        <AddWordForm onCreateWord={async (data) => { await mutateAsync(data); }} />
      </Container>
    </Box>
  );
};
