import { Table, TableBody } from "@mui/material";

import type { Vocabulary } from "../../data/vocabulary/model";

import { WordTableHead } from "./WordTableHead.tsx";
import { WordTableRow } from "./WordTableRow.tsx";

export type WordTableProps = { vocabulary: Vocabulary };

export const WordTable = ({ vocabulary }: WordTableProps) => (
  <Table>
    <WordTableHead />
    <TableBody>
      {vocabulary.map((x) => (
        <WordTableRow
          key={x.id}
          word={x}
        />
      ))}
    </TableBody>
  </Table>
);
