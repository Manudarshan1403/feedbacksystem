const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");
const { Long } = require("mongodb");
const process = require("process");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  // console.log(err);
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection successful!");
  });

const port = process.env.PORT || 2228;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


process.on("unhandledRejection", (err) => {
  // console.log(err.name, err.message);
  console.log("UNHANDLER REJECTION! Shutting down...");
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});
