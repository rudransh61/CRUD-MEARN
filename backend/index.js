const express = require('express')
const path = require('path')
const app = express()
const port = 8888
const mongoose = require('mongoose')
const model = require('./model.js')



connectdb = async () => {

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/crud');
    console.log("Server connected to the DataBase !!")
  } catch (error) {
    handleError(error);
  }
}

connectdb();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})


app.get('/', (req, res) => {
  res.send('HELO HOM PAJE')
})

app.get('/list', async (req, res) => {
  // res.send('haalo')
  await Lists.find({ __v:0  }) 
    .then(data => { 
        // console.log("Database Courses:") 
        // console.log(data); 
        res.json({all:data})
    })
})

app.post('/add',async(req,res)=>{
  add = await Lists.create({
    heading:'abc',
    desc:'aaa'
  });
  console.log(add)

  res.json({note:add})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})