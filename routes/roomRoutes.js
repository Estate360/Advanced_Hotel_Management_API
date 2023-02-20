const express = require("express");
const authController = require("../controllers/authController");
const roomController = require("../controllers/roomController");

const router = express.Router();

router
  .route("/rooms")
  .get(roomController.findAllRooms)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    roomController.createRoom
  );

router.use(authController.protect);
router
  .route("/rooms/:id")
  .get(roomController.findOneRoom)
  .patch(authController.restrictTo("admin"), roomController.updateRoom)
  .delete(authController.restrictTo("admin"), roomController.deleteRoom);

module.exports = router;
