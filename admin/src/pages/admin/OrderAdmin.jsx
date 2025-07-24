import React, { useState, useEffect } from "react";
import {
  Avatar,
  Chip,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const OrderRow = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.username}
        </TableCell>
        <TableCell>{row.orderCode}</TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt={row.username}
              src={row.imageUrl}
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Typography
              sx={{
                maxWidth: 200,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {row.username}
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="right">{row.orderDate}</TableCell>
        <TableCell align="right">
          <Chip
            label={row.status}
            color={
              row.status === "Pending"
                ? "warning"
                : row.status === "Completed"
                  ? "success"
                  : "default"
            }
          />
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="actions">
            {/* Action buttons can be added here */}

            {row.status === "Pending" ? <CheckBoxIcon /> : <></>}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 1 }}>
              <Typography variant="h6" gutterBottom>
                Order Details
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer ID</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={`${historyRow.date}-${index}`}>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            alt={historyRow.productName}
                            src={historyRow.productImage}
                            sx={{ width: 40, height: 40, mr: 1 }}
                          />
                          <Typography>{historyRow.productName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ${historyRow.price?.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        $
                        {(
                          (historyRow.amount || 0) * (historyRow.price || 0)
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

OrderRow.propTypes = {
  row: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    orderDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    orderCode: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        productImage: PropTypes.string,
        price: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const FilterComponent = ({ status, onStatusChange }) => {
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
};

FilterComponent.propTypes = {
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};
const API_URL = `${import.meta.env.VITE_API_URL}/orders/order-manager`;

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const formattedData = Array.isArray(data)
          ? data.map((order) => ({
              ...order,
              history: order.history || [],
              price: order.price || 0,
              status: order.status || "Pending",
            }))
          : [];

        setOrders(formattedData);
        setFilteredOrders(formattedData);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (statusFilter) {
      const filtered = orders.filter(
        (order) => order.status.toLowerCase() === statusFilter.toLowerCase()
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [statusFilter, orders]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">Error loading orders: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <FilterComponent
        status={statusFilter}
        onStatusChange={handleStatusChange}
      />

      <TableContainer component={Paper}>
        <Table aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Tên</TableCell>
              <TableCell>Mã Order</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell align="right">Ngày đặt </TableCell>
              <TableCell align="right">Trạng thái</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderRow key={order.orderCode} row={order} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No orders found matching your criteria
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderAdmin;
