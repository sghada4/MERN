import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  //form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`http://127.0.0.1:8080/api/login`, {
          email,
          password,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || "/");
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgotPassword");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
