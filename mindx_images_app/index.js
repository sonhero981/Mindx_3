const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require("mongoose")
const postRouter = require("./modules/post/post.router")
const commentRouter = require('./modules/comment/comment.router')

mongoose.connect('mongodb://localhost:27017/mindx-images-web57', err => {
    if(err)console.log("DB connect err", err)
    console.log("DB connect successfully" )
})

// Tất cả HTTP request nào có tiền tố là /api/posts => thì đi vào postRouter
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use('*', (req, res) => {
    res.send({message: '404 not found'})
})

app.listen(8080, err => {
    if(err) console.log('Server error', err)
    console.log('Server started')
})

