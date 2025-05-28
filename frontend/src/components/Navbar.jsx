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
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DrawerNavbar from "./DrawerNavbar";
const PAGES = [
   { label: "Home", path: "/home" },
  { label: "Product", path: "/products" },
  { label: "Service", path: "/services" },
  { label: "Contact", path: "/contact" }
];
export default function Navbar() {
  const [activeNavLinkStyle, setActiveNavLinkStyle] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <AppBar sx={{ backgroundColor: "#7a9c59", position:"static" }} elevation={2}>
      <Container maxWidth="xl" disableGutters>
        <Toolbar>
          {isMatch ? (
            <>  
              <Typography>Tea-Plus</Typography>
              <DrawerNavbar page={PAGES}/>
            </>
          ) : (
            <>
             <Link component={RouterLink} color="white" to="/home" sx={{fontSize:"2em"}} underline="none">Tea-Plus</Link>
              <Tabs
                onChange={(e, value) => setActiveNavLinkStyle(value)}
                textColor="inherit"
                value={activeNavLinkStyle}
                indicatorColor="secondary"
                sx={{ marginLeft: "20px" }}
              >
                {PAGES.map((page, index) => (
                  <Tab key={index} label={page.label}  component={RouterLink} to={page.path}/>
                ))}
              </Tabs>

              <Avatar
                sx={{ marginLeft: "auto" }}
                alt="avt-user"
                src="https://phanmemmkt.vn/wp-content/uploads/2024/09/avt-Facebook-hai-huoc-2.jpg"
              />
            </>
          )}
        </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
