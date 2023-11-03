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
      type: Boolean,
      required:[true,"Please let us know whether this question needs ragting or not"]
    
    },
    required: {
      type: Boolean,
      required: [true,"Is this question, a choice"]
    }
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
