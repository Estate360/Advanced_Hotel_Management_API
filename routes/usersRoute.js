const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router
  .route("/")
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);
router.use(authController.protect);
router
  .route("/:id")
  .get(userController.getOneUser)
  .patch( userController.updateUser)

  .delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;
