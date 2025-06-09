import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function InfortableProduct({ inforProduct }) {
  if (!inforProduct) {
    return <div>Không có thông tin sản phẩm</div>;
  }

  // Tạo mảng dữ liệu từ inforProduct
  const rows = [
    { label: "Thương hiệu", value: inforProduct.brand || "Không có thông tin" },
    { label: "Xuất xứ", value: inforProduct.origin || "Không có thông tin" },
    {
      label: "Phẩm trà",
      value: inforProduct.TeaQuality || "Không có thông tin",
    },
    {
      label: "Trọng lượng",
      value: inforProduct.weight || "Không có thông tin",
    },
    {
      label: "HSD",
      value: inforProduct.expiration_date || "Không có thông tin",
    },
  ];
  return (
    <TableContainer
      sx={{
        border: "none",
        width: { xs: "100%", sm: "100%", md: "100%" },
        overflow: "hidden",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.label}>
              <TableCell
                sx={{  background: index % 2 === 0 ? "#e6e6e6" : "#fff" }}
                component="th"
                scope="row"
                width={"30%"}
              >
                {row.label}
              </TableCell>
              <TableCell
                sx={{background: index % 2 === 0 ? "#e6e6e6" : "#fff" }}
                align="left"
              >
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
