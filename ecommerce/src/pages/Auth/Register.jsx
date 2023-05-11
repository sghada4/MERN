import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css" 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`http://127.0.0.1:8080/api/register`, {
          name,
          email,
          password,
          phone,
          address,
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
  console.log(process.env.REACT_APP_API);
  return (
    <Layout title="Register">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              required
            />
          </div>
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
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
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
              placeholder="What is your favorite sport"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
