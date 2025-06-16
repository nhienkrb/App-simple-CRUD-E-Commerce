import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useCart } from "../../context/CartContext";
import { Link as RouterLink } from "react-router-dom";

export default function ProvisionalPayment({setShowCheckout}) {
  const { countCartItems, getTotalPrice } = useCart();

  return (
    <>
      <Grid
        container
        direction="row"
        size={{ xs: 12, sm: 12, md: 12 }}
        sx={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          p: 2,
        }}
      >
        <Box sx={{ maxWidth: 400 }} elevation={3} mt={5}>
          <Typography sx={{ mb: 1 }}>
            <span>Total Product:</span>
            <span style={{ float: "right", fontWeight: "bold" }}>
              {typeof countCartItems === "function" ? countCartItems() : 0}
            </span>
          </Typography>

          <Box sx={{ mb: 5, fontWeight: "bold", fontSize: "1em", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <span style={{ color: "#c9ae63", }}>Provisional Payment</span>
            <span style={{
                fontWeight: "bold",
                marginLeft: "10rem",
              }}
            >
              {typeof getTotalPrice === "function"
                ? getTotalPrice().toLocaleString() + " $"
                : 0}
            </span>
          </Box>
        </Box>
      </Grid>

      <Grid
        container
        direction="row"
        size={{ xs: 6, sm: 6, md: 6 }}
        justifyContent={"space-between"}
      >
        <Box
          component={"div"}
          sx={{ width: "100%", maxWidth: 400, textAlign: "start" }}
          elevation={3}
          mb={5}
        >
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            sx={{
              boxShadow: 0,
              border: "1px solid #323232",
              backgroundColor: "transparent",
              width: "100%",
              p: 1,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Continue Shopping
          </Button>
        </Box>

        <Box
          component={"div"}
          sx={{ width: "100%", maxWidth: 400, textAlign: "start" }}
          elevation={3}
          mb={5}
        >
          <Button
            onClick={() => setShowCheckout(true)} // 👈
            variant="contained"
            sx={{
              boxShadow: 0,
              backgroundColor: "#323232",
              width: "100%",
              p: 1,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Order
          </Button>
        </Box>
      </Grid>
    </>
  );
}
