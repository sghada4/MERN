const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");

//configure env
dotenv.config({ path: "./config/config.env" });

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
require("./routes/auth.routes")(app);
require("./routes/category.routes")(app);
require("./routes/product.routes")(app);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1> ");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running  on mode ${process.env.DEV_MODE} on port ${PORT}`.bgRed.blue
  );
});
