/* jshint node:true */
'use strict';

// var mongoose = require('mongoose');
var express = require('express');
var PORT = process.env.PORT || 8000;

var app = express();
app.use(express.static('public', {index: ['index.html']}));

app.listen(PORT, function () {
	console.log('Listening on ' + PORT);
});
