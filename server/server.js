var express = require('express');
var path    = require('path');
var db      = require('./lib/db');

var app  = express();
var port = 3000;

app.use(function (res, req, next) {
  req.set('Access-Control-Allow-Origin', '*');
  req.set('Access-Control-Allow-Methods', '*');
  req.set('Access-Control-Allow-Headers', '*');

  if ('OPTIONS' == req.method) return res.send(200);

  next();
});

app.get('/photos', function (req, res) {
  var page     = parseInt(req.query.page)     || 0;
  var quantity = parseInt(req.query.quantity) || 100;

  var start = page == 1 ? 0 : (page - 1) * quantity + 1;
  var end   = page == 1 ? page * quantity : page * quantity + 1;

  var photos = db.slice(start, end).filter(function (photo) {
    if (photo) return photo;
  });

  if (!photos.length) return res.send(404);

  res.send(200, photos);
});

app.listen(port, function () {
  console.log('listening on port', port);
});
