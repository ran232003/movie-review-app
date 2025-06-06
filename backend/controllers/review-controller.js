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
const editReview = async (req, res, next) => {
  console.log("createReview", req.user?.id, req.body, req.user);

  const { id, title, subtitle, content } = req.body;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.title = title;
    review.subtitle = subtitle;
    review.content = content;

    await review.save();
    const reviews = await Review.find({ userId: req.user?.id });
    res.status(200).json({ data: reviews, status: "ok" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
const getAllReviews = async (req, res, next) => {
  console.log("getAllReviews", req.user?.id);

  try {
    //console.log(response.data);
    // const review = { ...req.body, userId: req.user?.id };
    // const reviews = await Review.find({ userId: req.user?.id })
    //   .populate("userId", "userName email")
    //   .lean();
    const reviews = await Review.find({});
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
  editReview,
  getAllReviews,
};
