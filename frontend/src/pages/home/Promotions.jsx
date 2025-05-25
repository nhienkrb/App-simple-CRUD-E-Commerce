import React from "react"
import { Box, Typography } from "@mui/material"
export default function Promotions(){
  return (
 <Box
      sx={{
        width: '100%',
        maxWidth: '100vw',
        height: { xs: 200, sm: 300, md: 400 }, // Chiều cao responsive
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src="/bannerTea.png"
        alt="Promotion Banner"
        sx={{
          width: '100%',
          display: 'block',
        }}
      />
    </Box>
  );
}
