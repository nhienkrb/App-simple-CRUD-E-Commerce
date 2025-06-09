import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import useFetchList from "../hooksCustom/useFetchList";
import useQuery from "../hooksCustom/useQuery";

const API_URL = import.meta.env.VITE_API_URL + "/products";
export default function Products() {
  const [query, updateQuery, resetQuery] = useQuery({
    page: 1,
    limit: 10,
    sort: "title",
  });
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
            <Grid  size={{ xs: 12, sm: 4, md:2.4, lg: 2 }}  key={product.id}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
