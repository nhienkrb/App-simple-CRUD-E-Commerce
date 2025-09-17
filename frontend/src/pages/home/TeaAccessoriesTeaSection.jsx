import { Box, Container, Grid } from "@mui/material";
import React from "react";
import LineCut from "../../components/LineCut";
import SlideProduct from "./SlideProduct";
import Slider from "react-slick";
import ProductCard from "../../components/ProductCard";
import useFetchList from "../../hooksCustom/useFetchList";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function TeaAccessoriesTeaSection() {
  const API_URL = import.meta.env.VITE_API_URL + "/products";
  const products = useFetchList(API_URL, { method: "GET" });
  if (!products || products.length === 0) {
    return <Box>No recommended products available.</Box>;
  }

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 6000,
    cssEase: "linear",
    dots: false,
    arrows: false,
  };

  return (
    <Container maxWidth="xl">
      <LineCut
        nameLine={"PHỤ KIỆN TRÀ"}
        fontSize={"1.3rem"}
        bg_nen={"/img/bg-nen.png"}
        colorNameLine={"#FFF"}
      />

      <Grid container spacing={2}>
        <Grid
          size={{ md: 4 }}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <Box>
            <Box width={"90%"} component={"img"} src="/img/tu-tra-4.png" />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
          <div className="slider-container">
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product.id} className="slider-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          </div>
          <Box sx={{textAlign:"center" }} >
            <Link to={"#"} style={{color:"#8c181e", textDecoration:"none", textTransform:"capitalize", fontWeight:"bold"}}>
              Xem Tất cả sản phẩm  <ArrowForwardIosIcon fontSize="small"   />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
