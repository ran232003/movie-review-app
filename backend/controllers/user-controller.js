const MyError = require("../models/MyError");
const User = require("../models/user-schema");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  const { email, password, userName } = req.body;
  // Check if all required fields are provided
  try {
    // Check if the email already exists
    let checkUser = await User.findOne({ email: email });

    if (checkUser) {
      let err = new MyError("Email Exists");
      return next(err);
    }

    // Generate hashed password (12 salt rounds)
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);

    // Create new user
    let user = new User({
      email: email,
      password: hash,
      userName: userName,
      isAdmin: false,
    });

    // Save user to the database
    await user.save();
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password; // Remove password field
    // Generate a JWT token for authentication
    let token = jwt.sign({ id: user._id, email: email }, "my-secret", {
      expiresIn: "1d",
    });

    // Set token in cookie
    res.status(201);
    res.cookie("Auth_Cookie", token);

    return res.json({
      status: "ok",
      msg: "Success",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let checkUser = await User.findOne({ email: email });

    if (!checkUser) {
      let err = new MyError("User Was Not Found");
      return next(err);
    }
    let passwordCheck = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );
    if (!passwordCheck) {
      const err = new MyError("Wrong Details", 500);
      return next(err);
    }

    let token = jwt.sign({ id: checkUser._id, email: email }, "my-secret", {
      expiresIn: "1d",
    });
    res.status(201);
    res.cookie("Auth_Cookie", token);
    // res.setHeader("Set-Cookie", token);
    return res.json({ status: "ok", user: checkUser, msg: "Success" });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    return res.json({ status: "ok", user: user });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const signout = (req, res) => {
  res.clearCookie("Auth_Cookie");
  res.json({ status: "ok" });
};
module.exports = {
  signup,

  getUser,
  signout,
  signin,
};
