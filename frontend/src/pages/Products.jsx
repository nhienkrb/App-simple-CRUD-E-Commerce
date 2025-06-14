import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import useFetchList from "../hooksCustom/useFetchList";
import useQuery from "../hooksCustom/useQuery";
import FilterProductComponent from "../components/filter/FilterProductComponent";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { useEffect, useState } from "react";
import ProductSidebar from "../components/filter/ProductSidebar";

const API_URL = import.meta.env.VITE_API_URL + "/products";

function useFetchLists(url, options = {}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;

    fetch(url, options)
      .then((res) => res.json())
      .then((resData) => {
        // ✅ Lấy đúng mảng sản phẩm
        const products = resData?.data?.data ?? [];
        setData(products);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setData([]); // fallback nếu lỗi
      });
  }, [url]);

  return data;
}



export default function Products() {
  // const products = useFetchList(API_URL, { method: "GET" });

  const [filter, setFilter] = useState("");

  const  handleFilterChange =  (value) => {
    setFilter(value);
  };
  const queryString = filter ? `?page=1&limit=20&sort=${filter}` : "";
  const products = useFetchLists(`${API_URL}/filter-products${queryString}`, {
    method: "GET",
  });
  return (
    <Container
      maxWidth="xl"
      fixed
      sx={{ justifyContent: "center", marginTop: "2rem" }}
    >
      {/* START <BreadcrumbNav /> */}
      <Box sx={{ marginBottom: "1rem" }}>
        <BreadcrumbNav />
      </Box>
        {/* END <BreadcrumbNav /> */}
      <Grid container>

        <Grid
          size={{ sm: 3 }}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          <ProductSidebar/>
        </Grid>

        <Grid container size={{ sm: 9 }}>
          {/* START Filter Product */}
          <Grid size={{ sm: 12 }}>
            <FilterProductComponent onFilterChange = {handleFilterChange} />
          </Grid>
          {/* END Filter Product */}

          {/* START Collection Product */}
          <Grid container size={{ sm: 12 }}>
            {products.map((product) => (
              <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <ProductCard key={product.id} product={product} />
              </Grid>
            ))}
          </Grid>
           {/* END Collection Product */}
        </Grid>
      </Grid>
    </Container>
  );
}
