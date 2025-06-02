import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import useFetchList from "../../hooksCustom/useFetchList";
import ProductCard from "../../components/ProductCard";

const API_URL = "http://localhost:8000/api/v1/products";
export default function ProductList() {
  const products = useFetchList(API_URL);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Box flex={1} height="1px" bgcolor="gray" />
        <Typography variant="h6" fontWeight="bold" sx={{ mx: 2 }}>
          HỘP TRÀ CAO CẤP
        </Typography>
        <Box flex={1} height="1px" bgcolor="gray" />
      </Box>
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
          <Grid  size={{ xs: 12, sm: 4, md:2.4 }}  key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
