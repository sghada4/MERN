const controller = require("../controllers/category.controller");
const requireSignIn = require("../middlewares/auth.middleware");

//routing
module.exports = (app) => {
  //create category
  app.post(
    "/api/createCategory",
    requireSignIn.signIn,
    requireSignIn.isAdmin,
    controller.newCategory
  );
  //update category
  app.put(
    "/api/updateCategory/:id",
    requireSignIn.signIn,
    requireSignIn.isAdmin,
    controller.updateCategory
  );
  //get all categories
  app.get(
    "/api/categories",
    controller.allCategories
  );
  //get one category
  app.get(
    "/api/category/:slug",
    requireSignIn.signIn,
    requireSignIn.isAdmin,
    controller.oneCategory
  );
  //delete category
  app.delete(
    "/api/category/:id",
    requireSignIn.signIn,
    requireSignIn.isAdmin,
    controller.deleteCategory
  );
};
