import { Box, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import LineCut from "../../components/LineCut";
import { ViewedContext } from "../../context/ViewedProduct";

export default function ProductViewed() {
  const { viewedItems } = useContext(ViewedContext);

  return (
    <Box>
      <LineCut
        nameLine={"Sản Phẩm Đã Xem"}
        fontSize={"1.5rem"}
        bg_nen={"/img/bg-buton.png"}
        colorNameLine={"#FFF"}
      />

      <Grid container spacing={2}>
        {viewedItems.length === 0 ? (
          <Typography sx={{ m: 2, color: "#888" }}>
            Bạn chưa xem sản phẩm nào!
          </Typography>
        ) : (
          viewedItems.map((item, i) => (
            <Grid key={item.id}  size={{xs:6,sm:4,md:3}}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  border: "1px solid #eee",
                  textAlign: "center",
                  p: 1,
                  "&:hover": { boxShadow: 3 },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.product_name}
                  sx={{
                    width: "100%",
                    height: 240,
                    objectFit: "cover",
                  }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{ mt: 1, fontWeight: "bold", color: "#b71c1c" }}
                >
                  {item.product_name}
                </Typography>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}