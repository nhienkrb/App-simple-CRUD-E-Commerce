import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Link,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import DrawerNavbar from "./DrawerNavbar";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
const PAGES = [
  { label: "Trang Chủ", path: "/trang-chu" },
  { label: "Sản Phẩm", path: "/san-pham" },
  { label: "Tin Tức", path: "/tin-tuc" },
  { label: "Liên Hệ", path: "/lien-he" },
];

export default function Navbar() {
  const [activeNavLinkStyle, setActiveNavLinkStyle] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { countCartItems } = useCart();
  const { logout, isAuthenticated,token } = useAuth();
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/login");
  };

    const handleLogin = () => {
    handleClose();
    navigate("/login");
  };
  return (
    <AppBar
      sx={{ backgroundColor: "#7a9c59", position: "static" }}
      elevation={2}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar>
          {isMatch ? (
            <> 
            
               <Link
                component={RouterLink}
                color="white"
                to="/trang-chu"
                sx={{ fontSize: "2em" }}
                underline="none"
              >
                Tea-Plus
              </Link>
<DrawerNavbar page={PAGES} />
               {isAuthenticated(token) ? (
                  <Tooltip title="Tài khoản">
                    <IconButton  size="small" sx={{ p: 0 }}>
                      <Avatar
                        alt="User Avatar"
                        src="https://phanmemmkt.vn/wp-content/uploads/2024/09/avt-Facebook-hai-huoc-2.jpg"
                        sx={{ width: 40, height: 40 }}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button variant="body1" sx={{ color: "white",borderColor:"white", borderWidth: "1px",borderStyle: "solid" }} onClick={handleLogin}>
                    Đăng nhập
                  </Button>
                )}

            </>
          ) : (
            <>
              <Link
                component={RouterLink}
                color="white"
                to="/trang-chu"
                sx={{ fontSize: "2em" }}
                underline="none"
              >
                Tea-Plus
              </Link>
              <Tabs
                onChange={(e, value) => setActiveNavLinkStyle(value)}
                textColor="inherit"
                value={activeNavLinkStyle}
                indicatorColor="secondary"
                sx={{ marginLeft: "20px" }}
              >
                {PAGES.map((page, index) => (
                  <Tab
                    key={index}
                    label={page.label}
                    component={RouterLink}
                    to={page.path}
                  />
                ))}
              </Tabs>

              <Box
                sx={{
                  marginLeft: "auto",
                  flexGrow: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* Giỏ hàng */}
                <IconButton
                  sx={{
                    color: "white",
                    marginRight: 5,
                    borderRadius: "3px",
                    "&:hover": {
                      border: "1.5px solid #fff",
                      borderRadius: "3px",
                      backgroundColor: "transparent",
                    },
                  }}
                  component={RouterLink}
                  to="/gio-hang"
                >
                  <ShoppingCartIcon />
                  <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    {typeof countCartItems === "function"
                      ? countCartItems()
                      : 0}
                  </Typography>
                </IconButton>

                {/* Hiển thị Avatar nếu đã đăng nhập */}
                {isAuthenticated(token) ? (
                  <Tooltip title="Tài khoản">
                    <IconButton onClick={handleOpen} size="small" sx={{ p: 0 }}>
                      <Avatar
                        alt="User Avatar"
                        src="https://phanmemmkt.vn/wp-content/uploads/2024/09/avt-Facebook-hai-huoc-2.jpg"
                        sx={{ width: 40, height: 40 }}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button variant="body1" sx={{ color: "white",borderColor:"white", borderWidth: "1px",borderStyle: "solid" }} onClick={handleLogin}>
                    Đăng nhập
                  </Button>
                )}
                {/* Avatar có dropdown */}

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 3,
                    sx: { mt: 1.5, borderRadius: 2, minWidth: 160 },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => navigate("/profile")}>
                    Hồ sơ
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
