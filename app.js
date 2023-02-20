require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const roomsRouter = require("./routes/roomRoutes");
const roomTypesRouter = require("./routes/roomTypeRoutes");
const userRouter = require("./routes/usersRoute");
const AppErrorHandler = require("./utils/AppErrorHandler");

const app = express();
const port = process.env.PORT || 8800;

//Global Middleware
app.use(cors()); // allow cross-origin request

app.use(express.json()); // Use JSON parser middleware
app.use(express.urlencoded());

// Routes Middleware
app.use("/api/v1", userRouter);
app.use("/api/v1", roomTypesRouter);
app.use("/api/v1", roomsRouter);

//Wrong route error handler middleware
app.use("*", (req, res, next) => {
  next(
    new AppErrorHandler(`Can't find ${req.originalUrl} on this Server!`, 404)
  );
  console.log(error.stack);
});

//Database Connection
const DB = process.env.DATABASE;
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((error) => {
    console.log("Not connected to the database!!", error.stack);
  });

//Server Connection
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
