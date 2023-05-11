import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`http://127.0.0.1:8080/api/forgotPassword`, {
          email,
          newPassword,
          answer
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            
            navigate("/login");
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
    <Layout title={"Reset Password"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Enter Your Favorite Sport"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputNewPassword"
              placeholder="Enter Your New Password"
              required
            />
          </div>
          

          <button type="submit" className="btn btn-primary">
           Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
