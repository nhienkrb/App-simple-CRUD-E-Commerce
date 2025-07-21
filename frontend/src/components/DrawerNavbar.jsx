import React, { useState } from "react";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from "react-router-dom";
export default function DrawerNavbar({ page }) {

    const [openDrawer, setOpenDrawer] = useState(false);
  return (
      <>
        <Drawer open={openDrawer} anchor="left" onClose={()=>setOpenDrawer(false)} >
          <List>
            {page.map((item, index) => (
              <ListItemButton key={index}  component={RouterLink} to={item.path} onClick={()=>setOpenDrawer(false)}>
                <ListItemIcon >
                  <ListItemText  >{item.label}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <IconButton onClick={()=> {setOpenDrawer(!openDrawer)}} sx={{color:"white", marginRight: "auto"}}>
            <MenuIcon></MenuIcon>
        </IconButton>
      </>
  );
}
