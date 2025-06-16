import { Container, Typography } from "@mui/material";
import React from "react";
import CartTable from "../../components/cartComponent/CartTable";
import { useCart } from "../../context/CartContext";
import ProvisionalPayment from "../../components/cartComponent/ProvisionalPayment";
import CheckOutForm from "../../components/checkOutComponent/CheckOutForm";

export default function ShoppingCart() {
  const { cartItems, deleteItem } = useCart();
  const [showCheckout, setShowCheckout] = React.useState(false);
  return (
    <Container maxWidth="xl" style={{ marginTop: "20px" }}>
      <Typography variant="h1" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
       
      {cartItems.length === 0 ? (
        <Typography variant="h4" component="h2" color="textSecondary" align="center">
          Your shopping cart is currently empty.
        </Typography>
      ) : (
        <CartTable cartItems={cartItems} deleteItem={(productName)=>deleteItem(productName)} />
      )}


      <ProvisionalPayment setShowCheckout={setShowCheckout}/>

      {showCheckout && <CheckOutForm />}
    </Container>
  );
}