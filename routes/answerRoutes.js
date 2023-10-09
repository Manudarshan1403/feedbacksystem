const express = require("express");
const answerController = require("./../controllers/answerController");
const userController = require("./../controllers/userController");

const router = express.Router();

router
  .route("/")
  .post(userController.restrictTo("user"), answerController.createAnswer)
  .get(
    userController.protect,
    userController.restrictTo("admin"),
    answerController.getAllAnswers
  );
  
router
  .route("/:id")
  .get(
    userController.protect,
    userController.restrictTo("admin"),
    answerController.getAnswer
  );

module.exports = router;
