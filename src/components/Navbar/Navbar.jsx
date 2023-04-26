import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../config";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

const Navbar = ({ totalQty }) => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  function logout() {
    auth.signOut();
    navigate("/sign-in");
  }

  return (
    <nav class="navbar">
      <div class="navbar-items-left">
        <Link to="/">
          <img
            src="https://s.tmimgcdn.com/scr/1200x627/212900/spoon-and-fork-restaurant-logo_212966-original.png"
            alt=""
            class="logo"
          />
        </Link>
      </div>
      <div class="navbar-items-right">
        {user && (
          <>
            <NavLink to="/cart">
              <div className="cart-icon">
                <i class="fa fa-shopping-cart">
                  <FaShoppingCart />
                </i>
                <span class="cart-qty">{totalQty}</span>
              </div>
            </NavLink>
            <Link to="/profile">
              <FaUserAlt className="profile-icon" />
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {!user && (
          <>
            <Link to="/sign-in" className="sign-in-btn">
              SignIn
            </Link>
            <Link to="/sign-up" className="sign-up-btn">
              SignUp
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
