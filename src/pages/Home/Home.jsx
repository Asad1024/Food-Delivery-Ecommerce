import Navbar from "../../components/Navbar/Navbar";
import Products from "../Products";
import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../config";
import { auth } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import Spinner from "../../assests/Ball-1s-200px.svg";
import Almaida from "../../assests/Almaida.png";
import Muffins from "../../assests/Muffins.jpeg";
import Bryani from "../../assests/Bruani Hut.png";
import Khwaja from "../../assests/Khawaja.jpeg";
import Street from "../../assests/14the Stereet.png";
import Data from "../../assests/Data Sweets.png";

const Home = ({ props }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function GetUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUid();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsData = productsSnapshot.docs.map((doc) => doc.data());
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  console.log(setProducts);
  const [cartProducts, setCartProducts] = useState([]);
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
  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalQty = qty.reduce(reducer, 0);
  console.log(totalQty);

  const addtocart = async (product) => {
    if (uid !== null) {
      const Product = {
        ...product,
        qty: 1,
        TotalProductPrice: product.price,
      };
      const colRef = collection(db, "Cart" + uid);
      const Ref = await addDoc(colRef, Product);
      console.log("Document written with ID: ", Ref.id);
      toast.success("Add to Cart");
    } else {
      navigate("/sign-in");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar totalQty={totalQty} />

      <div class="banner">
        <img
          src="https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="banner-image"
        />
        <div class="banner-overlay"></div>
        <div class="banner-content">
          <h1 class="banner-title">Welcome to our Kitchen</h1>
          <p class="banner-description">Discover our latest dishes</p>
          <Link
            class="banner-button"
            onClick={() =>
              window.scrollTo({
                top: document.querySelector(".productItems").offsetTop,
                behavior: "smooth",
              })
            }
          >
            Order now
          </Link>
        </div>
      </div>
      <div>
        <h1 className="restaurent-images-title">Registered Restaurant</h1>
        <div class="restaurant-images">
          <Link to="/almaida" class="restaurant-image">
            <img src={Almaida} alt="" />
            <div class="overlay">
              <h2>Almaida</h2>
            </div>
          </Link>
          <Link to="/muffins" class="restaurant-image">
            <img src={Muffins} alt="" />
            <div class="overlay">
              <h2>Muffins</h2>
            </div>
          </Link>
          <Link to="/bryanihut" class="restaurant-image">
            <img src={Bryani} alt="" />
            <div class="overlay">
              <h2>Bryani Hut</h2>
            </div>
          </Link>
          <Link to="/khwajagn" class="restaurant-image">
            <img src={Khwaja} alt="" />
            <div class="overlay">
              <h2>Khwaja GN</h2>
            </div>
          </Link>
          <Link to="/14thstreet" class="restaurant-image">
            <img src={Street} alt="" />
            <div class="overlay">
              <h2>14th Street</h2>
            </div>
          </Link>
          <Link to="/datasweets" class="restaurant-image">
            <img src={Data} alt="" />
            <div class="overlay">
              <h2>Data Sweets</h2>
            </div>
          </Link>
        </div>
      </div>

      <div className="productItems">
        {products.length > 0 && (
          <div className="container-fluid">
            <h1 className="product-text">
              Hot items{" "}
              <input
                type="text"
                placeholder="Search for a product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </h1>
            <div className="product-grid">
              {filteredProducts.filter((product) => product.type === "fast")
                .length > 0 && (
                <div className="product-type">
                  <h2 className="product-type-title">Fast Food</h2>
                  <div className="product-box">
                    <Products
                      products={filteredProducts
                        .filter((product) => product.type === "fast")
                        .slice(0, 3)}
                      addtocart={addtocart}
                    />
                  </div>
                </div>
              )}
              {filteredProducts.filter((product) => product.type === "simple")
                .length > 0 && (
                <div className="product-type">
                  <h2 className="product-type-title">Simple</h2>
                  <div className="product-box">
                    <Products
                      products={filteredProducts
                        .filter((product) => product.type === "simple")
                        .slice(0, 3)}
                      addtocart={addtocart}
                    />
                  </div>
                </div>
              )}
              {filteredProducts.filter((product) => product.type === "beverage")
                .length > 0 && (
                <div className="product-type">
                  <h2 className="product-type-title">Beverage</h2>
                  <div className="product-box">
                    <Products
                      products={filteredProducts
                        .filter((product) => product.type === "beverage")
                        .slice(0, 3)}
                      addtocart={addtocart}
                    />
                  </div>
                </div>
              )}

              {filteredProducts.filter((product) => product.type === "snacks")
                .length > 0 && (
                <div className="product-type">
                  <h2 className="product-type-title">Snacks</h2>
                  <div className="product-box">
                    <Products
                      products={filteredProducts
                        .filter((product) => product.type === "snacks")
                        .slice(0, 3)}
                      addtocart={addtocart}
                    />
                  </div>
                </div>
              )}
              {filteredProducts.filter((product) => product.type === "dessert")
                .length > 0 && (
                <div className="product-type">
                  <h2 className="product-type-title">Dessert</h2>
                  <div className="product-box">
                    <Products
                      products={filteredProducts
                        .filter((product) => product.type === "dessert")
                        .slice(0, 3)}
                      addtocart={addtocart}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {products.length < 1 && (
          <div className="container">
            <img src={Spinner} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
