const express = require("express");
const courseController = require("./../controllers/courseController");
const userController = require("./../controllers/userController");

const router = express.Router();

router
  .route("/")
  .post(
    userController.protect,
    userController.restrictTo("admin"),
    courseController.createCourse
  );

router
  .route("/:id")
  .patch(
    userController.protect,
    userController.restrictTo("admin"),
    courseController.updateCourse
  )
  .delete(
    userController.protect,
    userController.restrictTo("admin"),
    courseController.deleteCourse
  );

module.exports = router;
