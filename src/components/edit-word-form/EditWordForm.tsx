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

import type { Word, EditWordInputs } from "../../data/vocabulary/model";
import { partOfSpeech } from "../../data/vocabulary/constants.ts";

export type EditWordFormProps = {
  word: Word;
  onUpdateWord?: (data: EditWordInputs) => Promise<void>;
};

export const EditWordForm = ({
  word,
  onUpdateWord: updateWord = () => Promise.resolve()
}: EditWordFormProps) => {
  const { control, formState, handleSubmit } = useForm<EditWordInputs>({
    defaultValues: {
      spanish: word.spanish,
      russian: word.russian,
      part_of_speech: word.part_of_speech,
      is_verified: word.is_verified
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
        onSubmit={handleSubmit((data) => {
          setCreated(false);
          updateWord(data).then(() => setCreated(true));
        })}
      >
        <FormGroup sx={{ gap: 2 }}>
          <Controller
            name="spanish"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
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
                    checked={field.value}
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
              <Alert color="success">Word was updated.</Alert>
            </Fade>
          </Box>
          <Button
            type="submit"
            loading={formState.isSubmitting}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};
