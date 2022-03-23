const express = require("express");
const app = express();
const postModel = require("./post");
const commentModel = require("./comment");

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

//post : {id, content, createBy}

app.post("/api/posts", async (req, res) => {
  const { content, createBy } = req.body;
  try {
    const newPost = await postModel.createPost({ content, createBy });
    res.send({ success: 1, data: newPost });
  } catch (err) {
    res.send({ success: 0, data: null, message: err.message });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const allPosts = await postModel.getPosts();
    res.send({ success: 1, data: allPosts });
  } catch (err) {
    res.send({ success: 0, data: null, message: err.message });
  }
});

app.get("/api/posts/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const foundPost = await postModel.getPost(postId);
    res.send({ success: 1, data: foundPost });
  } catch (err) {
    res.send({ success: 0, data: null, message: err.message });
  }
});

app.put("/api/posts/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const newPost = await postModel.updatePost({ postId, content });
    console.log(newPost);
    res.send({ success: 1, data: newPost });
  } catch (err) {
    res.send({ success: 0, data: null, message: err.message });
  }
});

app.delete("/api/posts/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const newPosts = await postModel.deletePost(postId);
    res.send({ success: 1 });
  } catch {
    res.send({ success: 0, data: null, message: err.message });
  }
});

// Comment

app.get("/api/comments", async (req, res) => {
  try {
    const allComments = await commentModel.getComments();
    res.send({ success: 1, data: allComments });
  } catch (err) {
    res.send({ success: 0, data: err.message });
  }
});

app.get("/api/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    console.log(commentId);
    const foundComment = await commentModel.getComment(commentId);
    console.log(foundComment);
    res.send({ success: 1, data: foundComment });
  } catch (err) {
    res.send({ success: 0, data: err.message });
  }
});

app.post("/api/comments", async (req, res) => {
  try {
    const { content, createBy, postId } = req.body;
    const newComments = await commentModel.createComment({
      content,
      createBy,
      postId,
    });
    res.send({ success: 1, data: newComments });
  } catch (err) {
    res.send({ success: 0, data: err.message });
  }
});

app.put("/api/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const newComments = await commentModel.updateComment({
      commentId,
      content,
    });
    console.log(newComments);
    res.send({ success: 1, data: newComments });
  } catch (err) {
    res.send({ success: 0, data: err.message });
  }
});

app.delete("/api/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const newComments = await commentModel.deleteComment(commentId);
    res.send({ success: 1, data: newComments });
  } catch {
    res.send({ success: 0, data: err.message });
  }
});

// Comment of Post

app.get("/api/posts/:postId/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    const commentOfPost = await commentModel.getCommentOfPost(postId);
    res.send({ success: 1, data: commentOfPost });
  } catch (err) {
    res.send({ success: 0, data: err.message });
  }
});

app.use("*", (req, res) => {
  res.sendFile({ message: "404 not found" });
});

app.listen(9000, err => {
  if (err) {
    return console.log(err);
  }

  console.log("server stated");
});
