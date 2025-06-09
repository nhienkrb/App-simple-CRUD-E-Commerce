import { Box, Typography } from "@mui/material"
import React from "react"

export default function LineCut({nameLine, fontSize = "h3"}) {
  return (
     <Box display="flex" alignItems="center" mb={2}>
        <Box flex={1} height="1px" bgcolor="gray" />
        <Typography variant={fontSize} fontWeight="bold" sx={{ mx: 2 }}>
          {nameLine}
        </Typography>
        <Box flex={1} height="1px" bgcolor="gray" />
      </Box>
  )
};
