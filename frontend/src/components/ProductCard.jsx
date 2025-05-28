import React from "react";
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
  const sale = {
    position: "absolute",
    top: "15%",
    left: "-3%",
    display: product.is_active ? "block" : "none",
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
    display: product.is_active ? "none" : "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
        <Box flexGrow={1}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: {
              xs: "center", // căn giữa trên mobile
              sm: "flex-start", // từ sm trở lên thì không căn giữa
            },
          }}
        >
          <Card
            sx={{
              width:"100%",
              maxWidth: "100%",
              color: {
                xs: "red", // màu đỏ khi ở xs
                sm: "inherit", // từ sm trở lên, dùng màu mặc định
              },
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
              <Typography variant="body1" fontWeight="bold">
                {product.product_name}
              </Typography>
              <Typography variant="h6" color="error" fontWeight={700}>
                {product.price.toLocaleString()} ₫
              </Typography>
              <Box mt={1}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "rgb(206, 58, 58)",
                    color: "rgb(206, 58, 58)",
                    "&:hover": {
                      color: "white",
                      background:"#7a9c59",
                      borderColor:"#7a9c59",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
  );
}
