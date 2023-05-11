import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      await axios.get(`http://127.0.0.1:8080/api/products`).then((res) => {
        if (res.data?.success) {
          toast.success(res.data.message);
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
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((oneProduct) => (
              <>
                <Link
                  key={oneProduct._id}
                  to={`/dashboard/admin/product/${oneProduct.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://127.0.0.1:8080/api/product/photo/${oneProduct._id}`}
                      className="card-img-top"
                      alt={oneProduct.name}
                      style={{ width: "200px", height: "200px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{oneProduct.name}</h5>
                      <p className="card-text">{oneProduct.description}</p>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
