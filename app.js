require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./models");
const blog = require('./routes/blog');
const app = express();

const PORT = process.env.PORT || 8000;


// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

// DB Connection
db.sequelize.authenticate().then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
  
// to force sync during development use below
db.sequelize.sync()


// routes
app.use('/api/blog', blog)
  

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(PORT,()=>{
    console.log(`Hello Aayush, your server 🚀 is running on port ${PORT}...............`)
})