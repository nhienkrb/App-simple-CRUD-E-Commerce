import { Box } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import useFetchList from "../../hooksCustom/useFetchList";
import Slider from "react-slick";

export default function ProductRecommend() {
  const API_URL = import.meta.env.VITE_API_URL + "/products";
  const products = useFetchList(API_URL, { method: "GET" });
  if (!products || products.length === 0) {
    return <Box>No recommended products available.</Box>;
  }

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 6000,
    cssEase: "linear",
    dots:false,
    arrows:false
  };

  return (
    <div className="slider-container" >
      <Slider {...settings} >
        {products.map((product) => (
          <div key={product.id} className="slider-item">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
