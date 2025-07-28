import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentMethods from "./PaymentMethod";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const API_URL = `${import.meta.env.VITE_API_URL}/orders/order-items`;
const API_URL_PAYMENT = `${import.meta.env.VITE_API_URL}/payment`;

export default function CheckoutForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [bankSubMethod, setBankSubMethod] = useState("momo");
  const { cartItems, clearCart, getTotalPrice } = useCart();
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };
  const handleOrder = async () => {
    if (!isAuthenticated(token)) {
      alert("Bạn cần đăng nhập để đặt hàng.");
      navigate("/login");
    }
    const payload = {
      name: form.name,
      phone: form.phone,
      address: `${form.address}`,
      loyalty_usage: "use",
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      amount: getTotalPrice() * 1000,
    };
    if (paymentMethod === "bank") {
      try {
        const api =
          bankSubMethod === "momo"
            ? API_URL_PAYMENT + "/momo"
            : API_URL_PAYMENT + "/vnpay";

        const res = await fetch(api, {
          method: "POST", // hoặc GET tùy backend bạn
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log(data);
        if (data.payUrl) {
          window.location.href = data.payUrl;
        } else {
          alert("Không thể tạo link thanh toán.");
        }
      }
       catch (error) {
        console.error(error);
        alert("Có lỗi khi gọi thanh toán.");
      }
      return; // không chạy tiếp xử lý đặt hàng ở dưới
    }
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Đặt hàng thất bại");
      }

      const data = await response.json();
      alert("✅ Đặt hàng thành công!");
      clearCart();
    } catch (error) {
      console.error(error);
      alert("❌ Có lỗi xảy ra khi đặt hàng.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Thông tin đặt hàng
      </Typography>

      {/* Thông tin người nhận */}
      <TextField
        fullWidth
        margin="normal"
        label="Họ và tên"
        name="name"
        value={form.name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Số điện thoại"
        name="phone"
        value={form.phone}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Địa chỉ giao hàng"
        name="address"
        value={form.address}
        onChange={handleInputChange}
      />

      {/* Chọn phương thức thanh toán */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Chọn phương thức thanh toán
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {/* COD */}
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
                <Typography sx={{ mt: 1, height: "3rem" }}>
                  Thanh toán COD
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Nhận tại cửa hàng */}
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
                <Typography sx={{ mt: 1, height: "3rem" }}>
                  Nhận tại cửa hàng
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Chuyển khoản ngân hàng */}
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
                <Typography sx={{ mt: 1, height: "3rem" }}>
                  Chuyển khoản ngân hàng
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {/* Nếu chọn chuyển khoản → hiện Radio chọn Momo/VNPay */}
      {paymentMethod === "bank" && (
        <PaymentMethods method={bankSubMethod} onChange={setBankSubMethod} />
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleOrder}
      >
        Đặt hàng
      </Button>
    </Box>
  );
}
