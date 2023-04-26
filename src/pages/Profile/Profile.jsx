import React, { useState, useEffect } from "react";
import { auth, db } from "../../config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import EmptyCart from "../../assests/Empty-Cart-PNG-Image-Background.png";
import { Link } from "react-router-dom";
import "./profile.css";
import { AiFillDelete } from "react-icons/ai";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        setUserEmail(user.email);
      } else {
        console.log("SIgned out");
      }
    });
  }, []);
  const [profileProducts, setProfileProducts] = useState([]);
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
          setProfileProducts(productsData);
        };
        fetchCartProducts();
      } else {
        console.log("Not logged in");
      }
    });
  }, []);
  console.log(profileProducts);

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
            setProfileProducts((prevProducts) =>
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

  const qty = profileProducts.map((cartProduct) => {
    return cartProduct.qty;
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalQty = qty.reduce(reducer, 0);
  console.log(totalQty);

  const amount = profileProducts.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });
  const reducer1 = (accumulator, currentValue) => accumulator + currentValue;
  const totalAmount = amount.reduce(reducer1, 0);
  console.log(totalAmount);

  console.log(profileProducts.name);

  return (
    <>
      <Navbar totalQty={totalQty} />
      <div class="profile-container">
        <div class="user-container">
          <div class="user-details">
            <h2>User Details</h2>
            <p>
              <span>Name:</span> {userName}
            </p>
            <p>
              <span>Email:</span> {userEmail}
            </p>
          </div>
        </div>

        <div class="orders-container">
          <h1>Orders</h1>

          {profileProducts.length > 0 ? (
            <div class="cards-container">
              {profileProducts.map((product) => (
                <div class="card" key={product.id}>
                  <div class="card-image">
                    <img src={product.imgUrls} alt="" />
                  </div>
                  <div class="card-details">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <span>$ {product.price}</span>
                    <button
                      class="delete-btn"
                      onClick={() => cartProductDelete(product)}
                    >
                      <AiFillDelete />
                    </button>
                    <Link to="/cart">
                      <button class="order-btn">Order Now</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div class="empty-orders">
              <img
                src={EmptyCart}
                alt="Empty cart"
                class="empty-orders-image"
              />
              <h1 class="empty-orders-heading">No orders yet</h1>
              <p class="empty-orders-message">
                Add items to your cart to get started.
              </p>
              <Link to="/" class="empty-cart-btn">
                Browse products
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
