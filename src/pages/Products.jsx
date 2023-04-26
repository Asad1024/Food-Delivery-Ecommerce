import React from "react";
import IndividualProducts from "../components/IndividualProducts/IndividualProducts";

const Products = ({ products, addtocart }) => {
  console.log(products);
  return products.map((individualProducts) => (
    <IndividualProducts
      key={individualProducts.ID}
      individualProducts={individualProducts}
      addtocart={addtocart}
    />
  ));
};

export default Products;
