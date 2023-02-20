const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A room type name must be provided!"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const RoomType = mongoose.model("RoomType", roomTypeSchema);

module.exports = RoomType;
