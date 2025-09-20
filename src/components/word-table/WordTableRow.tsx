import { Link, TableCell, TableRow } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import { format, toDate } from "date-fns";

import type { Word } from "../../data/vocabulary/model";

export type WordTableRowProps = { word: Word };

export const WordTableRow = ({ word }: WordTableRowProps) => (
  <TableRow>
    <TableCell>
      <Link
        href={`/vocabulary/${word.id}`}
        underline="hover"
      >
        {word.spanish}
      </Link>
    </TableCell>
    <TableCell>
      <Link
        href={`/vocabulary/${word.id}`}
        underline="hover"
      >
        {word.russian}
      </Link>
    </TableCell>
    <TableCell>{word.is_verified ? <CheckIcon /> : <CloseIcon />}</TableCell>
    <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
      {format(toDate(word.updated_at), "dd.MM.yyyy HH:mm:ss")}
    </TableCell>
  </TableRow>
);
