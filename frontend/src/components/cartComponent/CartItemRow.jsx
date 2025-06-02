import React from "react";
import { Avatar, Box, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function CartItemRow({ product, deleteItem }) {
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
          onClick={() => deleteItem(product.product.id)}
          aria-label="delete"
          size="medium"
        >
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={product.product.image || "https://product.hstatic.net/200000305259/product/tee_pnk_1_61930d8deef94b2087c0a11f3b3aa02a_large.jpg"}
            sx={{ marginRight: 2, backgroundColor: "red" }}
            variant="rounded"
          />
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {product.product.product_name || "none"}
            </Typography>
              <Typography variant="body2" color="text.secondary">
                Size: {product.product.size || "none"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Color: {product.product.color || "none"}
              </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">{product.product.quantity}</TableCell>
      <TableCell align="center">{product.product.price}</TableCell>
      <TableCell align="center">{(product.product.quantity * product.product.price).toFixed(2)}</TableCell>
    </TableRow>
  );
}