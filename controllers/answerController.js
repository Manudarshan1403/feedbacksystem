const fs = require("fs");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Answer = require("../models/answerModel");

exports.getAllAnswers = catchAsync(async (req, res) => {
  const answers = await Answer.find(req.query);

  res.header("Access-Control-Allow-Origin", "*")
    .status(200)
    .json({
      status: "success",
      result: answers.length,
      data: { answer: answers },
    });
});

exports.createAnswer = catchAsync(async (req, res) => {
  console.log(req.body);
  const newAnswer = await Answer.create(req.body);

  res.status(201).json({ status: "success", data: { answer: newAnswer } });
});

exports.getAnswer = async (req, res) => {
  try {
    const answer = await Answer.find(req.query);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        answer
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    console.log(req);
    const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, {
      new:true
    });

    res.status(200).json({
      status: 'success',
      data: {
        answer
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};