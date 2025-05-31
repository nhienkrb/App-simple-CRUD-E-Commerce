import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CartItemRow from "./CartItemRow";

export default function CartTable({ cartItems, deleteItem }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="cart table">
        <caption>Shopping Cart Table</caption>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "600" }} align="left">
              Delete
            </TableCell>
            <TableCell sx={{ fontWeight: "600" }} align="left">
              Product Name
            </TableCell>
            <TableCell sx={{ fontWeight: "600" }} align="center">
              Quantity
            </TableCell>
            <TableCell sx={{ fontWeight: "600" }} align="center">
              Price
            </TableCell>
            <TableCell sx={{ fontWeight: "600" }} align="center">
              Total Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((row) => (
              <CartItemRow key={row.productName} row={row} deleteItem={deleteItem} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Your shopping cart is currently empty.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}