import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = React.useState("store");

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ my: 3 }}>
        PHƯƠNG THỨC THANH TOÁN
      </Typography>

      <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{backgroundColor:"#ffff"}}>
            <TextField required label="Tên" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{backgroundColor:"#ffff"}}>
            <TextField required label="Địa chỉ" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}sx={{backgroundColor:"#ffff"}}>
            <TextField required label="Tỉnh / Thành phố" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}sx={{backgroundColor:"#ffff"}}>
            <TextField required label="Số điện thoại" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}sx={{backgroundColor:"#ffff"}}>
            <TextField required label="Địa chỉ email" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}sx={{backgroundColor:"#ffff"}}>
            <TextField label="Apartment, suite, unit... (optional)" fullWidth />
          </Grid>
      </Grid>

      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              variant="outlined"
              onClick={() => handlePaymentChange("store")}
              sx={{
                borderColor:
                  paymentMethod === "store" ? "primary.main" : "grey.300",
                borderWidth: 2,
              }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "center" }}>
                  <StoreIcon fontSize="large" color="primary" />
                  <Typography sx={{ mt: 1 , height: "3rem",}}>
                    Nhận hàng tại cửa hàng 
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              variant="outlined"
              onClick={() => handlePaymentChange("cod")}
              sx={{
                borderColor:
                  paymentMethod === "cod" ? "primary.main" : "grey.300",
                borderWidth: 2,
              }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "center" }}>
                  <LocalShippingIcon fontSize="large" color="primary" />
                  <Typography sx={{ mt: 1 , height: "3rem",}}>
                    Giao hàng và thu tiền tại nơi (COD)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              variant="outlined"
              onClick={() => handlePaymentChange("bank")}
              sx={{
                borderColor:
                  paymentMethod === "bank" ? "primary.main" : "grey.300",
                borderWidth: 2,
              }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "center" }}>
                  <AccountBalanceIcon fontSize="large" color="primary" />
                  <Typography sx={{ mt: 1 , height: "3rem", }}>
                    Thanh toán chuyển khoản
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography>
          📍123 Tô Diện, Phường Khương Trung, Quận 12, TP HCM
        </Typography>
        <Typography>📍 Xóm 8 - Nam Vân - TP Nam Định - Nam Định</Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <FormControlLabel
          control={<Radio />}
          label="Giao hàng tới địa chỉ khác?"
        />
      </Box>

      <Button variant="contained" color="error" fullWidth sx={{ py: 1.5 }}>
        Đặt hàng
      </Button>
    </Container>
  );
}
