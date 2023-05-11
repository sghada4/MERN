import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`http://127.0.0.1:8080/api/createCategory`, { name })
        .then((res) => {
          if (res.data?.success) {
            toast.success(`Category ${name} is created`);
            getAllCategories();
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("Create form error");
    }
  };
  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`http://127.0.0.1:8080/api/updateCategory/${selected._id}`, {
          name: updatedName,
        })
        .then((res) => {
          if (res.data?.success) {
            toast.success(`${updatedName} is updated`);
            setSelected(null);
            setUpdatedName("");
            setVisible(false);
            getAllCategories();
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  //delete category
  const handleDelete = async (productId) => {
    try {
      await axios
        .delete(`http://127.0.0.1:8080/api/category/${productId}`)
        .then((res) => {
          if (res.data.success) {
            toast.success(`category is deleted`);

            getAllCategories();
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      toast.error("Somthing went wrong in deleting");
    }
  };
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

  return (
    <Layout title={"Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1> Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <tr>
                      <>
                        <td key={category._id}>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(category.name);
                              setSelected(category);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(category._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
