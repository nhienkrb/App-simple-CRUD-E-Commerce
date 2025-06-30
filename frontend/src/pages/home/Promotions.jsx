import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
export default function Promotions() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
    <Link component={RouterLink} to={"/promotion-fast-sale"} style={{ textDecoration: "none" }}>
      <Box
        component="img"
        src="https://img.freepik.com/free-vector/flat-international-tea-day-horizontal-banner-template_23-2149383127.jpg"
        alt="Promotion Banner"
        sx={{
          width: "100%",
          display: "block",
          height: "12rem",
          objectFit: "cover", // Giữ nguyên toàn bộ ảnh, không cắt viền
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
