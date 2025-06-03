import React, { use, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Button,
  Link,
  Box,
  IconButton,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Avatar from "@mui/material/Avatar";
import DrawerNavbar from "./DrawerNavbar";
import { useCart } from "../context/CartContext";
const PAGES = [
  { label: "Home", path: "/home" },
  { label: "Product", path: "/products" },
  { label: "News", path: "/news" },
  { label: "Contact", path: "/contact" },
];
export default function Navbar() {
  const [activeNavLinkStyle, setActiveNavLinkStyle] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { countCartItems } = useCart();
  return (
    <div>
      <AppBar
        sx={{ backgroundColor: "#7a9c59", position: "static" }}
        elevation={2}
      >
        <Container maxWidth="xl" disableGutters>
          <Toolbar>
            {isMatch ? (
              <>
                <Typography>Tea-Plus</Typography>
                <DrawerNavbar page={PAGES} />
              </>
            ) : (
              <>
                <Link
                  component={RouterLink}
                  color="white"
                  to="/home"
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
                    to="/cart"
                  >
                    <ShoppingCartIcon />
                    <Typography variant="body1" sx={{ marginLeft: 1 }}>
                      {typeof countCartItems === "function"
                        ? countCartItems()
                        : 0}
                    </Typography>


                  </IconButton>
                  <Avatar
                    alt="avt-user"
                    src="https://phanmemmkt.vn/wp-content/uploads/2024/09/avt-Facebook-hai-huoc-2.jpg"
                  />
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
