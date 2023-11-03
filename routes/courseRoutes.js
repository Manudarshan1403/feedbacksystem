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
  ).get(userController.protect,userController.restrictTo("admin"),
  courseController.getAllCourseDetails);

  router.route("/coursenames").get(
    courseController.getCourseNames);

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
