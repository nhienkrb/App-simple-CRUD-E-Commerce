import React, { useContext } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link as RouteLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ViewedContext } from "../context/ViewedProduct";

const favoriteIcon = {
  position: "absolute",
  top: 10,
  right: 10,
  color: "rgba(229, 229, 229, 0.67)",
  borderRadius: "50%",
  border: "1px solid rgba(229, 229, 229, 0.25)",
  padding: 1,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "red",
    color: "white",
    border: "1px solid red",
  },
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { addItem: addViewedItem } = useContext(ViewedContext); // Sử dụng context

  const sale = {
    position: "absolute",
    top: "15%",
    left: "-3%",
    display: product.is_active ? "none" : "block",
    borderRadius: "50%",
    backgroundColor: "#7eae1d",
    padding: "5px 10px",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
  };
  const outOfStock = {
    position: "absolute",
    top: "20%",
    padding: "7px 10px",
    fontWeight: "bold",
    fontSize: "1rem",
    width: "100%",
    height: "15%",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // nền trắng mờ
    display: product.is_active ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
  };

  // Hàm xử lý khi click vào tên sản phẩm
  const handleViewProduct = () => {
    addViewedItem({ product });
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: {
          xs: "center",
          sm: "flex-start",
        },
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "100%",
          color: {
            xs: "#8c181e",
            sm: "#8c181e",
          },
          marginBottom: 2,
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          height="180"
        />
        <FavoriteIcon fontSize="large" sx={favoriteIcon} />
        <Box sx={sale}> -5 </Box>
        <Box sx={outOfStock}>
          <Typography variant="h6" fontWeight="bold" color="black">
            HẾT HÀNG
          </Typography>
        </Box>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            {new Date(product.created_at).toLocaleDateString("vi-Vn")}
          </Typography>
          <Typography
            component={RouteLink}
            onClick={handleViewProduct} // Thêm sự kiện này
            sx={{
              textDecoration: "none",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "3rem",
            }}
            color="inherit"
            variant="body1"
            fontWeight="600"
            to={`/san-pham-chi-tiet/${product.slug}`}
          >
            {product.product_name}
          </Typography>
          <Typography variant="h6" color="black" fontWeight={700}>
            {product.price.toLocaleString()} ₫
          </Typography>
          <Box mt={1}>
            <Button
              onClick={() => addItem({ product })}
              variant="outlined"
              size="small"
              sx={{
                borderColor: "8c181e",
                color: "8c181e",
                "&:hover": {
                  color: "white",
                  background: "#8c181e",
                  borderColor: "#8c181e",
                },
              }}
            >
              Thêm Vào Giỏ
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}