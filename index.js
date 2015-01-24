var express = require('express');
var app = express();
var engines = require('consolidate');
var path = require('path');
var bodyParser = require('body-parser');
var dataUrl = require('dataurl');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', engines.handlebars);
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/upload', function(req, res) {
  var name = req.param('name');
  var dataObj = dataUrl.parse(req.param('src'));
  var url = ['http://', server.address().address, ':', server.address().port, '/uploads/', name].join('');

  fs.writeFile('public/uploads/' + name, dataObj.data, function(err) {
    err ? res.status(500).send(err) : res.send(url);
  });
});

var server = app.listen(3000);
