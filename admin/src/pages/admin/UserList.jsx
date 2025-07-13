import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useUsers from "../../hooksCustom/useUsers";

const columns = [
  { id: "name", label: "Tên", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "loyalty_points", label: "Điểm", minWidth: 100 },
  //  Thêm cột action
  { id: "actions", label: "Hành động", minWidth: 100, align: "center" },
];

export default function UserList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { users, loading, refetch } = useUsers();
  const [editingUser, setEditingUser] = React.useState(null); // dùng cho edit

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
            {users.map((user) => (
              <TableRow hover key={user.id}>
                {columns.map((column) => {
                  const value = user[column.id];

                  //  Render riêng cột action
                  if (column.id === "actions") {
                    return (
                      <TableCell key="actions" align="center">
                        <button onClick={() => onEdit(user)}>✏️</button>
                        <button onClick={() => onDelete(user.id)}>🗑️</button>
                        <button onClick={() => onView(user)}>🔍</button>
                      </TableCell>
                    );
                  }

                  //  Các cột dữ liệu thông thường
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {typeof value === "object" && value !== null
                        ? (value.points_earned ?? "—") // ✅ Hiển thị riêng field
                        : (value ?? "—")}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
