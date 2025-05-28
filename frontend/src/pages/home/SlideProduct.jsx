import { Container, Typography, Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { Link as RouterLink } from "react-router-dom";

export default function SlideProduct() {
   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px", // Loại bỏ khoảng trắng 2 bên
    arrows: true,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, overflowX: "hidden" }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Box flex={1} height="1px" bgcolor="gray" />
        <Typography variant="h6" fontWeight="bold" sx={{ mx: 2 }}>
          SẢN PHẨM NỔI BẬT
        </Typography>
        <Box flex={1} height="1px" bgcolor="gray" />
      </Box>

      <Box
        sx={{
          overflowY: "scroll", // vẫn cho phép cuộn nếu cần
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        }}
      >
        <Slider {...settings}>
          {[...Array(6)].map((_, index) => (
             <Box
              key={index}
              sx={{
                height: 300,
              }}
            >
            <img style={{width:"100%"}} src="https://tracothu.vn/wp-content/uploads/2024/11/Hop-Bach-Nien-Tra-1-247x296.png" />
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
}
