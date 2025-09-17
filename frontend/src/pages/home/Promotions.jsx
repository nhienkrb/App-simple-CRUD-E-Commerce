import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LineCut from "../../components/LineCut";
const promotions = [
  {
    title: "Chương trình ưu đãi duy nhất trong tháng",
    image: "https://bachlien.vn/wp-content/uploads/2023/02/qua-tet.jpg",
  },
  {
    title: "Chương trình tri ân cho khách hàng thân thiết",
    image: "https://bachlien.vn/wp-content/uploads/2023/02/hop-qua-tet.jpg",
  },
];
export default function Promotions() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        mb: 4, // ngăn cuộn ngang
      }}
    >
      <LineCut nameLine="Chương trình ưu đãi" fontSize={"1.5rem"} />
      <Grid container spacing={2}>
        {promotions.map((promo, i) => (
          <Grid key={i} size={{ xs: 6, sm: 6, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                border: "3px solid transparent",
                "&:hover": {
                  borderColor: "#FFD700", // viền vàng khi hover
                },
              }}
            >
              {/* Ảnh */}
              <Box
                component="img"
                src={promo.image}
                alt={promo.title}
                sx={{
                  width: "100%",
                  height: 350,
                  objectFit: "cover",
                  display: "block",
                  cursor: "pointer",
                }}
              />

              {/* Overlay text */}
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#fff",
                  fontWeight: "bold",
                  textShadow: "2px 2px 5px rgba(0,0,0,0.6)",
                  bgcolor: "rgba(0,0,0,0.2)",
                  px: 2,
                  borderRadius: 1,
                  textWrap: "nowrap",
                }}
              >
                {promo.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
