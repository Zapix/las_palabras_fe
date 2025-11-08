import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@mui/material";

import type { RegularConjugation } from "../../data/verbs/model";
import { objectUtils } from "../../utils/objectUtils.ts";
import { ConjugationLabels } from "./constants.ts";

export type ConjugationProps = { conjugation: RegularConjugation };

export const Conjugation = ({ conjugation }: ConjugationProps) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Person</TableCell>
        <TableCell>Conjugation</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {objectUtils.entries(conjugation).map(([person, form]) => (
        <TableRow key={person}>
          <TableCell>{ConjugationLabels[person]}</TableCell>
          <TableCell>{form}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
