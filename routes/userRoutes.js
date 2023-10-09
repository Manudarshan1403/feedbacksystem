const express = require("express");

const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router
  .route("/")
  .get(userController.restrictTo("admin"),userController.getAllUsers)
  .post(userController.createUser);
router.route("/:id").get(userController.restrictTo("admin"),userController.getUser);

module.exports = router;
