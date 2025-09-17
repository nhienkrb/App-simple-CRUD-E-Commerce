import { Box, Container, Grid, Typography } from "@mui/material";
import LineCut from "../../components/LineCut";

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

export default function GiftSection() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Tiêu đề */}
      <LineCut nameLine="Quà tặng" fontSize={"1.5rem"} />
      {/* Grid sản phẩm */}
      <Box marginTop={3} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <LineCut
          nameLine={"Cá Nhân"}
          fontSize={"1.3rem"}
          bg_nen={"/img/bg-nen.png"}
          colorNameLine={"#FFF"}
        />
        <LineCut
          nameLine={"Doanh Nghiệp"}
          fontSize={"1.3rem"}
          bg_nen={"/img/bg-nen.png"}
          colorNameLine={"#FFF"}
        />
      </Box>
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
    </Container>
  );
}
