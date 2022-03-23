const fs = require("fs");

//Create post
const createPost = async ({ content, createBy }) => {
  const oldPostsStr = await fs.promises.readFile("posts.json", {
    encoding: "utf-8",
  });

  const oldPosts = JSON.parse(oldPostsStr);
  const newPost = {
    id: Date.now(),
    content,
    createBy,
  };

  const newPosts = [...oldPosts, newPost];

  await fs.promises.writeFile("posts.json", JSON.stringify(newPosts));
};

// Get posts

const getPosts = async () => {
  const oldPostStr = await fs.promises.readFile("posts.json", {
    encoding: "utf-8",
  });

  const oldPosts = JSON.parse(oldPostStr);
  return oldPosts;
};

// Get post

const getPost = async postId => {
  const oldPostStr = await fs.promises.readFile("posts.json", {
    encoding: "utf-8",
  });
  const oldPost = JSON.parse(oldPostStr);
  const foundPost = oldPost.find(post => String(post.id) === postId);
  return foundPost;
};

// Update post

const updatePost = async ({ content, postId }) => {
  const oldPostStr = await fs.promises.readFile("posts.json", {
    encoding: "utf-8",
  });
  const oldPosts = JSON.parse(oldPostStr);
  const newPosts = oldPosts.map(post => {
    if (String(post.id) === postId) {
      return {
        ...post,
        content,
      };
    }
    return post;
  });

  await fs.promises.writeFile("posts.json", JSON.stringify(newPosts));
  return newPosts;
};

//Delete post

const deletePost = async postId => {
  const oldPostStr = await fs.promises.readFile("posts.json", {
    encoding: "utf-8",
  });
  const oldPosts = JSON.parse(oldPostStr);
  const newPosts = oldPosts.filter(post => String(post.id) != postId);
  await fs.promises.writeFile("posts.json", JSON.stringify(newPosts));
  return newPosts;
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  getPost,
  deletePost,
};
