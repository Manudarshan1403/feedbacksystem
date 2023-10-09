const fs = require("fs");
const Staff = require("./../models/staffModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createStaff = catchAsync(async (req, res) => {
  const newStaff = await Staff.create(req.body);

  res.status(201).json({ status: "success", data: { staff: newStaff } });
});

exports.updateStaff = catchAsync(async (req, res, next) => {
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!staff) {
    return next(new AppError("No staff found with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    result: staff.length,
    data: { staff: staff },
  });
});

exports.deleteStaff = catchAsync(async (req, res, next) => {
  const staff = await Staff.findByIdAndDelete(req.params.id);

  if (!staff) {
    return next(new AppError("No staff found with that Id", 404));
  }

  res.status(204).json({ status: "success", data: null });
});
