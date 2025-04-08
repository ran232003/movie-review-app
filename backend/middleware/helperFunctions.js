const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const MyError = require("../models/MyError");

//const dynamicModule = require("../schema/");
const Ajv = require("ajv").default;

const ajv = new Ajv();

const verifyToken = (req, res, next) => {
  const token = req.cookies["Auth_Cookie"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Auth token is missing", status: "error" });
  }

  jwt.verify(token, "my-secret", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token is invalid", status: "error" });
    }
    req.user = decoded; // Add decoded payload to request object
    next();
  });
};

const checkSchema = (schemaModule) => {
  console.log(schemaModule);
  return (req, res, next) => {
    try {
      if (!schemaModule) {
        const err = new MyError("missing schema", 500);
        next(err);
      }
      const dynamicModule = require(`../validation_schema/${schemaModule}`);
      const validate_schema = ajv.compile(dynamicModule);
      if (!validate_schema(req.body)) {
        console.log(validate_schema.errors);
        const err = new MyError("Schema Error", 400);
        next(err);
      }
      console.log("SchemaOK");
      next();
    } catch (error) {
      console.log(error);

      const err = new MyError("Internal Error", 500);
      next(err);
    }
  };
};
module.exports = {
  verifyToken,
  checkSchema,
};
