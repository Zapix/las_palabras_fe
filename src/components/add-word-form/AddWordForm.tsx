import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Fade,
  FormControl,
  FormGroup,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox
} from "@mui/material";

import type { CreateWordInputs } from "../../data/vocabulary/create";
import { partOfSpeech } from "../../data/vocabulary/constants.ts";

export type AddWordFormProps = {
  onCreateWord?: (data: CreateWordInputs) => Promise<void>;
};

export const AddWordForm = ({
  onCreateWord: createWord = () => Promise.resolve()
}: AddWordFormProps) => {
  const { control, formState, handleSubmit, reset } = useForm<CreateWordInputs>({
    defaultValues: {
      spanish: "",
      russian: "",
      part_of_speech: partOfSpeech[0],
      is_verified: false
    }
  });
  const [created, setCreated] = useState<boolean>();
  useEffect(() => {
    if (created) {
      const timeoutId = setTimeout(() => setCreated(false), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [created]);

  return (
    <Box sx={{ mt: 2 }}>
      <form
        onSubmit={handleSubmit(async (data) => {
          setCreated(false);
          await createWord(data);
          setCreated(true);
          // Reset the form to allow adding another entry quickly
          reset({ spanish: "", russian: "", part_of_speech: partOfSpeech[0], is_verified: false });
        })}
      >
        <FormGroup sx={{ gap: 2 }}>
          <Controller
            name="spanish"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Spanish"
                {...field}
              />
            )}
          />
          <Controller
            name="russian"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Russian"
                {...field}
              />
            )}
          />
          <Controller
            name="part_of_speech"
            control={control}
            render={({ field }) => (
              <FormControl>
                <Select
                  value={field.value}
                  onChange={field.onChange}
                >
                  {partOfSpeech.map((x) => (
                    <MenuItem
                      key={x}
                      value={x}
                    >
                      {x}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="is_verified"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={field.onChange}
                  />
                }
                label="Is Verified"
              />
            )}
          />
        </FormGroup>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "end",
            gap: 2,
            width: "100%"
          }}
        >
          <Box sx={{ grow: 1 }}>
            <Fade
              in={created}
              timeout={400}
            >
              <Alert color="success">Word was created.</Alert>
            </Fade>
          </Box>
          <Button
            type="submit"
            loading={formState.isSubmitting}
            variant="contained"
          >
            Create
          </Button>
        </Box>
      </form>
    </Box>
  );
};
