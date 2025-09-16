import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function PromoBanner() {
  const items = [
    {
      icon: "/img/menu-cs-1.png",
      title: "Giao hàng siêu tốc",
      subtitle: "Giao hàng trong 24h",
    },
    {
      icon: "/img/menu-cs-2.png",
      title: "Hỗ trợ khách hàng",
      subtitle: "Chuyên nghiệp và 24/7",
    },
    {
      icon: "/img/menu-cs-3.png",
      title: "Thanh toán",
      subtitle: "Thanh toán khi nhận hàng",
    },
    {
      icon: "/img/menu-cs-4.png",
      title: "Sản phẩm chính hãng",
      subtitle: "Hoàn tiền 200% nếu hàng giả",
    },
  ];

  return (
    <Container maxWidth="xl">
      <Grid container sx={{ backgroundColor: "#FFFFFF", boxShadow:"10" }}>
        {items.map((item, idx) => (
          <Grid
            size={{ xs: 6, sm: 6, md: 3 }}
            key={idx}
            sx={{
              textAlign: "start",
              py: 1,
              border: "0.5px solid #8c181e", // viền chia khu vực
            }}
          >
            <Box 
              display="flex"
              alignItems="center"
              justifyContent="center"
              m={1}
              
            >
              <Box
                component="img"
                src={item.icon}
                alt={item.title}
                sx={{ width: 40, height: 40, mr: 2}}
              />
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#8c181e"
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" color="#8c181e">
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
