import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      await axios.get(`http://127.0.0.1:8080/api/products`).then((res) => {
        if (res.data?.success) {
          setProducts(res.data?.products);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in getting products");
    }
  };
  //lifecycle method
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);


  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get all categories
  const getAllCategories = async () => {
    try {
      axios.get(`http://127.0.0.1:8080/api/categories`).then((res) => {
        if (res.data?.success) {
          toast.success(res.data.message);
          setCategories(res.data?.categories);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in getting categories");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  //filter by category
  const handleFilter = (value, id) => {
    let allFilters = [...checked];
    if (value) {
      allFilters.push(id);
    } else {
      allFilters = allFilters.filter((category) => category !== id);
    }
    setChecked(allFilters);
  };

  //get filterd product
  const filterProduct = async () => {
    try {
      await axios
        .post("http://127.0.0.1:8080/api/productFilter", {
          checked,
          radio,
        })
        .then((res) => {
          setProducts(res.data?.products);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Home"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((price) => (
                <div key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((oneProduct) => (
              <>
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={oneProduct._id}
                >
                  <img
                    src={`http://127.0.0.1:8080/api/product/photo/${oneProduct._id}`}
                    className="card-img-top"
                    alt={oneProduct.name}
                    style={{ width: "200px", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{oneProduct.name}</h5>
                    <p className="card-text">{oneProduct.description}</p>
                    <p className="card-text">{oneProduct.price}dt</p>
                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${oneProduct.slug}`)}>
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1" onClick={() => navigate(`/login`)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
