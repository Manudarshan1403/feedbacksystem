const fs = require("fs");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Answer = require("../models/answerModel");

exports.getAllAnswers = catchAsync(async (req, res) => {
  const answers = await Answer.find();

  res
    .status(200)
    .json({
      status: "success",
      result: answers.length,
      data: { answer: answers },
    });
});

exports.getAnswer = catchAsync(async (req, res, next) => {
  console.log(req.params);

  const answer = await Tour.findById(req.params.id);

  if (!answer) {
    return next(new AppError("No answer found with that Id", 404));
  }

  res
    .status(200)
    .json({
      status: "success",
      result: answer.length,
      data: { answer: answer },
    });
});

exports.createAnswer = catchAsync(async (req, res) => {
  const newAnswer = await Answer.create(req.body);

  res.status(201).json({ status: "success", data: { answer: newAnswer } });
});
