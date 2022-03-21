const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

//ex1

app.get("/", (req, res) => {
  res.send("Home work 1");
});

//ex2

app.get("/course", (req, res) => {
  res.send({ course: "web57" });
});

app.get("/course/random", (req, res) => {
  const courses = [{ course: "c4e" }, { course: "ci" }, { course: "web57" }];
  const randomCourse = courses[Math.floor(Math.random() * courses.length)];
  res.send(randomCourse);
});

app.get("/even", (req, res) => {
  const min = Number(req.query.from);
  const max = Number(req.query.to);
  let numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }
  const numberEven = numbers.filter(number => number % 2 === 0);
  res.send({ numberEven });
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/auth/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "admin" && password === "123456") {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.listen(9000, err => {
  if (err) {
    return console.log(err);
  }

  console.log("server stated");
});
