import React, { useState, useEffect } from "react";
import { auth, db } from "../../config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import CartItems from "../../components/CartItems";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/Navbar/Navbar";
import "./Cart.css";
import { toast } from "react-toastify";
import EmptyCart from "../../assests/Empty-Cart-PNG-Image-Background.png";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const fetchCartProducts = async () => {
          const productsCollection = collection(db, "Cart" + user.uid);
          const productsSnapshot = await getDocs(productsCollection);
          const productsData = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCartProducts(productsData);
        };
        fetchCartProducts();
      } else {
        console.log("Not logged in");
      }
    });
  }, []);
  console.log(cartProducts);

  const cartProductIncrease = (cartProduct) => {
    const { id, qty, price } = cartProduct;
    const updatedProduct = {
      qty: qty + 1,
      TotalProductPrice: (qty + 1) * price,
    };

    auth.onAuthStateChanged((user) => {
      if (user) {
        const cartRef = doc(db, "Cart" + user.uid, id);
        updateDoc(cartRef, updatedProduct)
          .then(() => {
            console.log("Document updated");
            // update the state of the component with the new product data
            setCartProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === id ? { ...product, ...updatedProduct } : product
              )
            );
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } else {
        console.log("User is not logged in");
      }
    });
  };

  const cartProductDecrease = (cartProduct) => {
    const { id, qty, price } = cartProduct;
    const updatedProduct = {
      qty: qty > 1 ? qty - 1 : 1,
      TotalProductPrice: qty > 1 ? (qty - 1) * price : price,
    };

    auth.onAuthStateChanged((user) => {
      if (user) {
        const cartRef = doc(db, "Cart" + user.uid, id);
        updateDoc(cartRef, updatedProduct)
          .then(() => {
            console.log("Document updated");
            // update the state of the component with the new product data
            setCartProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === id ? { ...product, ...updatedProduct } : product
              )
            );
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } else {
        console.log("User is not logged in");
      }
    });
  };

  const cartProductDelete = (cartProduct) => {
    const { id } = cartProduct;

    auth.onAuthStateChanged((user) => {
      if (user) {
        const cartRef = doc(db, "Cart" + user.uid, id);
        deleteDoc(cartRef)
          .then(() => {
            console.log("Document deleted");
            toast.success("Document deleted");
            // update the state of the component by filtering out the deleted product
            setCartProducts((prevProducts) =>
              prevProducts.filter((product) => product.id !== id)
            );
          })
          .catch((error) => {
            console.error("Error deleting document: ", error);
            toast.error("Error deleting document");
          });
      } else {
        console.log("User is not logged in");
      }
    });
  };

  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  });

  const resName = cartProducts.map((cartProduct) => {
    return cartProduct.restaurant;
  });

  console.log(resName);

  const resImage = cartProducts.map((cartProduct) => {
    return cartProduct.resImgUrls;
  });

  console.log(resImage);

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalQty = qty.reduce(reducer, 0);
  console.log(totalQty);

  const amount = cartProducts.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });
  const reducer1 = (accumulator, currentValue) => accumulator + currentValue;
  const totalAmount = amount.reduce(reducer1, 0);
  console.log(totalAmount);

  // const handleToken = async (token) => {
  //   console.log(token);
  //   const cart = { name: "All products", totalAmount };
  //   const response = await axios.post("http://localhost:8080/checkout", {
  //     token,
  //     cart,
  //   });
  //   let { status } = response.data;
  //   if (status === "success") {
  //     const uid = auth.currentUser.uid;
  //     const cartDataRef = collection(db, "Cart" + uid);
  //     const cartDataSnapshot = await getDocs(cartDataRef);
  //     for (const snap of cartDataSnapshot.docs) {
  //       const docRef = doc(cartDataRef, snap.id);
  //       await deleteDoc(docRef);
  //     }
  //     navigate("/");
  //     toast.success("Order Successfully Placed");
  //   } else {
  //     toast.error("Something went wrong in checkout");
  //   }
  // };

  const triggerModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar totalQty={totalQty} />
      <div>
        {cartProducts.length > 0 && (
          <>
            <div className="container">
              {
                <CartItems
                  cartProducts={cartProducts}
                  cartProductIncrease={cartProductIncrease}
                  cartProductDecrease={cartProductDecrease}
                  cartProductDelete={cartProductDelete}
                />
              }
            </div>
            <div className="summary">
              <h5>Summary</h5>
              <h3>
                Total No of Products <span>{totalQty}</span>
              </h3>
              <h3>
                Total Amount to Pay <span>RS {totalAmount}</span>
              </h3>
              {/* <StripeCheckout
                stripeKey="pk_test_51MECNEB0bsUz1bGxNTeDt4QHCai4wZK4fqzosgWXEpiJdmPiEFSnZ960DA8qkM36xWCWmROqRFHn5MnMsRxeUvOI00KMN9NXQr"
                token={handleToken}
                billingAddress
                shippingAddress
                name="All products"
                amount={totalAmount * 100}
                product={cartProducts.name}
              ></StripeCheckout> */}
              <br />
              <button onClick={triggerModal}>Cash on delivery</button>
            </div>
          </>
        )}
      </div>

      {cartProducts.length < 1 && (
        <div className="empty-cart-page">
          <img src={EmptyCart} alt="Empty cart" className="empty-cart-img" />
          <h1 className="empty-cart-heading">Your cart is empty</h1>
          <p className="empty-cart-message">
            Add items to your cart to get started.
          </p>
          <Link to="/">
            <button className="empty-cart-btn">Browse products</button>
          </Link>
        </div>
      )}
      {showModal === true && (
        <Modal
          totalQty={totalQty}
          totalAmount={totalAmount}
          resName={resName}
          resImage={resImage}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default Cart;
