const express = require('express');
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const items= require('./routes/api/items')
const path = require('path')

const app = express()

//Bodyparser Middleware

app.use(bodyParser.json());

//Db config
const db = require('./config/keys').mongoURL

//connect to mongo
mongoose.connect(db)
.then(()=>console.log('Mongodb connected..'))
.catch(err=>console.log(err))

// routes
app.use('/api/items', items)

//Serve static assets if in production
if(process.env.NODE_ENV==='production'){
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*' , (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server is running in ${PORT}`)
})

//