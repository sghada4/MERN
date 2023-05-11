const productModel = require("../models/product.model");
const slugify = require("slugify");
const fs = require("fs");

//new product
module.exports.newProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({
          message: "Name is required",
        });
      case !description:
        return res.status(500).send({
          message: "Description is required",
        });
      case !price:
        return res.status(500).send({
          message: "Price is required",
        });
      case !category:
        return res.status(500).send({
          message: "Category is required",
        });
      case !quantity:
        return res.status(500).send({
          message: "Quantity is required",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          message: "Photo is required and should be less then 1Mb",
        });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "new product created",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating product",
      error,
    });
  }
};

//update product
module.exports.updateProduct = async (req, res) => {
  try {
    const { name,  description, price, category, quantity } =
      req.fields;
    const { photo } = req.files;
    const { id } = req.params;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({
          message: "Name is required",
        });
      case !description:
        return res.status(500).send({
          message: "Description is required",
        });
      case !price:
        return res.status(500).send({
          message: "Price is required",
        });
      case !category:
        return res.status(500).send({
          message: "Category is required",
        });
      case !quantity:
        return res.status(500).send({
          message: "Quantity is required",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          message: "Photo is required and should be less then 1Mb",
        });
    }
    const products = await productModel.findByIdAndUpdate(
      id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product",
      error,
    });
  }
};

//find all products
module.exports.allProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All products List",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all products",
      error,
    });
  }
};

//find one product
module.exports.oneProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const oneProduct = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Find product successfully",
      oneProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting this product",
      error,
    });
  }
};
//find products photo
module.exports.productPhoto = async (req, res) => {
  try {
    const { productId } = req.params;
    const oneProduct = await productModel.findById(productId).select("photo");
    if (oneProduct.photo.data) {
      res.set("Content-type", oneProduct.photo.contentType);
      return res.status(200).send(oneProduct.photo.data);
    }

    res.status(200).send({
      success: true,
      message: "Find product successfully",
      oneProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

//delete product
module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id).select("-photo");

    res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//filter product
module.exports.productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

// similar products
module.exports.realtedProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};