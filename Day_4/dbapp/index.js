const express = require('express')
const mongoose = require('mongoose')
const PostShema = new mongoose.Schema({
    content: String,
    createBy: {
        type:String, 
        required:true
    },
})

const PostModal = mongoose.model('Post', PostShema )

const app = express()
app.use(express.json)

mongoose.connect('mongodb://localhost:27017/test', err => {
    if(err) {
        console.log(err)
    }
    console.log('Connect DB Successfully')
})

app.post('/api/posts', async(req, res) => {
    const {content, createBy} = req.body
    const newPost = await PostModal.create({
        content,
        createBy
    })
})

app.listen(8000, err => {
    if(err) {
        console.log(err)
    }
    console.log('server start')
})

