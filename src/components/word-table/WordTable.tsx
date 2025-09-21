import { Table, TableBody } from "@mui/material";

import type { Vocabulary, Word } from "../../data/vocabulary/model";

import { WordTableHead } from "./WordTableHead.tsx";
import { WordTableRow } from "./WordTableRow.tsx";

export type WordTableProps = {
  vocabulary: Vocabulary;
  onVerifiedChange: (id: Word["id"], isVerified: boolean) => void;
};

export const WordTable = ({
  vocabulary,
  onVerifiedChange: handleVerifiedChange
}: WordTableProps) => (
  <Table>
    <WordTableHead />
    <TableBody>
      {vocabulary.map((x) => (
        <WordTableRow
          key={x.id}
          word={x}
          onVerifiedChange={handleVerifiedChange}
        />
      ))}
    </TableBody>
  </Table>
);
