const fs = require("fs");
const Question = require("./../models/questionModel");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");


exports.createQuestion = catchAsync(async (req, res) => {
    const newQuestion = await Question.create(req.body);
  
    res.status(201).json({ status: "success", data: { question: newQuestion } });
  });

  exports.updateQuestion = catchAsync(async (req, res, next) => {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!question) {
      return next(new AppError("No question found with that Id", 404));
    }
  
    res
      .status(200)
      .json({ status: "success", result: question.length, data: { question: question } });
  });
  
  exports.deleteQuestion = catchAsync(async (req, res, next) => {
    const question = await Question.findByIdAndDelete(req.params.id);
  
    if (!question) {
      return next(new AppError("No question found with that Id", 404));
    }
  
    res.status(204).json({ status: "success", data: null });
  });
  
  