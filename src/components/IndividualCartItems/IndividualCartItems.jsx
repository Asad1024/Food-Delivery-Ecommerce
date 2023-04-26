import React from "react";
import "./IndividualCartItems.css";
import { AiFillDelete } from "react-icons/ai";

const IndividualCartItems = ({
  cartProduct,
  cartProductIncrease,
  cartProductDecrease,
  cartProductDelete,
}) => {
  const handleIncrease = () => {
    cartProductIncrease(cartProduct);
  };
  const handleDecrease = () => {
    cartProductDecrease(cartProduct);
  };
  const handleDelete = () => {
    cartProductDelete(cartProduct);
  };
  return (
    <div class="cart-product">
      <div class="cart-product__image">
        <img src={cartProduct.imgUrls} alt={cartProduct.name} />
      </div>
      <div class="cart-product__details">
        <h3 class="cart-product__name">{cartProduct.name}</h3>
        <p class="cart-product__description">{cartProduct.description}</p>
        <span class="cart-product__price">RS {cartProduct.price}</span>
      </div>
      <div class="cart-product__quantity">
        <div class="cart-product__qty-control" onClick={handleDecrease}>
          -
        </div>
        <span class="cart-product__qty">{cartProduct.qty}</span>
        <div class="cart-product__qty-control" onClick={handleIncrease}>
          +
        </div>
      </div>
      <div class="cart-product__total-price">
        <span class="cart-product__total-price-text">Total:</span>
        <span class="cart-product__total-price-value">
          RS {cartProduct.TotalProductPrice}
        </span>
      </div>
      <div class="cart-product__delete" onClick={handleDelete}>
        <AiFillDelete />
      </div>
      <div className="restaurant-info">
        <img src={cartProduct.resImgUrls} alt="" />
        <div className="restaurant-name">{cartProduct.restaurant}</div>
      </div>
    </div>
  );
};

export default IndividualCartItems;
