import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
export default function SidebarCategories() {
  const categories = [
    "Trà Thái Nguyên",
    "Trà Trung Hoa",
    "Trà Phổ Nhĩ",
    "Phụ kiện trà",
    "Ấm trà",
    "Chén trà",
    "Trà thảo mộc",
  ];

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#8c181e",
        color: "white",
        width: { xs: "100%", sm: 280 },
        mx: "auto",
        borderRadius: 2,
        p: 2,
      }}
    >
      {/* Tiêu đề với icon */}
      <Box  p={1}>
        <Box display="flex" alignItems="center" mb={1}>
          <ReorderIcon sx={{ mr: 1 }} />
          <Typography variant="h3" fontWeight="bold" component="span">
            Danh mục sản phẩm
          </Typography>
        </Box>
        {/* Danh sách mục */}
        <List sx={{ pt: 0 }}>
          {categories.map((cat, idx) => (
            <ListItem key={idx} disablePadding sx={{border:"0.5px solid #C68C8E"}}>
              <ListItemButton sx={{ pl: 3, py: 0.5 }}>
                <ListItemText primary={cat} slotProps={{ fontSize: "1rem" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
