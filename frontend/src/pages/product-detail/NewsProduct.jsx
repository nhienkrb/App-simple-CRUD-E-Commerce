import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link as RouteLink } from "react-router-dom";
export default function NewsProduct() {
  return (
    <Box sx={{ border: "1.5px solid #ccc", borderRadius: 1 }}>
      <Typography
        p={0.8}
        variant="h2"
        textAlign="center"
        sx={{
          fontWeight: "bold",
          color: "primary.success",
          borderBottom: "1px solid #ccc",
        }}
      >
        News
      </Typography>
      {/*content title news */}
      <Box
        p={0.8}
        display="flex"
        gap={2}
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box
          component={"img"}
          sx={{  height: "auto"  ,width:{ xs: "100%", sm: "40%" } }}
          src="https://bachlien.vn/wp-content/uploads/2025/04/tra-buoi-mat-ong.jpeg"
          alt="Product"
        />

        <Box>
          <Typography
            component={RouteLink}
            sx={{
              fontFamily: "UTM Seagull",
              textDecoration: "none",
              color: "primary.black",
            }}
            variant="body2"
            lineHeight={1.3}
          >
            Khám phá những loại đồ uống có lợi cho sức khỏe vào mùa hè
          </Typography>
        </Box>
      </Box>
      {/*end content title news */}
      <Box
        p={0.8}
        display="flex"
        gap={2}
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box
          component={"img"}
          sx={{  height: "auto", width:{ xs: "100%", sm: "40%" } }}

          src="https://bachlien.vn/wp-content/uploads/2025/04/tra-buoi-mat-ong.jpeg"
          alt="Product"
        />
        <Box>
          <Typography
            component={RouteLink}
            sx={{
              fontFamily: "UTM Seagull",
              textDecoration: "none",
              color: "primary.black",
            }}
            variant="body2"
            lineHeight={1.3}
          >
            Khám phá những loại đồ uống có lợi cho sức khỏe vào mùa hè
          </Typography>
        </Box>
      </Box>

      <Box  alignItems={"center"} display="flex" justifyContent="center" mt={2} mb={2}>
        <Button 
          variant="outlined"
          size="large"
          sx={{
            borderColor: "rgb(206, 58, 58)",
            color: "rgb(206, 58, 58)",
            fontWeight: "bold",

            "&:hover": {
              color: "white",
              background: "#8c181e",
              borderColor: "#8c181e",
              fontWeight: "bold",
            },
            width: "95%",
          }}
        >
          Xem Tất Cả
        </Button>
      </Box>
    </Box>
  );
}
