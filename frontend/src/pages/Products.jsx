import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import FilterProductComponent from "../components/filter/FilterProductComponent";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { useEffect, useState } from "react";
import ProductSidebar from "../components/filter/ProductSidebar";
import { useParams } from "react-router-dom";
import ProductViewed from "./product/ProductViewed";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Products() {
  const { categorySlug } = useParams();
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState([]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  useEffect(() => {
    let queryString = `?page=1&limit=20`;
    if (filter) queryString += `&sort=${filter}`;
    if (categorySlug) queryString += `&category=${categorySlug}`;

    const url = `${BASE_URL}/products/filter-products${queryString}`;

    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        const list = resData?.data?.data ?? [];
        setProducts(list);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch sản phẩm:", err);
        setProducts([]);
      });
  }, [filter, categorySlug]);

  return (
    <Container maxWidth="xl" fixed sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <BreadcrumbNav />
      </Box>

      <Grid container spacing={2}>
        {/* SIDEBAR */}
        <Grid size={{xs:0, sm:3}}  sx={{ display: { xs: "none", sm: "block" } }}>
          <ProductSidebar />
        </Grid>

        {/* MAIN CONTENT */}
        <Grid size={{xs:12, sm:9}} >
          <FilterProductComponent onFilterChange={handleFilterChange} />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {products.map((product) => (
              <Grid size={{ xs: 6, sm: 4, md:3 }}  key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid size={{xs:12, sm:12,md:12}}>
          <ProductViewed />
        </Grid>
      </Grid>
    </Container>
  );
}
