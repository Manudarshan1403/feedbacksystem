const express = require("express");
const answerController = require("./../controllers/answerController");
const userController = require("./../controllers/userController");

const router = express.Router();

router
  .route("/")
  .post(answerController.createAnswer)
  .get(
    userController.protect,
    userController.restrictTo("admin"),
    answerController.getAllAnswers
  );
  

module.exports = router;
