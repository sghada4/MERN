const user = require("../models/user.model");
const passwordHelper = require("../helpers/auth.helper");
const JWT = require("jsonwebtoken");

//register
module.exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }

    if (!email) {
      return res.send({ message: "Email is Required" });
    }

    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    if (!phone) {
      return res.send({ message: "Phone number is Required" });
    }

    if (!address) {
      return res.send({ message: "Address is Required" });
    }

    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const existingUser = await user.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await passwordHelper.hashPassword(password);
    //save
    const newUser = await new user({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const thisUser = await user.findOne({ email });
    if (!thisUser) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await passwordHelper.comparePassword(
      password,
      thisUser.password
    );
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password ",
      });
    }
    //token
    const token = await JWT.sign(
      { _id: thisUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: thisUser._id,
        name: thisUser.name,
        email: thisUser.email,
        phone: thisUser.phone,
        address: thisUser.address,
        role: thisUser.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//protected
module.exports.connectUser = async (req, res) => {
  try {
    res.send("protected Route");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//forgot password
module.exports.forgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status((400).send({ message: "Email is required" }));
    }
    if (!answer) {
      res.status((400).send({ message: "Answer is required" }));
    }
    if (!newPassword) {
      res.status((400).send({ message: "New Password is required" }));
    }
    //check
    const thisUser = await user.findOne({ email, answer });
    //validation
    if (!thisUser) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await passwordHelper.hashPassword(newPassword);
    await user.findByIdAndUpdate(thisUser._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
