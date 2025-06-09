import React from "react";
import { Container, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
export default function LayoutProductDetail() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} sx={{ mt: 4, mb: 4 }}>
        <Outlet />
        </Grid>
    </Container>
  );
}
