import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  //get one product
  const getOneProduct = async () => {
    try {
      axios
        .get(`http://127.0.0.1:8080/api/product/${params.slug}`)
        .then((res) => {
          if (res.data?.success) {
            toast.success(res.data.message);
            setName(res.data?.oneProduct.name);
            setId(res.data?.oneProduct._id);
            setDescription(res.data?.oneProduct.description);
            setPrice(res.data?.oneProduct.price);
            setQuantity(res.data?.oneProduct.quantity);
            setShipping(res.data?.oneProduct.shipping);
            setCategory(res.data?.oneProduct.category._id);
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("Error in getting this product");
    }
  };
  useEffect(() => {
    getOneProduct();
  }, []);

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

  //update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      await axios
        .put(`http://127.0.0.1:8080/api/updateProduct/${id}`, productData)
        .then((res) => {
          if (res.data?.success) {
            toast.success(`Product ${name} is updated`);
            navigate("/dashboard/admin/products");
          } else {
            toast.error(res.data?.message);
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("Error in product updating");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //delete product
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let answer = window.prompt(
        "Are you sure, you want to delete this product ?"
      );
      if (!answer) return;

      await axios
        .delete(`http://127.0.0.1:8080/api/product/${id}`)
        .then((res) => {
          if (res.data?.success) {
            toast.success(`Product deleted`);
            navigate("/dashboard/admin/products");
          } else {
            toast.error(res.data?.message);
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("Error deleting");
    }
  };

  return (
    <Layout title={"Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((oneCategory) => (
                  <Option key={oneCategory._id} value={oneCategory._id}>
                    {oneCategory.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Change Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://127.0.0.1:8080/api/product/photo/${id}`}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Update Product
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
