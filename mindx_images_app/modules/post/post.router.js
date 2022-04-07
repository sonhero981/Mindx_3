const express = require("express");
const checkRole = require("../../middleware/checkRole");
const isAdmin = require("../../middleware/isAdmin");
const needAuthenticated = require("../../middleware/needAuthenticated");
const router = express.Router();
const postController = require("./post.controller");

//router tập hợp các API có điểm chung => cùng tiền tố '/api/posts'

router.get("/", postController.getPosts);
router.get("/:post/comments", postController.getCommentsOfPost);
router.get("/:_id", postController.getPost);
router.post("/", needAuthenticated, checkRole("user"), postController.createPost);
router.put("/:_id", needAuthenticated, postController.updatePost);
router.delete("/:_id", needAuthenticated, checkRole("admin"), postController.deletePost);
module.exports = router;