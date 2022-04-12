require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("uploads"));
const mongoose = require("mongoose");
const postRouter = require("./modules/post/post.router");
const commentRouter = require("./modules/comment/comment.router");
const authRouter = require("./modules/auth/auth.router");
const uploadRouter = require("./upload/upload.router");
const middlewareEx1 = require("./middleware/ex1");
const checkRole = require("./middleware/checkRole");

mongoose.connect(process.env.MONGODB_URI, err => {
  if (err) console.log("DB connect err", err);
  console.log("DB connect successfully");
});

// Tất cả HTTP request nào có tiền tố là /api/posts => thì đi vào postRouter
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/comments", commentRouter);
app.use("/api/upload", uploadRouter);
app.get("/api/test", middlewareEx1, (req, res, next) => {
  res.send({ success: 1 });
});

app.use("*", (req, res) => {
  res.send({ message: "404 not found" });
});

//Bắt toàn bộ các middle ware khi gọi hàm next(error)
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ success: 0, message: err.message });
});

app.listen(process.env.PORT || 8080, err => {
  if (err) console.log("Server error", err);
  console.log("Server started");
});
