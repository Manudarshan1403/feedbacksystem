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

    topic: {
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

    question:{
      type:String,
      trim:true,
      required:[true,"please mention the question based on which employess's are evaluated"],

    },

    answer:{
      type:String,
      trim:true,
      required:[true,"please provide the answer"],
    },

    rating: {
      type: Number,
      min: [1, "rating must be above 1"],
      max: [10, "rating must be less than or equal to 10"],
    
    },

    totalScore:{
      type:Number,
      required:true
    }

  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
