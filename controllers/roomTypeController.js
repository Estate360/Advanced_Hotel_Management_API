const RoomType = require("../models/roomType");
// const AppErrorHandler = require("../utils/AppErrorHandler");
const { catchAsync } = require("../utils/catchAsync");

//Create a new Room Type
exports.createRoomType = catchAsync(async (req, res, next) => {
  const roomType = await RoomType.create(req.body);

  res.status(201).json({
    message: "Room Type created",
    status: "success",
    data: {
      roomType,
    },
  });
});

//Find all Room Types
exports.findAllRoomTypes = catchAsync(async (req, res, next) => {
  const roomTypes = await RoomType.find();

  res.status(200).json({
    message: "All Room Types found",
    status: "success",
    result: roomTypes.length,
    data: {
      roomTypes,
    },
  });
});

// //Find a particular Room Type
// exports.findOneRoomType = catchAsync(async (req, res, next) => {
//   const room = await RoomType.findById(req.params.id);

//   if (!room)
//     return next(
//       new AppErrorHandler(`This room ID: ${req.params.id} does not exist`, 404)
//     );
//   res.status(200).json({
//     message: "Room Type found",
//     status: "success",
//     data: {
//       room,
//     },
//   });
// });

// //Update a Room Type
// exports.updateRoomType = catchAsync(async (req, res, next) => {
//   const room = await RoomType.findOneAndUpdate(req.params.id, req.query, {
//     new: true,
//     runValidators: true,
//   });

//   if (!room)
//     return next(
//       new AppErrorHandler(`No room found with the ID: ${req.params.id}`, 404)
//     );

//   res.status(200).json({
//     message: "Room Types Updated",
//     status: "success",
//     result: room.length,
//     data: {
//       room,
//     },
//   });
// });

// //Delete a Room Type
// exports.deleteRoomType = catchAsync(async (req, res, next) => {
//   const room = await RoomType.findOneAndDelete(req.params.id);

//   if (!room)
//     return next(
//       new AppErrorHandler(
//         `No room found with the ID: ${req.params.id}; \ndoes not exit`,
//         404
//       )
//     );

//   res.status(200).json({
//     message: `${room} deleted`,
//     status: "success",
//     data: null,
//   });
// });
