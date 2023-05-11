const mongoose = require("mongoose");
const colors = require("colors");

module.exports = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoBD database ${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Error in MongoDB: ${error}`.bgRed.white);
  }
};

 
