require('express-async-errors');
require('dotenv').config();
const winston = require('winston');
const error = require('./middleware/error');
var express = require("express");
var app = express();
const cors = require('cors');
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

const db_user     = process.env.MONGO_DB_USER;
const db_password = process.env.MONGO_DB_PASSWORD;
const db_name     = process.env.MONGO_DB;
const db_host     = process.env.MONGO_DB_HOST;
// lkW70PMatMHFmK7e
// mongoose.connect('mongodb://tanmoy:tanmoy@127.0.0.1:27017/dressbook')
console.log('>>>>>>>',`mongodb+srv://${db_user}:${db_password}@${db_host}/${db_name}?retryWrites=true&w=majority`)
mongoose.connect(`mongodb+srv://${db_user}:${db_password}@${db_host}/${db_name}?retryWrites=true&w=majority`)
.then(()=> {console.log('DB connected...');
	// next();
})
.catch(err=> {
	console.error("DB Connection ERROR>>> ", err);
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());

app.use(express.json());
app.use('/api/genres',  genres);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/day2day', day2day);
app.use(error);

const PORT = process.env.PORT || 8080;

app.listen(PORT,function(){
    console.log('Express app start on port.. 8080')
});
