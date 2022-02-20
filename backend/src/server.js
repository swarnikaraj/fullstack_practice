const express=require('express');

const app=express()

app.use(express.json())
// const bodyParser = require('body-parser')
// app.use(
//     bodyParser.urlencoded({
//       extended: true,
//     })
//   );

const citycontroller=require('./controllers/city.controller')
const pollcontroller=require('./controllers/polling.controller')
const connect=require('./config/db')

app.use('/city',citycontroller)
app.use('/polling',pollcontroller)

const start=async()=>{
    await connect()
    app.listen(1234,()=>{
        console.log(" db is connected")
    })
}

module.exports=start