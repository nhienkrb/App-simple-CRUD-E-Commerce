import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import NewProducts from "./NewsProduct";
import { useCart } from "../../context/CartContext";
import InforProduct from "./InforProduct";
import { useParams } from "react-router-dom";
import CarouselProductDetail from "./CarouselProductDetail";
import NoPage from "../NoPage";
import LineCut from "../../components/LineCut";
import ProductRecommend from "./ProductRecommend";
const API_URL = import.meta.env.VITE_API_URL;
export default function ProductDetail() {
  const { addItem } = useCart();
  const [product, setProduct] = React.useState({});
  const param = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/slug/${param.slug}`);

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [param]);
  if (!product || !product.data) {
    return <NoPage />;
  }
  return (
    <>
      <Grid size={{ xs: 12, sm: 4, md: 4 }}>
        <Box>
          <CarouselProductDetail />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 5, md: 5 }}>
        <Typography
          variant="h1"
          sx={{ lineHeight: 1.5, fontFamily: "UTM Seagull" }}
          color="secondary.main"
        >
          {product.data?.product_name || "None"}
        </Typography>
        <Typography variant="h2">{product.data?.price || "0"}₫</Typography>
        <Box
          component={"div"}
          dangerouslySetInnerHTML={{
            __html: `
          ${product.data?.description || "No description available."}
        `,
          }}
        />

        <Box component={"div"}> Kho hàng: {product.data?.quantity || 0}</Box>

        <Box flexDirection={"row"} display="flex" gap={2} mt={2}>
          <Button
            onClick={() => addItem({})}
            variant="outlined"
            size="large"
            sx={{
              borderColor: "rgb(206, 58, 58)",
              color: "rgb(206, 58, 58)",
              fontWeight: "bold",

              "&:hover": {
                color: "white",
                background: "#8c181e",
                borderColor: "#8c181e",
                fontWeight: "bold",
              },
              width: "50%",
            }}
          >
            Thêm Vào Giỏ
          </Button>

          <Button
            onClick={() => addItem({})}
            variant="outlined"
            size="large"
            sx={{
              background: "#8c181e",
              borderColor: "#8c181e",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                background: "#83161c",
              },
              width: "50%",
            }}
          >
            Mua Ngay
          </Button>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 3, md: 3 }}>
        <NewProducts />
      </Grid>

      <Grid size={{ xs: 12, sm: 9, md: 9 }} mt={5}>
        <InforProduct inforProduct={product.data?.infor_product} />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12 }} mt={5}>
        <LineCut nameLine="SẢN PHẨM CÙNG LOẠI" />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md:12 }} mt={ 5}>
        <ProductRecommend />
      </Grid>

           <Grid size={{ xs: 12, sm: 12, md: 12 }} mt={5}>
        <LineCut nameLine="TEA-PLUS" fontSize="h1"/>
      </Grid>
    </>
  );
}
