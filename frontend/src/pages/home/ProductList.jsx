import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import useFetchList from "../../hooksCustom/useFetchList";
import ProductCard from "../../components/ProductCard";
import LineCut from "../../components/LineCut";
const API_URL = `${import.meta.env.VITE_API_URL}/products`;
export default function ProductList() {
  const products = useFetchList(API_URL);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* <Box display="flex" alignItems="center" mb={4}>
        <Box flex={1} height="1px" bgcolor="gray" />
        <Typography variant="h6" fontWeight="bold" sx={{ mx: 2 }}>
          HỘP TRÀ CAO CẤP
        </Typography>
        <Box flex={1} height="1px" bgcolor="gray" />
      </Box> */}
        <LineCut nameLine="HỘP TRÀ CAO CẤP" />

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
          <Grid  size={{ xs: 6, sm: 4, md:2.4 }}  key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
