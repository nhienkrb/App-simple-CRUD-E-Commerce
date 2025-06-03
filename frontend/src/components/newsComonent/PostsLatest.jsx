import { Box, Button, Grid, Link, Typography } from "@mui/material"
import React from "react"
import EntryDivider from "../EntryDivider"
import { Link as RouterLink } from "react-router-dom"
export default function PostsLatest(){
  return (
           <Grid size={{ sx: 12, sm: 12, md: 3, lg: 3, xl: 3 }}>
          <Box sx={{ p: 2 }}>
            <Typography fontSize={15} fontWeight={"bold"}>
              ABOUT
            </Typography>
            <Typography mt={1}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt
            </Typography>
          </Box>

          <Box
            sx={{
              textDecoration: "none",
              p: 2,
              borderBottom: "1px solid rgba(0,0,0,.1)",
              cursor: "pointer",
            }}
          >
            <Typography fontSize={15} fontWeight={"bold"}>
              Latest Posts
            </Typography>

            {/* Latest Posts */}
         
            <EntryDivider  width={"40px"} style={{marginTop:"20px"}}/>
            <Box mt={2} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box
                width={"50px"}
                height={"50px"}
                bgcolor={"#fff"}
                sx={{
                  textAlign: "center",
                  border: "2px solid #7a9c59",
                  color: "#7a9c59",
                  fontWeight: "600",
                }}
              >
                02 th6
              </Box>
              <Box className="content" sx={{ flex: 1 }}>
                Lợi ích uống Trà Shan Tuyết và những điều cần lưu ý
              </Box>
            </Box>
          </Box>

          <Box sx={{ p: 2, borderBottom: "1px solid rgba(0,0,0,.1)" }}>
            <Box mt={2} sx={{ display: "flex", gap: 2 }}>
              <Box
                width={"50px"}
                height={"50px"}
                bgcolor={"#fff"}
                sx={{
                  textAlign: "center",
                  border: "2px solid #7a9c59",
                  color: "#7a9c59",
                  fontWeight: "600",
                }}
              >
                02 th6
              </Box>

              <Box className="content" sx={{ flex: 1 }}>
                Lợi ích uống Trà Shan Tuyết và những điều cần lưu ý
              </Box>
            </Box>
          </Box>

          <Box sx={{ p: 2, borderBottom: "1px solid rgba(0,0,0,.1)" }}>
            <Box mt={2} sx={{ display: "flex", gap: 2 }}>
              <Box
                width={"50px"}
                height={"50px"}
                bgcolor={"#fff"}
                sx={{
                  textAlign: "center",
                  border: "2px solid #7a9c59",
                  color: "#7a9c59",
                  fontWeight: "600",
                }}
              >
                02 th6
              </Box>

              <Box className="content" sx={{ flex: 1 }}>
                Lợi ích uống Trà Shan Tuyết và những điều cần lưu ý
              </Box>
            </Box>
          </Box>
           {/* end Latest Posts */}

        </Grid>
  )
};
