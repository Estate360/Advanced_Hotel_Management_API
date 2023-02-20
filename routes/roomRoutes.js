const express = require("express");
const authController = require("../controllers/authController");
const roomController = require("../controllers/roomController");
// const userController = require("../controllers/userController");

const router = express.Router();

router.use(authController.protect);
router
  .route("/rooms")
  .get(roomController.findAllRooms)
  .post(authController.restrictTo("admin"), roomController.createRoom);

router
  .route("/rooms/:id")
  .get(roomController.findOneRoom)
  .patch(authController.restrictTo("admin"), roomController.updateRoom)
  .delete(authController.restrictTo("admin"), roomController.deleteRoom);

module.exports = router;
