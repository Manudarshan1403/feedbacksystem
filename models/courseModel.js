const mongoose = require("mongoose");
const validator = require("validator");

const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: [true, "Each course must have it's own course id"],
      trim: true,
      unique: true,
    },

    courseName: {
      type: String,
      unique: true,
      required: [
        true,
        "A feedback system must include the course taught by the particular trainer",
      ],
      trim: true,
    },
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
