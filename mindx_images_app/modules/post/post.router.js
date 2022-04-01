const express = require('express')
const router = express.Router()
const postController = require('./post.controller')

//router tập hợp các API có điểm chung => cùng tiền tố '/api/posts'

router.get('/', postController.getPosts)
router.get("/:post/comments", postController.getCommentsOfPost)
router.get('/:_id', postController.getPost)
router.post('/', postController.createPost)
router.put('/:_id', postController.updatePost)
router.delete('/:_id', postController.deletePost)
module.exports = router