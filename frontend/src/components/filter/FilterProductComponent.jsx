import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const collectionFilter = {
  latest: "Mới Nhất",
  price_asc: "Giá cao đến thấp",
  price_desc: "Giá thấp đến cao",
};


export default function FilterProductComponent({ onFilterChange }) {
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    onFilterChange && onFilterChange(value); // gửi filter lên cha
  };

  return (
    <Box>
      <Grid
        container
        display={"flex"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid
          size={{ sx: 12, sm: 2, md: 2, lg: 2 }}
          display={"flex"}
          justifyContent="start"
          alignItems="center"
          marginLeft={2}
        >
          <Typography variant="h2" color="#8c181e" fontFamily={"UTM Seagull"}>
            Shop
          </Typography>
        </Grid>

        <Grid
          size={{ sx: 12, sm: 9, md: 9, lg: 9 }}
          display={"flex"}
          justifyContent="end"
        >
          <FormControl sx={{ m: 1, width: 250 }} size="small">
            <InputLabel id="demo-select-small-label">Lọc</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filter}
              label="Filter"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Object.entries(collectionFilter).map(([key, label]) => (
                <MenuItem value={key} key={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
