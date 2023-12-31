const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please tell us your name!"] },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  role: {
    type: String,
    required: [true, "please provide type of user signing up"],
    enum: {
      values: ["user", "admin"],
      message: "must be either user or admin",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [
      8,
      "length of password must be greater than or equal to 8 characters",
    ],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    //this works only on save or create or post!!
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same ",
    },
  },
});

userSchema.pre("save", async function (next) {
  //only runs this function if password was actually modified
  if (!this.isModified("password")) return next();

  //Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete passwordconfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimeStamp, JWTTimestamp);
    return JWTTimestamp < changedTimeStamp;
  }
  //False means not changed
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
