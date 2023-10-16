const express = require("express");
const questionController = require("./../controllers/questionController");
const userController = require("./../controllers/userController");

const router = express.Router();

router
  .route("/").get(
    questionController.getAllQuestions)
  .post(
    userController.protect,
    userController.restrictTo("admin"),
    questionController.createQuestion
  );

router
  .route("/:id")
  .patch(
    userController.protect,
    userController.restrictTo("admin"),
    questionController.updateQuestion
  )
  .delete(
    userController.protect,
    userController.restrictTo("admin"),
    questionController.deleteQuestion
  );

module.exports = router;
