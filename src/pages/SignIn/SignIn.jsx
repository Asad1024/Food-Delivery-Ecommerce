import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Sign.css";
import { toast } from "react-toastify";
import OAuth from "../../components/OATH";
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
        toast.success("Welcome Back");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  }
  return (
    <section>
      <h1>Sign In</h1>
      <div class="container">
        <div class="img">
          <img
            src="https://images.unsplash.com/photo-1618060932014-4deda4932554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGxvY2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt="key"
          />
        </div>
        <div class="form">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
            />
            <div class="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
            </div>
            <div class="links">
              <p>
                Don't Have an account? <Link to="/sign-up">Sign Up</Link>
              </p>
            </div>
            <button type="submit">Sign In</button>
            <br />
            <span>OR</span>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
