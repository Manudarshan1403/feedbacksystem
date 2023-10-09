const mongoose = require("mongoose");
const validator = require("validator");

const answerSchema = new mongoose.Schema(
  {
    trainerName: {
      type: String,
      required: [true, "A feedback system must have a trainers name"],
      trim: true,
    },

    evaluatorName: {
      type: String,
      required: [true, "to evaluate the trainer a evaluator is must"],
      trim: true,
    },

    course: {
      type: String,
      required: [
        true,
        "it is necessary to mention the course taught by the trainer",
      ],
      trim: true,
    },
    Topic: {
      type: String,
      required: [
        true,
        "it is necessary to mention the particular topic taught by trainer on that particular day",
      ],
      trim: true,
    },
    
    Date: {
      type: Date,
      default: Date.now(),
    },

    Day: {
      type: String,
      required: [
        true,
        "a evaluator must mention day of conducting class by trainer",
      ],
      enum: {
        values: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        message: "Day is either:monday,tuesday,wednesday,thursday,friday",
      },
    },
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
