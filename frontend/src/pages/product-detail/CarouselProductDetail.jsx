import React from "react";
import Slider from "react-slick";

export default function CarouselProductDetail({ images }) {
  // Nếu không truyền images thì dùng mặc định 4 ảnh mẫu
  const defaultImages = [
    "https://bachlien.vn/wp-content/uploads/2023/07/tra-chinh-son-tieu-chung-1.jpg",
    "https://bachlien.vn/wp-content/uploads/2023/07/tra-chinh-son-tieu-chung-2.jpg",
    "https://bachlien.vn/wp-content/uploads/2023/07/tra-chinh-son-tieu-chung-3.jpg",
    "https://bachlien.vn/wp-content/uploads/2023/07/tra-chinh-son-tieu-chung-4.jpg",
  ];
  const imgs = images && images.length > 0 ? images : defaultImages;

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={imgs[i]}
            alt={`thumb-${i + 1}`}
            style={{
              width: 50,
              height: 50,
              objectFit: "cover", // Sửa fill thành cover
              borderRadius: 4,
              border: "1px solid #eee",
              background: "#fff",
            }}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {imgs.map((img, idx) => (
          <div key={idx}>
            <img
              src={img}
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
