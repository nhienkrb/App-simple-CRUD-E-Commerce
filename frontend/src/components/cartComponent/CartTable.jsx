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

  const totalPrice = 0;

  const countTotalPrice   =  (price)=>{
    return  totalPrice + price;
  }

  return (
    <TableContainer component={Paper} sx={{backgroundColor:"#f5f5f5"}}>
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
            cartItems.map((product, index) => (
              <CartItemRow key={index} product={product} deleteItem={deleteItem} countTotalPrice={countTotalPrice}  />
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