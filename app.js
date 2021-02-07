var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require(cors);
var mysql = require('mysql');
var dbSchema = require('./database/schema');

var sellerRouter = require('./routes/product');
var productRouter = require('./routes/seller');

var app = express();

// view engine setup
var connection = mysql.createConnection('mysql://c3w4zxz9nmf4qcxb:hrhvjyuywjtpaecy@jhdjjtqo9w5bzq2t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/hkw8szsqs74f1gnz'); 

connection.connect((success, error)=>{
	if(error){}
})

connection.query(dbSchema, function(err, result){
  if(error){ console.log(err); }
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', productRouter(connection));
app.use('/seller', sellerRouter(connection));

// catch 404 and forward to error handler


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
