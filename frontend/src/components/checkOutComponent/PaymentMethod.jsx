import {
  Box,
  Typography,
  Stack,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import React, { useState } from "react";

export default function PaymentMethods({method,onChange}) {

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        <PaymentIcon sx={{ mr: 1 }} />
        Chọn phương thức thanh toán
      </Typography>

      <RadioGroup value={method} onChange={(e) => onChange(e.target.value)}>
        <Stack spacing={2} mt={2}>
          {/* Momo */}
          <Card
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border:
                method === "momo" ? "2px solid deeppink" : "1px solid #ccc",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountBalanceWalletIcon sx={{ mr: 1, color: "deeppink" }} />
              <Typography>Thanh toán qua Momo</Typography>
            </Box>
            <FormControlLabel
              value="momo"
              control={<Radio color="secondary" />}
              label=""
            />
          </Card>

          {/* VNPay */}
          <Card
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border:
                method === "vnpay" ? "2px solid blue" : "1px solid #ccc",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CreditCardIcon sx={{ mr: 1, color: "blue" }} />
              <Typography>Thanh toán qua VNPay</Typography>
            </Box>
            <FormControlLabel
              value="vnpay"
              control={<Radio color="primary" />}
              label=""
            />
          </Card>
        </Stack>
      </RadioGroup>
    </Box>
  );
}
