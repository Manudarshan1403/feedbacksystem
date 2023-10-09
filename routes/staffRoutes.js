const express = require("express");
const staffController = require("./../controllers/staffController");
const userController = require("./../controllers/userController");

const router = express.Router();

router
  .route("/")
  .post(
    userController.protect,
    userController.restrictTo("admin"),
    staffController.createStaff
  );

router
  .route("/:id")
  .patch(
    userController.protect,
    userController.restrictTo("admin"),
    staffController.updateStaff
  )
  .delete(staffController.deleteStaff);

module.exports = router;
