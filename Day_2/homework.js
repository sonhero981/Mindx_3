const { rejects } = require('assert');
const { time } = require('console');
const fs = require('fs');
const { writeFile } = require('fs/promises');
const { resolve } = require('path');

// let data = ' 1 8 5 7 2'

// fs.writeFile('text.txt', data, (err) => {
//     if(err){
//         console.log(err)
//     } else {
//         console.log('File written successfully')
//     }
// })



//EX2

// data là một object

// const writeFile = (path, data) => {
//     // Hoàn thiện hàm
//     return new Promise((resolve, rejects) => {
//         fs.writeFile(path, JSON.stringify(data), {encoding: 'utf-8'} ,(err) => {
//             if(err) {
//                 return rejects(err = 'lỗi')
//             }
//             resolve(true)
//         })
//     })
//   }
  

//   const writeFileToDisk = async (path, data) => {
//     try {
//       const isSuccess = await writeFile(path, data);
//       console.log(isSuccess) // true
//     } catch (err) {
//       console.log(err) // 'Lỗi'
//     }
//   }

//   const name = {name: 'nguyen hung son'}

//   writeFileToDisk('name.txt', name)

// EX3


const readAndWrite = (readfile, writefile) => {
    fs 
    .promises
    .readFile(readfile, {encoding:'utf-8'})
    .then(data => numberOfOdd(data))
    .catch(err => console.log(err))

    const numberOfOdd = async (data) => {
        const dataOdd = [...data].filter(x => x % 2 != 0)
        await writeFile(writefile, `${dataOdd.length}`)
     }  

}

readAndWrite('text.txt', 'result.txt')





// Ex4

async function wait(time) {
 return new Promise((resolve) => {
     return setTimeout(resolve, time)
 })
}

async function go() {
  console.log('Starting');
  await wait(2000);
  console.log('running');
  await wait(200);
  console.log('ending');
}

go()
