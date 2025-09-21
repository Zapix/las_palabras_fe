import { useCallback } from "react";
import { Link, TableCell, TableRow, Switch } from "@mui/material";
import { format, toDate } from "date-fns";

import type { Word } from "../../data/vocabulary/model";

export type WordTableRowProps = {
  word: Word;
  onVerifiedChange: (id: Word["id"], isVerified: boolean) => void;
};

export const WordTableRow = ({
  word,
  onVerifiedChange: handleVerifiedChanged
}: WordTableRowProps) => {
  const toggleVerify = useCallback(() => {
    handleVerifiedChanged(word.id, !word.is_verified);
  }, [word]);

  return (
    <TableRow>
      <TableCell>
        <Link
          href={`/vocabulary/${word.id}`}
          underline="hover"
          data-transition-type="rtl"
        >
          {word.spanish}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          href={`/vocabulary/${word.id}`}
          underline="hover"
          data-transition-type="rtl"
        >
          {word.russian}
        </Link>
      </TableCell>
      <TableCell>
        <Switch
          checked={word.is_verified}
          onChange={toggleVerify}
        />
      </TableCell>
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
        {format(toDate(word.updated_at), "dd.MM.yyyy HH:mm:ss")}
      </TableCell>
    </TableRow>
  );
};
