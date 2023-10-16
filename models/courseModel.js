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

    duration:{
      type:String,
      required:[true,"each course must have a duration"],
      trim:true,
    },

    topics:{
      type:Array,
      required:[true,"must mention the topics to be teached in each course"],
    },

    fees:{
      type:Number,
      required:[true,"must mention appropriate fees for the course"],
    },

    approxNoOfClasses:{
      type:Number
    }

},

  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
