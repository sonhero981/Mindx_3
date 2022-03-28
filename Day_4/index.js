const express = require('express');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: String,
  createdBy: {
    type: String,
    required: true
  },
});

const PostModel = mongoose.model('Post', postSchema);

mongoose.connect('mongodb://localhost:27017/demo_db', err => {
  if (err) {
    return console.log('Err connect mongodb', err)
  }

  console.log('Connect DB successfully')
});

const app = express();

app.use(express.json());

const CommentSchema = new mongoose.Schema({
  content: String,
  author: {
    type:String,
    required:true
  },
  postId:{
    type:String,
    required:true
  }
})

const CommentModal = mongoose.model('Comment', CommentSchema)


// POST comment
app.post('/api/comments', async(req, res) => {
  try {
    const {content, author, postId} = req.body
    const newComment = await CommentModal.create({
      content,
      author,
      postId
    })
    res.send({success: 1, data: newComment})
  } catch(err) {
    res.send({success: 0, data: err})
  }
})

// GET comments

app.get('/api/comments', async(req, res) => {
  try {
    const AllComments = await CommentModal.find()
    res.send({success: 1, data: AllComments})
  } catch {
    res.send({success: 0, data: err})
  }
})

//GET comment by Id

app.get('/api/comments/:commentId', async(req, res) => {
  try {
    const {commentId} = req.params
    const foundComment = await CommentModal.findById(commentId)
    res.send({success: 1, data: foundComment})

  } catch(err) {
    res.send({success: 0, data: err})
  }
})

// UPDATE comment

app.put('/api/comments/:commentId', async(req, res) => {
  try {
    const {commentId} = req.params
    const {content} = req.body
    const updatedComment = await CommentModal.findByIdAndUpdate(commentId, {content} , {new: true})
    console.log(commentId, content)
    res.send({success: 1, data: updatedComment})

  } catch(err) {
    res.send({success: 0, data: err})
  }
})


// DELETE comment

app.delete('/api/comments/:commentId', async(req, res) => {
  try {
    const {commentId} = req.params
    await CommentModal.findByIdAndDelete(commentId)
    res.send({success:1})
    
  } catch (error) {
    res.send({success: 0, data: err})
  }
})

// GET comments by postId

app.get('/api/posts/:postId/comments', async(req, res) => {
  try {
    const {postId} = req.params
    const commentsOfPost = await CommentModal.find({postId: postId})
    res.send({success: 1, data: commentsOfPost})

  } catch(err) {
    res.send({success: 0, data: err})
  }
})

app.listen("8080", err => {
  if (err) return console.log("Err");
  console.log("success start localhost");
})
