import { Box, Button, Grid, Link, Typography } from "@mui/material"
import React from "react"
import EntryDivider from "../EntryDivider"
import { Link as RouterLink } from "react-router-dom"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function PostsNews(){
  return (
   <Grid
          component={"div"}
          size={{ sx: 12, sm: 12, md: 9, lg: 9, xl: 9 }}
          sx={{ borderRight: "1px solid rgba(0,0,0,.1)" }}
        >
          <Box>
            <Box component={"div"} sx={{ textAlign: "center", mb: 2 }}>
              <Typography
                component={RouterLink}
                to={"/home"}
                fontWeight={700}
                variant="h2"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                color="primary"
              >
                Đây là phần tin tức nơi bạn có thể tìm thấy
              </Typography>
            </Box>

            <EntryDivider margin={"auto"} width={"50px"} />

            <Box m={2}>
              <Box
                p={1}
                component={"img"}
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="News"
                sx={{
                  width: "100%",
                  maxWidth: 750,
                  height: "auto",
                  display: "block",
                  margin: "auto",
                }}
              />
              <Typography
                p={2}
                variant="body1"
                sx={{
                  textAlign: "justify",
                  mt: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                }}
              >
               Trải dải qua hai huyện Vị Xuyên và Hoàng Su Phì, có một ngọn núi cheo leo hiểm trở nằm ở phía Tây của tỉnh Hà Giang với độ cao 2.427m so với mực nước biển – núi Tây Côn Lĩnh. Nơi đây không chỉ được biết đến với tên gọi “nóc nhà của Đông Bắc”, hay những cung đường khó chinh phục mà Tây Côn Lĩnh còn được người ta nhớ tới bởi một loại trà đặc sản, làm nức lòng vùng đất Hà Giang với tên gọi trà Shan Tuyết Tây Côn Lĩnh được ví như “Vua” của các loại trà.
              </Typography>

              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  sx={{
                    fontWeight: "600",
                    border: "2px solid #8c181e",
                    color: "#8c181e",
                    "&:hover": {
                      backgroundColor: "#8c181e",
                      color: "#FFF",
                      border: "1px solid #8c181e",
                      fontWeight: "600",
                    },
                  }}
                >
                  <Link
                    component={RouterLink}
                    to="/news"
                    underline="none"
                    color="#8c181e"
                    sx={{"&:hover": {
                      color: "#FFF",
                    },}}
                  >
                    Read More
                  </Link>
                  <ArrowForwardIcon sx={{ ml: 1 }} />
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
  )
};
