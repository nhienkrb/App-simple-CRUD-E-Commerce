import React from "react";
import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import Promotions from "./Promotions";
import SlideProduct from "./SlideProduct";
import ProductCatalog from "./ProductCatalog";
export default function Home() {
  return (
    <div>
      <HeroBanner />
      <ProductCatalog />
      <ProductList />
      <Promotions />
      <SlideProduct />
    </div>
  );
}
