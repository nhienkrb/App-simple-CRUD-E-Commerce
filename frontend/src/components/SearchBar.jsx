import { Box, InputBase } from "@mui/material";

export default function SearchBar() {
  return (
    <Box
      sx={{
        backgroundImage: `url("/img/bg-search2.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        display: "flex",
        alignItems: "center",
        width: "550px",  // chỉnh theo ảnh
        height: "40px",
        position: "relative",
      }}
    >
      {/* Input */}
      <InputBase
        placeholder="Từ khóa tìm kiếm..."
        sx={{
          flex: 1,
          px: 2,
          bgcolor: "transparent", // nền trong suốt để thấy ảnh
          height: "100%",
        }}
      />

      {/* Text “Tìm kiếm” nằm trên ô đỏ */}
      <Box
        sx={{
          position: "absolute",
          right: 15, // chỉnh cho vừa
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Tìm kiếm
      </Box>
    </Box>
  );
}
