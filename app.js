const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
 const questionRouter = require("./routes/questionRoutes");
  const answerRouter = require("./routes/answerRoutes");
  const courseRouter = require("./routes/courseRoutes");
  const staffRouter = require("./routes/staffRoutes");
  const userRouter = require("./routes/userRoutes");


const app = express();


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// 3) Routes
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/answers", answerRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/staffs", staffRouter);
app.use("/api/v1/users", userRouter);



app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
