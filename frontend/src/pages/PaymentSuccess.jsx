import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const API_ORDER_ITEMS = `${import.meta.env.VITE_API_URL}/orders/order-items`;
const API_GET_PAYLOAD = `${import.meta.env.VITE_API_URL}/payment/order-temp`;

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const { clearCart } = useCart();
  const { token } = useAuth();

  useEffect(() => {
      // Nếu chưa có token thì chờ token được load xong rồi mới gọi lại
  if (!token) return;
  const resultCode = params.get("resultCode");
  const orderKey = params.get("order_key");

  // Nếu thanh toán thất bại hoặc thiếu orderKey
  if (resultCode !== "0" || !orderKey) {
    setMessage("Thanh toán thất bại!");
    setIsSuccess(false);
    return;
  }

  const handleCreateOrder = async () => {
    try {
      const resPayload = await fetch(`${API_GET_PAYLOAD}?key=${orderKey}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { payload } = await resPayload.json();

      const res = await fetch(API_ORDER_ITEMS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Lỗi khi tạo đơn hàng");

      setMessage("Thanh toán thành công!");
      setIsSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
      setMessage("Tạo đơn hàng thất bại sau thanh toán.");
      setIsSuccess(false);
    }
  };

  handleCreateOrder();
}, [token]);

  if (isSuccess === null) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress color="primary" />
        <Typography sx={{ mt: 2 }}>
          Đang kiểm tra trạng thái thanh toán...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Stack spacing={3} alignItems="center">
        {isSuccess ? (
          <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "green" }} />
        ) : (
          <CancelOutlinedIcon sx={{ fontSize: 80, color: "red" }} />
        )}
        <Typography variant="h4" fontWeight={600}>
          {message}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {isSuccess
            ? "Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý."
            : "Có lỗi xảy ra trong quá trình đặt hàng sau khi thanh toán."}
        </Typography>
        <Button
          variant="contained"
          color={isSuccess ? "primary" : "error"}
          onClick={() => navigate(isSuccess ? "/" : "/gio-hang")}
        >
          {isSuccess ? "Về trang chủ" : "Thử lại"}
        </Button>
      </Stack>
    </Container>
  );
}
