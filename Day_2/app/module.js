// require để kết nối module trong JS (cụ thể node JS) => commonJS
//import export default => ES6 Module

const { rejects } = require('assert');
const fs  = require('fs');
const { resolve } = require('path');

fs.readFile('text.txt', {encoding: 'utf-8'}, (err,data) => {
    if(err){
        console.log(err);
    } else {
        console.log(data);
    }
})


fs 
    .promises
    .readFile('text.txt', {encoding:'utf-2'})
    .then(data => console.log(data))
    .catch(err => console.log(err))


const readFile = (path,encoding) => {
    return new Promise((resolve, rejects) => {
        fs.readFile(path, encoding,(err, data) => {
            if(err) {
                return rejects(err)
            }
            resolve(data)
        })
    }) 
}

readFile('text.txt')
.then(data => console.log(data))
.then(data => {return readFile(text2.txt)})

const readAllFile = async() => {
    const data = await readFile('text.txt')
    console.log(data)
}


