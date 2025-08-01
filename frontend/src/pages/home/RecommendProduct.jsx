import { Box, Container, Grid, Typography } from "@mui/material";
import useFetchList from "../../hooksCustom/useFetchList";
import ProductCard from "../../components/ProductCard";
import LineCut from "../../components/LineCut";
import {useAuth} from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
const API_URL = `${import.meta.env.VITE_API_URL}/recommend-products`;
export default function RecommendProduct() {
  const { token } = useAuth();
  const { cartItems } = useCart();
  const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchRecommended = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          cart_product_ids: cartItems.map((item) => item.id),
        }),
      });

      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Lỗi gợi ý sản phẩm:", error);
    }
  };

  fetchRecommended();
}, [token, cartItems]);


  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <LineCut nameLine="SẢN PHẨM GỢI Ý CHO BẠN" />

      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: {
            xs: "center", // căn giữa trên mobile
            sm: "flex-start", // căn trái từ màn hình sm trở lên
          },
        }}
      >
        {products.map((product) => (
          <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
