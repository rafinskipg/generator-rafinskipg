var express = require('express');
var compress = require('compression');
var app = express();


//var favicon = require('serve-favicon');
// app.use(favicon(config.root + '/public/img/favicon.ico'));

app.use(compress());
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/dist'));

app.listen(9000);