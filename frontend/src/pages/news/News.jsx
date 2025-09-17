import { Container, Grid, Typography } from "@mui/material";

import BreadcrumbNav from "../../components/BreadcrumbNav";
import PostsLatest from "../../components/newsComonent/PostsLatest";
import PostsNews from "../../components/newsComonent/PostsNews";
import LineCut from "../../components/LineCut";

export default function News() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <BreadcrumbNav />

      <LineCut
        nameLine={"Tin Tức Đề Cập"}
        fontSize={"1.5rem"}
        bg_nen={"/img/bg-buton.png"}
        colorNameLine={"#FFF"}
      />

      <Grid container spacing={1}>
        <PostsNews />
        <PostsLatest />
      </Grid>
    </Container>
  );
}
