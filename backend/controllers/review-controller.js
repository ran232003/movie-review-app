const MyError = require("../models/MyError");
const createReview = async (req, res, next) => {
  console.log("createReview", req.user?.id, req.body);

  try {
    //console.log(response.data);
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({ data: error, status: "error" });
  }
};
module.exports = {
  createReview,
};
