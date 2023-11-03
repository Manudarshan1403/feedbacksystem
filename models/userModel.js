const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: [true, "Please provide your name!"],trim:true},
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  role: {
    type: String,
    required: [true, "please provide type of user before signing up"],
    enum: {
      values: ["trainer", "marketer","designer","admin"],
      message: "must be either trainer,marketer,designer,admin",
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

  employeeId:{
    type:Number,
    required:[true,"each employee must have unique id"],
    unique:true,
  },

  employeeName:{
    type:String,
    required:[true,"must mention employee name"],
    trim:true,
},

dateOfJoining:{
type:Date,
required:[true,"a employee should mention his date of joining in the institute"],
validate: [validator.isDate, "Please provide a valid date"],

},

salary:{
  type:Number,
  required:[true,"salary details of particular employee"],
},

experience:{
  type:String,
  required:[true,"please provide info about employee's experience"],
  trim:true,
},

skillset:{
  type:Array
},

jobType:{
  type:String,
  required:true,
},

isAdmin: {
  type: Boolean,
  required: [true, "mention whether you are admin or not"],
},
passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
} ,{ toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.pre("save", async function (next) {
  //only runs this function if password was actually modified
  if (!this.isModified("password")) return next();

  //Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete passwordconfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save",async function(next){
  const users = await User.find()
  this.employeeId = (users.length-1)+1;
  this.userName = "this.employeeName+this.employeeId";
  next();
});



// userSchema.pre("save", function (next) {
//   if (!this.isModified("password") || this.isNew) return next();

//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });

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

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};


const User = mongoose.model("User", userSchema);

module.exports = User;
