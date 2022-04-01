const PostModel = require("./post")
const CommentModel = require("../comment/comment")

//GET POSTS
const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.send({ success: 1, data: posts });
  } catch (error) {
    res.status(400).send({ success: 0, data: [] });
  }
};

//GET POST BY ID
const getPost = async (req, res) => {
  try {
    const _id = req.params;
    console.log(_id)
    const foundPost = await PostModel.findById(_id);
    res.send({ success: 1, data: foundPost });
  } catch (error) {
    res.status(400).send({ success: 0, data: [] });
  }
};

// CREATE POST
const createPost = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const newPost = await PostModel.create({
      title,
      description,
      imageUrl,
      //createBy
    });
    res.send({ success: 1, data: newPost });
  } catch (error) {
    res.status(400).send({ success: 0, data: null });
  }
};

//UPDATE POST
const updatePost = async (req, res) => {
  try {
    const { _id } = req.params;
    const dataUpdatePost = req.body;
    console.log(dataUpdatePost)
    const updatedPost = await PostModel.findByIdAndUpdate(
      _id,
      dataUpdatePost,
      { new: true }
    );
    res.send({ success: 1, data: updatedPost });
  } catch (error) {
    res.status(400).send({ success: 0, data: null });
  }
};

//DELETE POST
const deletePost = async (req, res) => {
  try {
    const { _id } = req.params;
    await PostModel.findByIdAndDelete(_id);
    res.send({ success: 1 });
  } catch (error) {
    res.status(400).send({ success: 0, data: null });
  }
};

//GET COMMENTS BY POSTID
const getCommentsOfPost = async (req, res) => {
  try {
    const { post } = req.params;
    const commentsOfPost = await CommentModel.find({ post: post });
    console.log(post)
    res.send({ success: 1, data: commentsOfPost });
  } catch (error) {
    res.status(400).send({ success: 0, data: null });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getCommentsOfPost
};
