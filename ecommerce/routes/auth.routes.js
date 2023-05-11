const controller = require("../controllers/auth.controller");
const requireSignIn = require("../middlewares/auth.middleware");

//routing
module.exports = (app) => {
  //REGISTER || METHOD POST
  app.post("/api/register", controller.register);
  //LOGIN || METHOD POST
  app.post("/api/login", controller.login);

  //Forgot Password || POST
  app.post("/api/forgotPassword", controller.forgotPassword);

  //protected user route auth
  app.get("/api/user", requireSignIn.signIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
  //protected admin route auth
  app.get(
    "/api/admin",
    requireSignIn.signIn,
    requireSignIn.isAdmin,
    (req, res) => {
      res.status(200).send({ ok: true });
    }
  );
};
