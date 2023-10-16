const express = require("express");

const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router
  .route("/")
  .get(userController.protect,userController.restrictTo("admin"),userController.getAllUsers);
  

router.route("/:id").get(userController.protect,userController.restrictTo("admin"),userController.getUser);

module.exports = router;
