import { TableCell, TableHead, TableRow } from "@mui/material";

export const WordTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell>Spanish Word</TableCell>
      <TableCell>Russian Word</TableCell>
      <TableCell>Verified</TableCell>
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
        Updated
      </TableCell>
    </TableRow>
  </TableHead>
);
