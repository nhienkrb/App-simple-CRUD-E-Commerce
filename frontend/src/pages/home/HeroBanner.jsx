import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SidebarCategories from "./SidebarCategories";
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
      <Grid container spacing={1}>
             <Grid
              size={{md:3}}
              sx={{
                display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'block',
                },
              }}
            >
          <SidebarCategories/>
        </Grid>
        <Grid size={{xs:12,sm:12,md:9,lg:9,xl:9}}>
          <Box borderRadius={2} style={{ overflow: "hidden" }}>
            <Slider {...settings}>
              <Box>
                <img
                  src="https://bachlien.vn/wp-content/uploads/2025/03/2.png"
                  alt="Banner 1"
                  style={{ width: "100%", height: "350px", objectFit: "fill" }}
                />
              </Box>
              <div>
                <img
                  src="https://bachlien.vn/wp-content/uploads/2025/02/Banner-tra-shan.png"
                  alt="Banner2"
                  style={{ width: "100%", height: "350px", objectFit: "fill" }}
                />
              </div>
            </Slider>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
