const mongoose = require("mongoose");
const validator = require("validator");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "A feedback system must have a question"],
      trim: true,
    },

    isRating: {
      type: Number,
      min: [1, "rating must be above 1"],
      max: [10, "rating must be less than or equal to 10"],
      required: [true, "A feedback system must have a rating"],
    },
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
