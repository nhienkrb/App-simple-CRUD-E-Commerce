import { Box } from "@mui/material";
import React from "react";

export default function EntryDivider({ margin="", width }) {
  return (
    <Box
      component={"div"}
      bgcolor={"rgba(0,0,0,.1)"}
      sx={{ p: 0.2, m: 2, width: width, margin: margin, ...(margin&&{margin:margin}) }}
    ></Box>
  );
}
