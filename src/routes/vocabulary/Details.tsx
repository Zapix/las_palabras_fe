import { useLoaderData, useSearchParams } from "react-router";
import { Box, Container, Divider, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { LoaderReturnData } from "../../data";
import type { loader } from "../../data/vocabulary/details";
import { EditWordForm } from "../../components/edit-word-form";
import { updateMutationOptions as updateWordOptions } from "../../data/vocabulary/update";

export const Details = () => {
  const [searchParams] = useSearchParams();
  const prevPage = searchParams.get("refer") || "/vocabulary";

  const queryClient = useQueryClient();
  const data = useLoaderData<LoaderReturnData<typeof loader>>();
  const { mutateAsync } = useMutation(updateWordOptions(data.id, queryClient));

  if (!data) {
    return <Box>No data found</Box>;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">
        <IconButton
          href={prevPage}
          size="large"
          data-transition-type="ltr"
        >
          <ArrowBack />
        </IconButton>
        Word Details:
      </Typography>
      <Divider />
      <Container>
        <EditWordForm
          word={data}
          onUpdateWord={async (data) => {
            await mutateAsync(data);
          }}
        />
      </Container>
    </Box>
  );
};
