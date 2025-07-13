import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

export default function FilterComponentAdmin({ status, onStatusChange }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      gap={2}
      mb={2}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
        Bộ lọc:
      </Typography>

      <FormControl size="small">
        <InputLabel id="status-select-label">Trạng thái</InputLabel>
        <Select
          labelId="status-select-label"
          value={status}
          label="Trạng thái"
          onChange={(e) => onStatusChange(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
