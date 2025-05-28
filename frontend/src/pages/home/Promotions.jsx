import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
export default function Promotions() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
    <Link component={RouterLink} to={"/promotion-fast-sale"} style={{ textDecoration: "none" }}>
      <Box
        component="img"
        src="https://cf.shopee.vn/file/sg-11134258-7ratj-ma7vj3kc2g1rfb_xxhdpi"
        alt="Promotion Banner"
        sx={{
          width: "100%",
          display: "block",
          height: "12rem",
          objectFit: "fill", // Giữ nguyên toàn bộ ảnh, không cắt viền
          transition: "transform 0.8s cubic-bezier(.25,.8,.25,1)",
          "&:hover": {
            transform: "scale(1.02)", // Phóng to nhẹ khi hover
          },
        }}
      />
      </Link>
    </Container>
  );
}
