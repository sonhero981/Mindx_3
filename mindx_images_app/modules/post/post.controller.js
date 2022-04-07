const PostModel = require("./post");
const CommentModel = require("../comment/comment");
const UserModel = require("../auth/user");
const jwt = require("jsonwebtoken");

//GET POSTS
const getPosts = async (req, res, next) => {
  const posts = await PostModel.find({});
  res.send({ success: 1, data: posts });
};

//GET POST BY ID
const getPost = async (req, res) => {
    const _id = req.params;
    console.log(_id);
    const foundPost = await PostModel.findById(_id);
    res.send({ success: 1, data: foundPost });
};

// CREATE POST
const createPost = async (req, res) => {
  const { title, description, imageUrl, createdBy } = req.body;
  const newPost = await PostModel.create({
    title,
    description,
    imageUrl,
    createdBy: existedUser._id,
  });
  res.send({ success: 1, data: newPost });
};

//UPDATE POST
const updatePost = async (req, res) => {
  const { _id } = req.params;
  const dataUpdatePost = req.body;
  const updatedPost = await PostModel.findByIdAndUpdate(_id, dataUpdatePost, {
    new: true,
  });
  res.send({ success: 1, data: updatedPost });
};

//DELETE POST
const deletePost = async (req, res) => {
  const { _id } = req.params;
  await PostModel.findByIdAndDelete(_id);
  res.send({ success: 1 });
};

//GET COMMENTS BY POSTID
const getCommentsOfPost = async (req, res) => {
    const { post } = req.params;
    const commentsOfPost = await CommentModel.find({ post: post });
    res.send({ success: 1, data: commentsOfPost });
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getCommentsOfPost,
};
