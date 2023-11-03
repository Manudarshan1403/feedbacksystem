const express = require("express");
const answerController = require("./../controllers/answerController");
const userController = require("./../controllers/userController");

const router = express.Router();

router
  .route('/:id')
  .patch(answerController.updateAnswer)

router
  .route("/")
  .post(answerController.createAnswer)
  .get(
    answerController.getAllAnswers
  );
module.exports = router;
