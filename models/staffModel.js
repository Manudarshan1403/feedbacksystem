const mongoose = require("mongoose");
const validator = require("validator");

const staffSchema = new mongoose.Schema(
  {
    trainerId: {
      type: String,
      required: [true, "Each trainer must have their own trainer id"],
      trim: true,
      unique: true,
    },

    trainerName: {
      type: String,
      required: [true, "A feedback system must include the trainer name"],
      trim: true,
    },
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
