import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import useFetchList from "../hooksCustom/useFetchList";
import useQuery from "../hooksCustom/useQuery";

const API_URL = "http://localhost:8000/api/v1/products";
export default function Products() {
    const [query, updateQuery, resetQuery] = useQuery(
    {
      page: 1,
      limit: 10,
      sort: "title",
    }
  );
  const products = useFetchList(API_URL, { method: "GET" });

  return (
    <div>
      <Container
        maxWidth="xl"
        fixed
        sx={{ justifyContent: "center", marginTop: "2rem" }}
      >
        <Grid container spacing={2}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    </div>
  );
}
