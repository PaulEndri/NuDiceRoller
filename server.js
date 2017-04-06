var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./src/etc/mongoDB');
var port = process.env.PORT || 8080;

db.connect();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require('./src/routes')(app); // configure our routes


app.listen(port);

console.log('Am I doing This Right?');

exports = module.exports = app;              