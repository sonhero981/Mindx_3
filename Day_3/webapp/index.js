const express = require('express')
const app = express()
const random = require('./random')


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use(express.static('public'))
app.use(express.json())

//với mỗi đường dẫn => mò vào thư mục public => tìm file xem có tồn tại hay không


app.get('/hi', (req, res) => {
    res.send('Greeting')

    // req chứa toàn bộ thông tin của người gửi 
    // res chứa thông ti trả về
})

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home.html')
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css')
})


// query string 
// random 
app.get('/random', (req, res) => {
    res.json(random(0,200))
})

app.post('/sum', (req, res) => {
    const {numbers} = req.body;
    const sum = numbers.reduce((acc, cur) => acc + cur, 0);
    res.send({sum}); 
})

app.listen(8080, err => {
    if(err){
        return console.log(err)
    }

    console.log('server stated')
})

