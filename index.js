const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

const juegos = require(__dirname + '/routes/juegos');
const publico = require(__dirname + '/routes/publico');


mongoose.connect('mongodb://mymongodb/playrest_v3', {useNewUrlParser: true}); 


let app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.set('view engine', 'njk');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));


app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/admin', juegos);
app.use('/', publico);

app.listen(8080);