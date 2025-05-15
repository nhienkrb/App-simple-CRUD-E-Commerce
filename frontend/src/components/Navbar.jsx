import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Container,
  Menu,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Avatar from "@mui/material/Avatar";
import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <AppBar
        position="static"
        color="transparent"
        sx={{ marginTop: "0px", width: "100%" }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography component="div">
                <Button
                  sx={{
                    padding: 0,
                    ":hover": { backgroundColor: "transparent" },
                  }}
                >
                  <Link to="/">
                    <img
                      width="70%"
                      src="https://tracothu.vn/wp-content/uploads/2019/08/logo-tra-co-vong-tron-100x100.png"
                    />
                  </Link>
                </Button>
              </Typography>

              <Stack direction="row" spacing={2} fontSize={10}>
                <Button color="inherit" sx={{ fontWeight: "bold" }}>
                  <Link
                    to="/"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </Button>
                <Button color="inherit" sx={{ fontWeight: "bold" }}>
                  <Link
                    to="/products"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Products
                  </Link>
                </Button>
                <Button color="inherit" sx={{ fontWeight: "bold" }}>
                  News
                </Button>
                <Button color="inherit" sx={{ fontWeight: "bold" }}>
                  Contract
                </Button>
              </Stack>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                component={"form"}
                position="relative"
                display="inline-block"
                sx={{ marginRight: "10px" }}
              >
                <TextField
                  id="outlined-search"
                  label="Search field"
                  type="search"
                  size="small"
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "10px", // dùng right thay vì left
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "gray",
                  }}
                >
                  <SearchIcon />
                </Box>
              </Box>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Avatar
                      sx={{ cursor: "pointer" }}
                      variant="contained"
                      {...bindTrigger(popupState)}
                      src="https://tracothu.vn/wp-content/uploads/2019/08/logo-tra-co-vong-tron-100x100.png"
                    ></Avatar>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>Profile</MenuItem>
                      <MenuItem onClick={popupState.close}>My account</MenuItem>
                      <MenuItem onClick={popupState.close}>Logout</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
