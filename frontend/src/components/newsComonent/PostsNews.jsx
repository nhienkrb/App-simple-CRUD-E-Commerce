import { Box, Button, Grid, Link, Typography } from "@mui/material"
import React from "react"
import EntryDivider from "../EntryDivider"
import { Link as RouterLink } from "react-router-dom"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function PostsNews(){
  return (
   <Grid
          component={"div"}
          size={{ sx: 12, sm: 12, md: 9, lg: 9, xl: 9 }}
          sx={{ borderRight: "1px solid rgba(0,0,0,.1)" }}
        >
          <Box>
            <Box component={"div"} sx={{ textAlign: "center", mb: 2 }}>
              <Typography
                fontSize={15}
                fontWeight={700}
                variant="h6"
                gutterBottom
              >
                News
              </Typography>
              <Typography
                component={RouterLink}
                to={"/home"}
                fontWeight={700}
                variant="h5"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                This is the news section where you can find
              </Typography>
            </Box>

            <EntryDivider margin={"auto"} width={"50px"} />

            <Box m={2}>
              <Box
                p={1}
                component={"img"}
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="News"
                sx={{
                  width: "100%",
                  maxWidth: 750,
                  height: "auto",
                  display: "block",
                  margin: "auto",
                }}
              />
              <Typography
                p={2}
                variant="body1"
                sx={{
                  textAlign: "justify",
                  mt: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>

              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  sx={{
                    fontWeight: "600",
                    border: "2px solid #7a9c59",
                    color: "#7a9c59",
                    "&:hover": {
                      backgroundColor: "#7a9c59",
                      color: "#fff",
                      border: "1px solid #7a9c59",
                      fontWeight: "600",
                    },
                  }}
                >
                  <Link
                    component={RouterLink}
                    to="/news"
                    underline="none"
                    color="inherit"
                  >
                    Read More
                  </Link>
                  <ArrowForwardIcon sx={{ ml: 1 }} />
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
  )
};
