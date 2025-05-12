import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Container maxWidth="xl" fixed sx={{ justifyContent: "center" }}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    </div>
  );
}
