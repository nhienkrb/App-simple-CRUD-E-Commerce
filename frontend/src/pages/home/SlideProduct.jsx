import { Container, Typography, Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { Link as RouterLink } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import useFetchList from "../../hooksCustom/useFetchList";
import LineCut from "../../components/LineCut";

export default function SlideProduct() {
 const API_URL = import.meta.env.VITE_API_URL + "/products";
  const products = useFetchList(API_URL, { method: "GET" });
  if (!products || products.length === 0) {
    return <Box>No recommended products available.</Box>;
  }

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 6000,
    cssEase: "linear",
    dots:false,
    arrows: false,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <LineCut nameLine="SẢN PHẨM NỔI BẬT" />
    <div className="slider-container" >
      <Slider {...settings} >
        {products.map((product) => (
          <div key={product.id} className="slider-item">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
   </Container>
  );
}
