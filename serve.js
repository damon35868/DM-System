const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const passport = require('passport');
 
 
//database connect
mongoose.connect('mongodb://localhost:27017/dmdata', {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false}).then(()=> console.log('database is connected'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require("./config/passport")(passport);
//passport 初始化后才能正常使用
app.use(passport.initialize());

//api
require("./api")(app);

app.listen(8888,()=> console.log('the server is running'));
