import React from "react";
import IndividualCartItems from "./IndividualCartItems/IndividualCartItems";

const CartItems = ({
  cartProducts,
  cartProductIncrease,
  cartProductDecrease,
  cartProductDelete,
}) => {
  return cartProducts.map((cartProduct) => (
    <IndividualCartItems
      key={cartProduct.ID}
      cartProduct={cartProduct}
      cartProductIncrease={cartProductIncrease}
      cartProductDecrease={cartProductDecrease}
      cartProductDelete={cartProductDelete}
      ca
    />
  ));
};

export default CartItems;
