const MyError = require("../models/MyError");
const Review = require("../models/review-schema");
const createReview = async (req, res, next) => {
  console.log("createReview", req.user?.id, req.body, req.user);

  try {
    //console.log(response.data);
    // const review = { ...req.body, userId: req.user?.id };
    const review = new Review({ ...req.body, userId: req.user?.id });
    await review.save();
    console.log("review", review);
    const userReviews = await Review.find({ userId: req.user?.id });
    console.log("userReviews", userReviews);
    return res.json({ status: "ok", data: userReviews });
  } catch (error) {
    console.log(error);
    return res.json({ data: error, status: "error" });
  }
};
const getUserReviews = async (req, res, next) => {
  console.log("getUserReviews", req.user?.id);

  try {
    //console.log(response.data);
    // const review = { ...req.body, userId: req.user?.id };
    // const reviews = await Review.find({ userId: req.user?.id })
    //   .populate("userId", "userName email")
    //   .lean();
    const reviews = await Review.find({ userId: req.user?.id });
    await Review.populate(reviews, {
      path: "userId",
      select: "userName",
    });
    console.log("userReviews", reviews);
    return res.json({ status: "ok", data: reviews });
  } catch (error) {
    console.log(error);
    return res.json({ data: error, status: "error" });
  }
};
module.exports = {
  createReview,
  getUserReviews,
};
