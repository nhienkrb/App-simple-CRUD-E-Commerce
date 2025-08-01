import React, { useEffect } from "react";
import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import Promotions from "./Promotions";
import SlideProduct from "./SlideProduct";
import ProductCatalog from "./ProductCatalog";
import RecommendProduct from "./RecommendProduct";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
export default function Home() {
  const { token } = useAuth();
  const { cartItems } = useCart();

  const shouldShowRecommend = token || (cartItems && cartItems.length > 0);
  return (
    <div>
      <HeroBanner />
      <ProductCatalog />
      {shouldShowRecommend && <RecommendProduct />}
      <ProductList />
      <Promotions />
      <SlideProduct />
    </div>
  );
}
