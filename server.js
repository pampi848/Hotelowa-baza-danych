var express = require('express');
var path = require('path');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var app = express();

app.disable('x-powered-by');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/public')));

app.use(function (req, res, next) {
    console.log("Looking for URL : " + req.url);
    next();
});

app.get('/', function (req, res){
    return res.render('home');
});

app.get('/about', function (req, res){
    return res.render('about');
});

app.get('/rooms', function (req, res){
    return res.render('roomList');
});

app.post('/rooms', function (req, res) {
    console.log(req.body.login);
    return res.render('roomList');
});

//
app.get('/junk', function () {
    console.log('Tried to access /junk');
    throw new Error('/junk doesn\'t exist');
});

app.use(function (err, req, res, next) {
    console.log('Error : ' + err.message);
    next();
});
//

app.use(function (req, res) {
    res.type('text/html');
    res.status(404);
    res.render('404');
    console.log('Response : 404');
});

app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function () {
    console.log('Express started at 127.0.0.1:' + app.get('port'));
});