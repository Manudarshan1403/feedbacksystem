const fs = require("fs");
const Course = require("./../models/courseModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");


exports.createCourse = catchAsync(async (req, res) => {
    const newCourse = await Course.create(req.body);
  
    res.status(201).json({ status: "success", data: { course: newCourse} });
  });

  exports.updateCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!course) {
      return next(new AppError("No course found with that Id", 404));
    }
  
    res
      .status(200)
      .json({ status: "success", result: course.length, data: { course: course } });
  });
  
  exports.deleteCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
  
    if (!course) {
      return next(new AppError("No course found with that Id", 404));
    }
  
    res.status(204).json({ status: "success", data: null });
  });
  
  