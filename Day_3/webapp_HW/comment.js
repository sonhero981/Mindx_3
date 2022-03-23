const fs = require("fs");

// Get Comments
const getComments = async () => {
  const commentsString = await fs.promises.readFile("comments.json", {
    encoding: "utf-8",
  });
  const comments = JSON.parse(commentsString);
  return comments;
};

// Get Comment
const getComment = async commentId => {
  const commentsString = await fs.promises.readFile("comments.json", {
    encoding: "utf-8",
  });
  const comments = JSON.parse(commentsString);
  const foundComment = comments.find(
    comment => String(comment.id) === commentId
  );
  return foundComment;
};

// Create Comment
const createComment = async ({ content, createBy, postId }) => {
  const oldCommentsStr = await fs.promises.readFile("comments.json", {
    encoding: "utf-8",
  });

  const oldComments = JSON.parse(oldCommentsStr);

  const newComment = {
    id: Date.now(),
    content,
    createBy,
    postId,
  };
  const newComments = [...oldComments, newComment];
  await fs.promises.writeFile("comments.json", JSON.stringify(newComments));
  return newComments;
};

// Update Comment
const updateComment = async ({ commentId, content }) => {
  const oldCommentsStr = await fs.promises.readFile("comments.json", {
    encoding: "utf-8",
  });
  const oldComments = JSON.parse(oldCommentsStr);
  const newComments = oldComments.map(comment => {
    if (String(comment.id) === commentId) {
      return {
        ...comment,
        content,
      };
    }
    return { ...comment };
  });
  await fs.promises.writeFile("comments.json", JSON.stringify(newComments));
  return newComments;
};

// Delete Comment

const deleteComment = async commentId => {
  const oldCommentStr = await fs.promises.readFile("posts.json", {
    encoding: "utf-8",
  });
  const oldComments = JSON.parse(oldCommentStr);
  const newComments = oldComments.filter(
    comment => String(comment.id) != commentId
  );
  await fs.promises.writeFile("comments.json", JSON.stringify(newComments));
  return newComments;
};

//Get comment of post

const getCommentOfPost = async postId => {
  const commentStr = await fs.promises.readFile("comments.json", {
    encoding: "utf-8",
  });
  const comments = JSON.parse(commentStr);
  const foundComment = comments.filter(
    comment => String(comment.postId) === postId
  );
  return foundComment;
};

module.exports = {
  createComment,
  getComment,
  getComments,
  updateComment,
  deleteComment,
  getCommentOfPost
};
