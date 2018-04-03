var express = require('express');
var app = express();
var path = require('path');
var route = require('./routes/routes.js')

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', route);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
