import React from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import LineCut from "../../components/LineCut";

// dữ liệu giả lập
const newsArticles = [
  {
    title: "Kỷ niệm 80 năm Quốc khánh nước Cộng hoà xã hội chủ nghĩa Việt Nam",
    snippet: "ĐỘC LẬP – TỰ DO – HẠNH PHÚC | 80 năm đã đi qua...",
    image: "https://bachlien.vn/wp-content/uploads/2025/06/tra-shan-tuyet-yen-bai.jpg",
  },
  {
    title: "Thông báo lịch nghỉ Tết Nguyên Đán Ất Tỵ 2025",
    snippet: "Kính gửi Quý khách hàng! Chào đón Tết Nguyên Đán...",
    image: "https://bachlien.vn/wp-content/uploads/2025/06/tra-shan-tuyet-yen-bai.jpg",
  },
  {
    title: "Chính sách kiểm hàng tại Bách Liên",
    snippet: "Định nghĩa Kiểm hàng là thực hiện các công việc kiểm tra...",
    image: "https://bachlien.vn/wp-content/uploads/2025/06/tra-shan-tuyet-yen-bai.jpg",
  },
];

const teaArticles = [
  {
    title: "Trà vàng Sùng Đô: Mùi nắng, hương núi và khí trà mạnh mẽ",
    snippet: "Ở độ cao 1.600 mét nơi mây trắng lững lờ...",
    image: "https://bachlien.vn/wp-content/uploads/2025/06/tra-shan-tuyet-yen-bai.jpg",
  },
  {
    title: "Trà đạo – Xu hướng sống chậm của giới trẻ thời 4.0",
    snippet: "Trong bối cảnh nhịp sống hối hả...",
    image: "https://bachlien.vn/wp-content/uploads/2025/06/tra-shan-tuyet-yen-bai.jpg",
  },
  {
    title: "Giải mã sự quý hiếm và giá trị cực cao của trà Phổ Nhĩ Trung Quốc",
    snippet: "Trà Phổ Nhĩ nổi tiếng với hương vị đặc trưng...",
    image: "https://bachlien.vn/wp-content/uploads/2025/06/tra-shan-tuyet-yen-bai.jpg",
  },
];

export default function NewsTeaSections() {
  return (
    <Box px={{ xs: 2, md: 4 }} py={3}>
      <Grid container spacing={4}>
        {/* Tin tức */}
        <Grid  size={{xs:12, md:6}}>
          <Box
            sx={{
              borderBottom: "3px solid #8c181e",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
             <LineCut nameLine={"Tin tức"} fontSize={"1.3rem"} bg_nen={"/img/bg-nen.png"} colorNameLine={"#FFF"}/>
          </Box>

          {newsArticles.map((art, i) => (
            <Box
              key={i}
              sx={{ display: "flex", mb: 2, gap: 2, alignItems: "flex-start" }}
            >
              <Box
                component="img"
                src={art.image}
                alt={art.title}
                sx={{ width: 120, height: 80, objectFit: "cover", borderRadius: 1 }}
              />
              <Box>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="#8c181e"
                >
                  {art.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {art.snippet}
                </Typography>
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Tinh hoa Trà Đạo */}
        <Grid size={{xs:12, md:6}}>
          <Box
            sx={{
              borderBottom: "3px solid #8c181e",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <LineCut nameLine={"Tinh hoa Trà Đạo"} fontSize={"1.3rem"} bg_nen={"/img/bg-nen.png"} colorNameLine={"#FFF"}/>
          </Box>

          {teaArticles.map((art, i) => (
            <Box
              key={i}
              sx={{ display: "flex", mb: 2, gap: 2, alignItems: "flex-start" }}
            >
              <Box
                component="img"
                src={art.image}
                alt={art.title}
                sx={{ width: 120, height: 80, objectFit: "cover", borderRadius: 1 }}
              />
              <Box>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="#8c181e"
                >
                  {art.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {art.snippet}
                </Typography>
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
