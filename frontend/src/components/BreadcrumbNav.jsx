import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react"
import { Link as RouterLink, useLocation } from "react-router-dom";
export default function BreadcrumbNav(){
      const location = useLocation(); // hook từ react-router để lấy URL
  const pathParts = location.pathname.split("/").filter((part) => part !== "");

  // Tạo đường dẫn tích lũy như: /products, /products/shoes, ...
  const createPath = (index) => "/" + pathParts.slice(0, index + 1).join("/");

  return (
     <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>

        {pathParts.map((part, index) => {
          const to = createPath(index);
          const isLast = index === pathParts.length - 1;
          const label = part.charAt(0).toUpperCase() + part.slice(1);

          return isLast ? (
            <Typography key={to} color="text.primary">
              {label}
            </Typography>
          ) : (
            <Link
              key={to}
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={to}
            >
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
  )
};

