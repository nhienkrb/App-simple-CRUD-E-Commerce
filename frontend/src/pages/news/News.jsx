import {
  Container,
  Grid,
  Typography,
} from "@mui/material";

import BreadcrumbNav from "../../components/BreadcrumbNav";
import PostsLatest from "../../components/newsComonent/PostsLatest";
import PostsNews from "../../components/newsComonent/PostsNews";

export default function News() {

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
    
    <BreadcrumbNav />

      <Typography
        fontWeight={600}
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", mb: 4 }}
      >
        News Page
      </Typography>

      <Grid container spacing={1}>
          <PostsNews />
      <PostsLatest />
    
      </Grid>
    </Container>
  );
}
