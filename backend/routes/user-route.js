let express = require("express");
const {
  signin,
  signup,
  getUser,
  signout,
} = require("../controllers/user-controller");
const { verifyToken, checkSchema } = require("../middleware/helperFunctions");

const router = express.Router();
router.post("/signin", checkSchema("login.json"), signin);
router.post("/signup", checkSchema("authScema.json"), signup);
router.get("/getUser", verifyToken, getUser);
router.get("/signout", signout);

module.exports = router;
