import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  FormControlLabel,
  Radio,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useCart } from "../../context/CartContext";

export default function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = React.useState("store");
  const {cartItems,clearCart} = useCart();
  // Dữ liệu form
  const [form, setForm] = React.useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    apartment: "",
  });

  // Giỏ hàng giả lập (có thể thay bằng useCart context)

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handleOrder = async () => {
    const payload = {
      address: `${form.address}, ${form.city}, ${form.apartment}`,
      loyalty_usage: "use",
      items: cartItems.map((item)=>({product_id: item.id, quantity: item.quantity})),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/orders/order-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer jsFc1ymgBbuk8iX89hTfMz2WOuVUSnAMWShs4DQv67e5264c"
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Đặt hàng thất bại");
      }

      // const data = await response.json();
      alert("✅ Đặt hàng thành công!");
      // console.log(data);
      clearCart();
    } catch (error) {
      console.error(error);
      alert("❌ Có lỗi xảy ra khi đặt hàng.");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ my: 3 }}>
        PHƯƠNG THỨC THANH TOÁN
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tên"
            required
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Địa chỉ"
            required
            fullWidth
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tỉnh / Thành phố"
            required
            fullWidth
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Số điện thoại"
            required
            fullWidth
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Địa chỉ email"
            required
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Apartment, suite, unit... (optional)"
            fullWidth
            value={form.apartment}
            onChange={(e) => setForm({ ...form, apartment: e.target.value })}
          />
        </Grid>
      </Grid>

      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card
              variant="outlined"
              onClick={() => handlePaymentChange("store")}
              sx={{
                borderColor: paymentMethod === "store" ? "primary.main" : "grey.300",
                borderWidth: 2,
              }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "center" }}>
                  <StoreIcon fontSize="large" color="primary" />
                  <Typography sx={{ mt: 1, height: "3rem" }}>
                    Nhận tại cửa hàng
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              variant="outlined"
              onClick={() => handlePaymentChange("cod")}
              sx={{
                borderColor: paymentMethod === "cod" ? "primary.main" : "grey.300",
                borderWidth: 2,
              }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "center" }}>
                  <LocalShippingIcon fontSize="large" color="primary" />
                  <Typography sx={{ mt: 1, height: "3rem" }}>
                    Giao hàng & thu tiền tại nơi (COD)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              variant="outlined"
              onClick={() => handlePaymentChange("bank")}
              sx={{
                borderColor: paymentMethod === "bank" ? "primary.main" : "grey.300",
                borderWidth: 2,
              }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "center" }}>
                  <AccountBalanceIcon fontSize="large" color="primary" />
                  <Typography sx={{ mt: 1, height: "3rem" }}>
                    Thanh toán chuyển khoản
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography>📍 123 Tô Diện, Phường Khương Trung, Quận 12, TP HCM</Typography>
        <Typography>📍 Xóm 8 - Nam Vân - TP Nam Định - Nam Định</Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <FormControlLabel
          control={<Radio />}
          label="Giao hàng tới địa chỉ khác?"
        />
      </Box>

      <Button
        onClick={handleOrder}
        variant="contained"
        color="error"
        fullWidth
        sx={{ py: 1.5 }}
      >
        Đặt hàng
      </Button>
    </Container>
  );
}
