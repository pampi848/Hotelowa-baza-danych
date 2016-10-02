var express = require('express');
var path = require('path');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var formidable = require('formidable');
var credentials = require('./credentials');
var session = require('express-session');
var parseurl = require('parseurl');
var fs = require('fs');
var mysql = require('mysql');

var app = express();

// Database Connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Hotelowa-baza-danych'
});
connection.connect(function (err) {
    if(err) return console.error(err);
});
// End of Database Connection

app.disable('x-powered-by');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/public')));

app.use(function (req, res, next) {
    console.log("Looking for URL : " + req.url);
    next();
});

app.use(require('body-parser').urlencoded({
    extended: true
}));

app.use(require('cookie-parser')(credentials.cookieSecret));

app.get('/', function (req, res){
    return res.render('home', { home_active: "active"});
});

app.get('/about', function (req, res){
    return res.render('about', { about_active: 'active'});
});

app.get('/rooms', function (req, res){
    return res.render('roomList', { list_active: 'active'});
});

app.get('/contact', function (req, res) {
    return res.render('contact', { csrf: 'CSRF token here', contact_active: 'active'});
});

app.get('/thankyou', function (req, res) {
    return res.render('thankyou');
});

app.get('/phpmyadmin', function (req, res) {
    console.log('Redirect to localhost/phpmyadmin')
    return res.redirect(303, 'http://localhost/phpmyadmin/');
});

app.post('/process', function (req, res){
    console.log('Form : ' + req.query.form);
    console.log('CSRF token : ' + req.body._csrf);
    console.log('Email : ' + req.body.email);
    console.log('Question : ' + req.body.ques);
    return res.redirect(303, '/thankyou');
});

app.get('/clientAdd', function (req, res) {
   var now = new Date();
    res.render('clientAdd', {
        year: now.getFullYear(),
        month: now.getMonth(),
        clientAdd_active: 'active'
    });
});

app.post('/clientAdd/:year/:month', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, file) {
        if(err) return res.redirect(303, '/error');
        console.log('Received File');
        console.log(file);
        res.redirect(303, '/thankyou');
    });
});
//
// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: credentials.cookieSecret
// }));
//
// app.use(function (req, res, next) {
//     var views = req.session.views;
//
//     if(!views){
//         views = req.session.views = {};
//     }
//     var pathname = parseurl(req).pathname;
//     views[pathname] = (views[pathname] || 0) +1;
//
//     next();
// });
//
// app.get('/viewcount', function (req, res, next) {
//     res.send('You viewed this page ' + req.session.views['/viewcount'] + ' times');
// });
//
// app.get('/junk', function () {
//     console.log('Tried to access /junk');
//     throw new Error('/junk doesn\'t exist');
// });

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