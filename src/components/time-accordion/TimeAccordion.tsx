import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box
} from "@mui/material";
import { ExpandMoreTwoTone } from "@mui/icons-material";

import type { Times } from "../../data/verbs/model";
import { Conjugation } from "../conjugation";
import { timeTypeLabels } from "./constants.ts";
import { getConjugationLabel } from "./utils.ts";

export type TimeAccordionProps = {
  timeType: keyof Times;
  time: Times[keyof Times];
};

export const TimeAccordion = ({ timeType, time }: TimeAccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreTwoTone />}
        aria-controls={`${timeType}-content`}
        id={`${timeType}-info`}
      >
        <Typography variant="h6">{timeTypeLabels[timeType]}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {Object.entries(time).map(([conjugationKey, conjugation]) => (
          <Box key={conjugationKey}>
            <Typography variant="subtitle1">
              {getConjugationLabel(conjugationKey)}
            </Typography>
            <Conjugation conjugation={conjugation} />
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
