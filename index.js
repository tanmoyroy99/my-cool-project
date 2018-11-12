require('express-async-errors');
const winston = require('winston');
const error = require('./middleware/error');
var express = require("express");
var app = express();
const genres = require('./routes/genres');
const users = require('./routes/users');
const auth = require('./routes/auth');
const day2day = require('./routes/day2day');
//const dbconnection = require('./models/dbconnection');
const mongoose = require('mongoose');

process.on('uncaughtException', (ex) => {
	winston.error(ex.message, ex);
});

winston.add(winston.transports.File, { filename: 'logfile.log' }); 



mongoose.connect('mongodb://tanmoy:tanmoy@127.0.0.1:27017/dressbook')
.then(()=> {console.log('DB connected...');
	next();
})
.catch(err=> {
	console.error(err);
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use('/api/genres',  genres);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/day2day', day2day);
app.use(error);



app.listen(8080,function(){
    console.log('Express app start on port.. 8080')
});
