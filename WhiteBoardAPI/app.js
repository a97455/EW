var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

//MongoDB conection
var mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1/WhiteBoard'
mongoose.connect(mongoDB)
var db = mongoose.connection
db.on('error',console.error.bind(console,'Erro de conexão ao MongoDB'))
db.once('open', function(){
  console.log('Conexão ao MongoDB realizado com sucesso')
})

var ucRouter = require('./routes/uc');
var alunoRouter = require('./routes/aluno');
var docenteRouter = require('./routes/docente');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/ucs', ucRouter);
app.use('/alunos', alunoRouter);
app.use('/docentes', docenteRouter);

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
  res.jsonp(err.message);
});

module.exports = app;