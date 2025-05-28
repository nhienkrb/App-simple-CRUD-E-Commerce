import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

export default function ProductCatalog() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Grid sx={{ sm: 6, md: 4 }} container spacing={8}>
        <Box>
          <Avatar
            src="https://theme.hstatic.net/200000411483/1000786878/14/brand_3.jpg?v=313"
            alt="Brand 4"
            sx={{
              width: 100,
              height: 100,
              margin: 1,
              borderRadius: 50,
              border: "1px solid #f2f2f2",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.2)",
                border: "2px solid #8c8c8c", // Phóng to nhẹ khi hover
              },
            }}
          />
          <Typography>Name Category</Typography>
        </Box>
        <Box>
          <Avatar
            src="https://theme.hstatic.net/200000411483/1000786878/14/brand_3.jpg?v=313"
            alt="Brand 4"
            sx={{
              width: 100,
              height: 100,
              margin: 1,
              borderRadius: 50,
              border: "1px solid #f2f2f2",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.2)",
                border: "2px solid #8c8c8c", // Phóng to nhẹ khi hover
              },
            }}
          />
          <Typography>Name Category</Typography>
        </Box>
        <Box>
          <Avatar
            src="https://theme.hstatic.net/200000411483/1000786878/14/brand_3.jpg?v=313"
            alt="Brand 4"
            sx={{
              width: 100,
              height: 100,
              margin: 1,
              borderRadius: 50,
              border: "1px solid #f2f2f2",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.2)",
                border: "2px solid #8c8c8c", // Phóng to nhẹ khi hover
              },
            }}
          />
          <Typography>Name Category</Typography>
        </Box>{" "}
        <Box>
          <Avatar
            src="https://theme.hstatic.net/200000411483/1000786878/14/brand_3.jpg?v=313"
            alt="Brand 4"
            sx={{
              width: 100,
              height: 100,
              margin: 1,
              borderRadius: 50,
              border: "1px solid #f2f2f2",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.2)",
                border: "2px solid #8c8c8c", // Phóng to nhẹ khi hover
              },
            }}
          />
          <Typography>Name Category</Typography>
        </Box>
      </Grid>
    </Container>
  );
}
