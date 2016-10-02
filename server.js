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
    database: 'hotelowa-baza-danych'
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
    console.log(req.body);
    console.log('Form : ' + req.query.form);
    console.log('CSRF token : ' + req.body._csrf);
    console.log('Email : ' + req.body.email);
    console.log('Question : ' + req.body.ques);
    return res.redirect(303, '/thankyou');
});

app.get('/clientAdd', function (req, res) {
    var now = new Date();
    var options = {
        year: now.getFullYear(),
        month: now.getMonth(),
        clientAdd_active: 'active'
    };
    if(req.query.messages) options.messages = req.query.messages;
    return res.render('clientAdd', options);
});

app.post('/clientAdd/:year/:month', function (req, res) {
    var form = new formidable.IncomingForm();

    console.log('Form : ' + req.query.form);
    console.log('Name : ' + req.body.name);
    console.log('Last Name : ' + req.body.lastName);
    console.log('City : ' + req.body.city);
    console.log('Post Code : ' + req.body.postCode);
    console.log('Street : ' + req.body.street);
    console.log('Home : ' + req.body.home);
    console.log('Flat : ' + req.body.flat);
    console.log('Email : ' + req.body.email);
    console.log('Birthday : ' + req.body.birthday);
    console.log('Phone : ' + req.body.phone);
    console.log('PESEL : ' + req.body.pesel);
    console.log('Photo name : ' + req.body.photo);

    form.parse(req, function (err, fields, file) {
        if(err) return res.redirect(404, '/error');

        console.log('Received File');
        console.log(file);
    });


    req.body.birthday = new Date(req.body.birthday);
    req.body.pesel = parseInt(req.body.pesel);
    req.body.home = parseInt(req.body.home);
    req.body.flat = parseInt(req.body.flat);

    if(validClientAdd(req.body) === false) return res.redirect(303, '/error');

    var query = connection.query('INSERT INTO klient SET ?', req.body, function (err, result) {
        if(err){
            console.error(err);
            return;
        }
        console.error(result);
    });

    var messages = validClientAdd(req.body);
    res.redirect(303, '/clientAdd/?'+messages);
});

function validClientAdd(object){
    if(typeof(object) != 'object') return false;

    for(var foo in object){
        if((foo != 'name') && (foo != 'pesel') && (foo != 'lastName') && (foo != 'city') && (foo != 'postCode') && (foo != 'street') && (foo != 'home') && (foo != 'flat') && (foo != 'email') && (foo != 'birthday') && (foo != 'phone') && (foo != 'photo')) return false;
    }

    var messages = '';
    console.log( String(object.home).length >= 0);
    messages += (typeof(object.name) === 'string' && object.name.length >= 3) ? '' : 'messages[]=Imię powinno zawierać minimum 3 znaki!&';
    messages += (typeof(object.lastName) === 'string' && object.lastName.length >= 3) ? '' : 'messages[]=Nazwisko powinno zawierać minimum 3 znaki!&';
    messages += (typeof(object.pesel) === 'number' && String(object.pesel).length== 11) ? '' : 'messages[]=Pesel pwinien mieć równo 11 znaków!&';
    messages += (typeof(object.postCode) === 'string' && object.postCode.length == 6) ? '' : 'messages[]=Kod pocztowy powinien zawierać 6 znaków!&';
    messages += (typeof(object.street) === 'string' && object.street.length >= 3) ? '' : 'messages[]=Ulica powinna zawierać minimum 3 znaki!&';
    messages += (typeof(object.home) === 'number' && object.home >= 0) ? '' : 'messages[]=Numer domu nie może być mniejszy od 0!&';
    messages += (typeof object.birthday.getMonth === 'function') ? '' : 'messages[]=Podane urodziny nie są datą!&';

    return messages;
}

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