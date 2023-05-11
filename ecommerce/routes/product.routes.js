const controller = require("../controllers/product.controller");
const requireSignIn = require("../middlewares/auth.middleware");
const formidable = require("express-formidable");

//routing
module.exports = (app) => {
  //create product
  app.post(
    "/api/createProduct",
    requireSignIn.signIn,
    requireSignIn.isAdmin,
    formidable(),
    controller.newProduct
  );
  //update product
  app.put(
    "/api/updateProduct/:id",
    requireSignIn.signIn,
    requireSignIn.isAdmin,
    formidable(),
    controller.updateProduct
  );
  //get all products
  app.get("/api/products", controller.allProducts);
  //get one product by name
  app.get("/api/product/:slug", controller.oneProduct);
  //get products photo
  app.get("/api/product/photo/:productId", controller.productPhoto);
  //delete product
  app.delete(
    "/api/product/:id",
    requireSignIn.signIn,
    requireSignIn.isAdmin,
    controller.deleteProduct
  );
  //filter product
  app.post("/api/productFilter", controller.productFilter);
  //similar product
  app.get("/api/related-product/:pid/:cid", controller.realtedProduct);
};
