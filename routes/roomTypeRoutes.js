const express = require("express");
const authController = require("../controllers/authController");
const roomTypeController = require("../controllers/roomTypeController");

const router = express.Router();

router.get(
  "/room-types",
  authController.protect,
  authController.restrictTo("admin"),
  roomTypeController.findAllRoomTypes
);
router.post(
  "/rooms",
  authController.protect,
  authController.restrictTo("admin"),
  roomTypeController.createRoomType
);

module.exports = router;
