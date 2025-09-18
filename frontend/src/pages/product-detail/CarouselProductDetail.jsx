import React, { useEffect, useState } from "react";
import Slider from "react-slick";
const API_URL = import.meta.env.VITE_API_URL;

export default function CarouselProductDetail({ idProduct }) {
  // Nếu không truyền images thì dùng mặc định 4 ảnh mẫu
  const defaultImages = [
    "https://bachlien.vn/wp-content/uploads/2024/08/hong-tra-kim-tuan-my-2.jpg",
    "https://bachlien.vn/wp-content/uploads/2024/08/hong-tra-kim-tuan-my-5-300x300.jpg",
    "https://bachlien.vn/wp-content/uploads/2024/08/hong-tra-kim-tuan-my-6-300x300.jpg",
    "https://bachlien.vn/wp-content/uploads/2024/08/hong-tra-kim-tuan-my-3-300x300.jpg",
  ];
  // 2. State để chứa array các URL ảnh
  const [images, setImages] = useState([]);

  // 3. Fetch ảnh khi idProduct thay đổi
  useEffect(() => {
    if (!idProduct) return;
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `${API_URL}/order-product-images/${idProduct}`
        );
        if (!res.ok) throw new Error("Không lấy được hình ảnh");
        const { data } = await res.json();
        // Lấy mảng image_url, hoặc để trống nếu data không hợp lệ
        const urls =
          Array.isArray(data) && data.length
            ? data.map((item) => item.image_url)
            : [];
        setImages(urls);
      } catch (error) {
        console.error("CarouselProductDetail fetch error:", error);
        setImages([]); // fallback về defaultImages bên dưới
      }
    };

    fetchImages();
  }, [idProduct]);
  const imgs = images.length > 0 ? images : defaultImages;
  const settings = {
    customPaging: (i) => (
      <a>
        <img
          src={imgs[i]}
          alt={`thumb-${i + 1}`}
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: 4,
            border: "1px solid #eee",
            background: "#fff",
          }}
        />
      </a>
    ),
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {imgs.map((src, idx) => (
          <div key={idx}>
            <img
              src={src}
              alt={`product-${idx + 1}`}
              style={{
                width: "100%",
                maxHeight: 400,
                objectFit: "contain",
                background: "#fff",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
