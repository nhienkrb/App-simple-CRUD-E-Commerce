import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button } from "@mui/material";
import ProductCreateDialog from "../../components/adminComponent/ModalCreateProduct";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "product_name", label: "Tên sản phẩm", minWidth: 170 },
  {
    id: "price",
    label: "Giá",
    minWidth: 100,
    align: "right",
    format: (value) =>
      value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
  },
  { id: "quantity", label: "Số lượng", minWidth: 80, align: "right" },
  { id: "tag_name", label: "Loại trà", minWidth: 100 },
  { id: "image", label: "Ảnh", minWidth: 120, align: "center" },
];
const API_URL = `${import.meta.env.VITE_API_URL}/products` || "https://laptrinhwebtea.click/api/v1/products";
export default function ProductAdmin() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Nếu API trả về { data: [...] }
        setRows(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box> 
        <Box flex={1} display="flex" justifyContent="end" mb={2}>
           <ProductCreateDialog />
        </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Đang tải dữ liệu...
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "image") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <img
                                src={value}
                                alt={row.product_name}
                                style={{
                                  width: 60,
                                  height: 60,
                                  objectFit: "cover",
                                }}
                              />
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
