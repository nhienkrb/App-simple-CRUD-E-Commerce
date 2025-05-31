import React from "react";
import { Avatar, Box, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function CartItemRow({ row, deleteItem }) {
  return (
    <TableRow
      hover={true}
      sx={{
        borderBottom: "1.5px dashed #bfbfbf",
        cursor: "pointer",
      }}
    >
      <TableCell sx={{ width: "1rem" }}>
        <IconButton
          onClick={() => deleteItem(row.productName)}
          aria-label="delete"
          size="medium"
        >
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={row.image || "https://product.hstatic.net/200000305259/product/tee_pnk_1_61930d8deef94b2087c0a11f3b3aa02a_large.jpg"}
            sx={{ marginRight: 2, backgroundColor: "red" }}
            variant="rounded"
          />
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {row.productName}
            </Typography>
              <Typography variant="body2" color="text.secondary">
                Size: {row.size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Color: {row.color}
              </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">{row.quantity}</TableCell>
      <TableCell align="center">{row.price}</TableCell>
      <TableCell align="center">{row.quantity * row.price}</TableCell>
    </TableRow>
  );
}