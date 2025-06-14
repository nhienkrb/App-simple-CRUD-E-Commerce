import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState } from "react";

import { Link as RouteLink } from "react-router-dom";

export default function ProductSidebar() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [names, setNames] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(false);
  useEffect(() => {
    const fetchAllNameCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories/names`);
        const data = await response.json();
        setNames(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchAllNameCategories();
  }, []);
  return (
    <Box
      p={1}
      display="flex"
      flexDirection="column"
      sx={{ backgroundColor: "#A5C07B" }}
      color="white"
    >
      <Box border={1} p={1}>
        <Box borderBottom={1}>
          <Typography variant="h2" textAlign={"start"} p={1}>
            Danh Mục Sản Phẩm
          </Typography>
        </Box>

        {names.map((itemCategory, index) => (
          <Box marginTop={1} key={itemCategory.category_id}>
            <Accordion
              expanded={expandedIndex === index}
              onChange={() => {
                if (itemCategory.tag_name.length > 1) {
                  setExpandedIndex(expandedIndex === index ? false : index);
                }
              }}
              sx={{
                boxShadow: "none",
                backgroundColor: "#A5C07B",
                color: "white",
              }}
            >
              <AccordionSummary
                sx={{ margin: "0xp !important" }}
                expandIcon={
                  itemCategory.tag_name.length > 1 && <ArrowDropDownIcon />
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography
                  component={RouteLink}
                  to={`/category/${itemCategory.slug}`}
                  fontWeight={500}
                  variant="h4"
                  sx={{ textDecoration: "none", color:"white" }}
                >
                  {itemCategory.category_name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{display:"flex",flexDirection:"column"}}>
                {itemCategory.tag_name.map((tag_name,index) => (
                  <Typography key={index}
                   component={RouteLink}
                    to={`/category/${itemCategory.slug}/${tag_name}`}
                    variant="h5"
                    sx={{ fontWeight: "500", p:.5 ,textDecoration: "none", color:"white" }}
                  >
                    {tag_name}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}

      <Box sx={{width:"100%", marginTop:2}} component={"img"} src="https://bachlien.vn/wp-content/uploads/2023/02/vertical-shot-tea-pouring-from-kettle-white-cup-with-wooden-spoon-scaled.jpg"/>


      </Box>

    </Box>
  );
}
