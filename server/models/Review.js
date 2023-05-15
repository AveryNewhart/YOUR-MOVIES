const { model, Schema } = require("mongoose");
// const movieSchema = require('./Movie')

const reviewSchema = new Schema({
  reviewId: {
    type: String,
  },
  reviewAuthor: {
    type: String,
  },
  reviewText: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// const Review = model("Review", reviewSchema);

module.exports = reviewSchema;