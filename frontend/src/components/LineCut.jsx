import { Box, Typography } from "@mui/material";

export default function LineCut({ nameLine, fontSize, bg_nen,colorNameLine }) {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      {/* dòng đỏ trái */}
      <Box flex={1} height="1px" bgcolor="#8c181e" />

      {/* container ảnh + chữ */}
      <Box
        mx={2}
        sx={{
          position: "relative",
          width: 300, // điều chỉnh chiều rộng theo ảnh thật
          height: 47, // điều chỉnh chiều cao theo ảnh thật
          backgroundImage: `url(${bg_nen || "/img/bg-contact1.png"})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Typography
          fontWeight="bold"
          fontFamily={"UTM Seagull"}
          color= {`${colorNameLine??"#8c181e"}`}   // hoặc màu phù hợp với nền ảnh
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
            padding: "6px 20px",
            fontSize: fontSize,
          }}
        >
          {nameLine}
        </Typography>
      </Box>

      {/* dòng xám phải */}
      <Box flex={1} height="1px" bgcolor="#8c181e" />
    </Box>
  );
}
