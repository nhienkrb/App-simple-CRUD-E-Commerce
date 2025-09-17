import { Box, Grid, Typography } from "@mui/material"
import React from "react"
import LineCut from "../../components/LineCut"
const products = [
  {
    name: "Trà Thiết Quan Âm",
    image:
      "https://bachlien.vn/wp-content/uploads/2024/02/tra-shan-tuyet-co-thu-ta-xua-son-la-4.jpg",
  },
  {
    name: "Bạch Trà Shan Tuyết",
    image:
      "https://bachlien.vn/wp-content/uploads/2024/02/tra-shan-tuyet-co-thu-ta-xua-son-la-4.jpg",
  },
  {
    name: "Hồng Trà Shan Tuyết",
    image:
      "https://bachlien.vn/wp-content/uploads/2024/02/tra-shan-tuyet-co-thu-ta-xua-son-la-4.jpg",
  },
  {
    name: "Lục Trà Shan Tuyết",
    image:
      "https://bachlien.vn/wp-content/uploads/2024/02/tra-shan-tuyet-co-thu-ta-xua-son-la-4.jpg",
  },
];
export default function ProductViewed(){
  return (
    <Box>
        <LineCut nameLine={"Sản Phẩm Đã Xem"} fontSize={"1.5rem"} bg_nen={"/img/bg-buton.png"} colorNameLine={"#FFF"}/>
            
            <Grid container spacing={2}>
                     {products.map((item, i) => (
          <Grid key={i} size={{ xs: 6, sm: 4, md: 3 }}>
            <Box
              sx={{
                bgcolor: "#fff",
                border: "1px solid #eee",
                textAlign: "center",
                p: 1,
                "&:hover": { boxShadow: 3 },
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{ mt: 1, fontWeight: "bold", color: "#b71c1c" }}
              >
                {item.name}
              </Typography>
            </Box>
          </Grid>
        ))}
            </Grid>
        
    </Box>
  )
};
