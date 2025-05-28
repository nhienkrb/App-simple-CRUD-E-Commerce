import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function HeroBanner() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        mb: 4, // ngăn cuộn ngang
      }}
    >
      <Box style={{ height: "300px", overflow: "hidden" }}>
        <Slider {...settings}>
          <Box>
            <img
              src="https://theme.hstatic.net/200000411483/1000786878/14/slider_2.jpg?v=313"
              alt="Banner 1"
              style={{ width: "100%", height: "300px", objectFit: "fill" }}
            />
          </Box>
          <div>
            <img
              src="https://theme.hstatic.net/200000411483/1000786878/14/slider_3.jpg?v=313"
              alt="Banner2"
              style={{ width: "100%", height: "300px", objectFit: "fill" }}
            />
          </div>
        </Slider>
      </Box>
    </Container>
  );
}
