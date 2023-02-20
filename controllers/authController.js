const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { catchAsync } = require("../utils/catchAsync");
const { User, userValidator } = require("../models/user");
const AppErrorHandler = require("../utils/AppErrorHandler");

exports.register = catchAsync(async (req, res, next) => {
  const { error } = await userValidator.validateAsync(req.body, {
    abortEarly: false,
  });
  if (error) return next(new AppErrorHandler(error.details[0].message));

  const { email } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  // Create new user
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  newUser.password = undefined;

  // Return token
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.json({ token });
  console.log(token);

  res.status(201).json({
    message: "User successfully created.",
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Check password
  if (!user || !(await user.checkCorrectPassword(password, user.password)))
    return next(new AppErrorHandler("Invalid email or password", 401));

  //If all is correct, return token
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.json({ token });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);
  if (!token)
    return next(
      new AppErrorHandler(
        "You are not logged in, please login to get access",
        401
      )
    );

  //2) Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_PRIVATE_KEY
  );
  if (!decoded) {
    return next(
      new AppErrorHandler("You are not logged in, please login", 401)
    );
  }
  console.log(decoded);

  next();
});

exports.restrictTo =
  (...roles) =>
  async (req, res, next) => {
    //roles can be ["admin"] or anyone with higher authority other than that of a user.
    //by default, role="user"
    if (!roles.includes(req.user.role)) {
      return next(
        new AppErrorHandler(
          "You do not have permission to perform this action",
          403
        )
      );
    }
    next();
  };
