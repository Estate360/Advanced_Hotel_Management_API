const { User } = require("../models/user");
const { catchAsync } = require("../utils/catchAsync");
const AppErrorHandler = require("../utils/AppErrorHandler");

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error!",
    message: "This route is not defined!, please use /api/v1/register",
  });
};

exports.getOneUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new AppErrorHandler(`No User found with the ID: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Users successfully fetched",
    result: user.length,
    data: {
      user,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const query = req.query.new;
  const user = query
    ? await User.find().sort({ _id: -1 }).limit(3)
    : await User.find();

  res.status(200).json({
    status: "success",
    message: "All users successfully fetched",
    result: user.length,
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user)
    return next(
      new AppErrorHandler(`User with ID: ${req.params.id} not found!`, 404)
    );

  res.status(200).json({
    message: "user updated successfully",
    status: "success",
    result: user.length,
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user)
    return next(
      new AppErrorHandler(
        `No user found with the ID: ${req.params.id}. Not deleted!`,
        404
      )
    );

  res.status(200).json({
    message: `user with the ID: ${user} deleted`,
    status: "success",
    data: null,
  });
});
