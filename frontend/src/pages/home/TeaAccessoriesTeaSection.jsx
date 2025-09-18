import React, { useEffect, useState } from "react";
import { Box, Container, Grid, CircularProgress } from "@mui/material";
import LineCut from "../../components/LineCut";
import Slider from "react-slick";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function TeaAccessoriesSection() {
  const API_URL =  import.meta.env.VITE_API_URL + "/products/category/phu-kien-tra?isProduct=true";
    

  // Chỉ lưu mảng products, không cần state kết hợp
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Không thể lấy dữ liệu");
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          // json.data.products là mảng cần dùng
          setProducts(json.data.products || []);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [API_URL]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ color: "red", textAlign: "center", py: 4 }}>Lỗi: {error}</Box>
    );
  }

  if (!products.length) {
    return (
      <Box sx={{ color: "#8c181e", textAlign: "center", py: 4 }}>
        Không có sản phẩm nào
      </Box>
    );
  }

  const sliderSettings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 6000,
    cssEase: "linear",
    dots: false,
    arrows: false,
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <LineCut
        nameLine="PHỤ KIỆN TRÀ"
        fontSize="1.3rem"
        bg_nen="/img/bg-nen.png"
        colorNameLine="#FFF"
      />

      <Grid container spacing={2}>
        <Grid
          size={{ md: 4 }}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <Box component="img" src="/img/tu-tra-4.png" width="100%" />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
          <Box className="slider-container">
            <Slider {...sliderSettings}>
              {products.map((prod) => (
                <Box key={prod.id} className="slider-item" px={1}>
                  {/* Truyền đúng prop "product" vào ProductCard */}
                  <ProductCard product={prod} />
                </Box>
              ))}
            </Slider>
          </Box>
             <Box sx={{textAlign:"center" }} >
            <Link to={"/san-pham/phu-kien-tra"} style={{color:"#8c181e", textDecoration:"none", textTransform:"capitalize", fontWeight:"bold"}}>
              Xem Tất cả sản phẩm  <ArrowForwardIosIcon fontSize="small"   />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
