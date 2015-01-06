var express = require('express');
var compress = require('compression');
var app = express();


//var favicon = require('serve-favicon');
// app.use(favicon(config.root + '/public/img/favicon.ico'));

app.use(compress());
app.use(express.static('/dist'));

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(9000);