const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mindx-images-web57", (err) => {
  if (err) console.log("DB connect err", err);
  console.log("DB connect successfully");
})

app.use("*", (req, res) => {
  res.send({ message: "404 not found" });
})

app.listen(8080, (err) => {
  if (err) console.log("Server error", err);
  console.log("Server started");
})
