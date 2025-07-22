import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import useCategories from "../../hooksCustom/useCategories";

export default function ProductCatalog() {
  const categories = useCategories();
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Grid sx={{ xs: 6, sm: 4, md: 4 }} container spacing={8}>
        {categories
          .filter((cat) => cat.category_name.length < 18) // lọc tên ngắn
          .slice(0, 7) // lấy 6 cái đầu
          .map((cat, index) => (
            <Box key={index} >
              <Avatar
                src={cat.category_image}
                alt={cat.category_name}
                sx={{
                  width: 100,
                  height: 100,
                  margin: 1,
                  borderRadius: 50,
                  border: "1px solid #f2f2f2",
                  cursor: "pointer",
                  backgroundColor:"white",
                  "&:hover": {
                    transform: "scale(1.2)",
                    border: "2px solid #8c8c8c",
                  },
                }}
              />
              <Typography textAlign="center">{cat.category_name}</Typography>
            </Box>
          ))}
      </Grid>
    </Container>
  );
}
