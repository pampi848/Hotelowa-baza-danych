var express = require('express');
var path = require('path');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var formidable = require('formidable');
var credentials = require('./credentials');
var session = require('express-session');
var parseurl = require('parseurl');
var fs = require('fs');
var mysql = require('mysql');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var app = express();

// Database Connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hotelowa-baza-danych'
});
connection.connect(function (err) {
    if(err) {
        if(err.code == 'ECONNREFUSED') console.error('Nieudana próba połączenia z bazą danych.');
        return console.error(err);
    }
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

app.get('/clientsList',function (req, res){
    var sqlquery = connection.query('SELECT * FROM `clients`',function (err, result) {
        if(err){
            console.error(err);
            return res.redirect(505,'/505');
        }
        var options = {
            clientList_active: 'active',
            clients: result
        };
        if(req.query.messages) options.messages = req.query.messages;
        if(req.query.alertType) options.alertType = req.query.alertType;
        return res.render('clientsList', options);
    });
});
app.get('/roomsList',function (req, res){
    var sqlquery = connection.query('SELECT * FROM `rooms`',function (err, result) {
        if(err){
            console.error(err);
            return res.redirect(505,'/505');
        }
        var options = {
            roomsList_active: 'active',
            rooms: result
        };
        if(req.query.messages) options.messages = req.query.messages;
        if(req.query.alertType) options.alertType = req.query.alertType;
        return res.render('roomsList', options);
    });
});
app.get('/servicesList',function (req, res){
    var sqlquery = connection.query('SELECT * FROM `services`',function (err, result) {
        if(err){
            console.error(err);
            return res.redirect(505,'/505');
        }
        var options = {
            servicesList_active: 'active',
            services: result
        };
        if(req.query.messages) options.messages = req.query.messages;
        if(req.query.alertType) options.alertType = req.query.alertType;
        return res.render('servicesList', options);
    });
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
    var options = {
        clientAdd_active: 'active'
    };
    if(req.query.messages) options.messages = req.query.messages;
    if(req.query.alertType) options.alertType = req.query.alertType;
    return res.render('clientAdd', options);
});

app.get('/roomAdd', function (req, res) {
    var options = {
        roomAdd_active: 'active'
    };
    if(req.query.messages) options.messages = req.query.messages;
    if(req.query.alertType) options.alertType = req.query.alertType;
    return res.render('roomAdd', { roomAdd_active: 'active'});
});
app.get('/serviceAdd', function (req, res) {
    var options = {
        serviceAdd_active: 'active'
    };
    if(req.query.messages) options.messages = req.query.messages;
    if(req.query.alertType) options.alertType = req.query.alertType;
    return res.render('serviceAdd', { serviceAdd_active: 'active'});
});
app.get('/reservationAdd', function (req, res) {
    var options = {
        reservationAdd_active: 'active'
    };
    if(req.query.messages) options.messages = req.query.messages;
    if(req.query.alertType) options.alertType = req.query.alertType;
    return res.render('reservationAdd', { reservationAdd_active: 'active'});
});
app.get('/add/:form', function (req, res) {
    console.log(req.params.form);
    var options = {
        reservationAdd_active: 'active',
        fields: [
            {id: 'fieldClientId', displayed: 'Client id', type: 'number', name: 'idClient'},
            {id: 'fieldRoomId', displayed: 'Room id', type: 'number', name: 'idRoom'},
            {id: 'fieldDateFrom', displayed: 'From', type: 'date', name: 'dateFrom'},
            {id: 'fieldDateTo', displayed: 'To', type: 'date', name: 'dateTo'}
        ]
    };
    if(req.query.messages) options.messages = req.query.messages;
    if(req.query.alertType) options.alertType = req.query.alertType;
    return res.render('add', options);
});

app.post('/clientAdd', upload.single('photo'), function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, file) {
        if(err) return res.redirect(404, '/error');

        console.log('Received File');
        console.log(file);
    });

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
    var created = new Date;
    console.log('Created : ' + created);
    req.body.created = created;

    req.body.birthday = new Date(req.body.birthday);
    req.body.home = parseInt(req.body.home);
    if(req.body.flat != '')req.body.flat = parseInt(req.body.flat);


    var messages = validClientAdd(req.body);
    if(messages === false) return res.redirect(303, '/error');

    console.log("file "+req.files);

    if(messages == '') {
        messages = 'messages[]=Pomyślnie dodano klienta!&alertType=alert-success';
        var location = '/clientsList/?';
    }
    else {
        messages += 'alertType=alert-danger';
        var location = '/clientAdd/?';
    }

    var sqlquery = connection.query('INSERT INTO `clients` SET ?', req.body, function (err, result) {
        if(err){
            console.error(err);
            return res.redirect(505,'/505');
        }
    });

    return res.redirect(303, location + messages);
});

function validClientAdd(object){
    if(typeof(object) != 'object') return false;

    for(var foo in object){
        if((foo != 'name') && (foo != 'pesel') && (foo != 'lastName') && (foo != 'city') && (foo != 'postCode') && (foo != 'street') && (foo != 'home') && (foo != 'flat') && (foo != 'email') && (foo != 'birthday') && (foo != 'phone') && (foo != 'photo') && (foo != 'created')) return false;
    }

    var messages = '';
    messages += (typeof(object.name) === 'string' && object.name.length >= 3) ? '' : 'messages[]=Imię powinno zawierać minimum 3 znaki!&';
    messages += (typeof(object.lastName) === 'string' && object.lastName.length >= 3) ? '' : 'messages[]=Nazwisko powinno zawierać minimum 3 znaki!&';
    messages += (typeof(object.pesel) === 'string' && String(object.pesel).length== 11) ? '' : 'messages[]=Pesel powinien mieć równo 11 znaków!&';
    messages += (typeof(object.postCode) === 'string' && object.postCode.length == 6) ? '' : 'messages[]=Kod pocztowy powinien zawierać 6 znaków!&';
    messages += (typeof(object.street) === 'string' && object.street.length >= 3) ? '' : 'messages[]=Ulica powinna zawierać minimum 3 znaki!&';
    messages += (typeof(object.home) === 'number' && object.home >= 0) ? '' : 'messages[]=Numer domu nie może być mniejszy od 0!&';
    messages += (typeof object.birthday.getMonth === 'function') ? '' : 'messages[]=Podane urodziny nie są datą!&';
    console.log(object);
    if(typeof(object.photo) == 'string') {
        var arrayPhoto = object.photo.split('.');
        messages += (arrayPhoto[(arrayPhoto.length - 1)] == 'jpg' || arrayPhoto[(arrayPhoto.length - 1)] == 'JPEG' || arrayPhoto[(arrayPhoto.length - 1)] == 'png') ? '' : '&messages[]=Przyjmujemy tylko pliki z rozszerzeniem *.jpg oraz *.png!';
    }
        return messages;
}
app.post('/roomAdd', function (req, res) {

    console.log('Form : ' + req.query.form);
    console.log('Number : ' + req.body.number);
    console.log('Count of People : ' + req.body.countOfPeople);
    console.log('Type : ' + req.body.type);
    console.log('Price/day : ' + req.body.price);
    console.log('Description : ' + req.body.description);

    req.body.number = parseInt(req.body.number);
    req.body.countOfPeople = parseInt(req.body.countOfPeople);
    req.body.price = parseFloat(req.body.price);

    var messages = validRoomAdd(req.body);

    var created = new Date;
    console.log('Created : ' + created);
    req.body.created = created;

    if(messages === false) return res.redirect(303, '/error');


    if(messages == '') {
        messages = 'messages[]=Pomyślnie dodano pokój!&alertType=alert-success';
        var location = '/roomsList/?';
    }
    else {
        messages += 'alertType=alert-danger';
        var location = '/roomAdd/?';
    }

    var sqlquery = connection.query('INSERT INTO `rooms` SET ?', req.body, function (err, result) {
        if(err){
            console.error(err);
            return res.redirect(505,'/505');
        }
    });

    return res.redirect(303, location + messages);
});

function validRoomAdd(object){
    if(typeof(object) != 'object') return false;

    for(var foo in object){
        if((foo != 'number') && (foo != 'countOfPeople') && (foo != 'type') && (foo != 'price') && (foo != 'description')) return false;
    }

    var messages = '';
    messages += (typeof(object.number) === 'number') ? '' : 'messages[]=Number musi być liczbą!&';
    messages += (typeof(object.countOfPeople) === 'number') ? '' : 'messages[]=Liczba osób musi być tekstem!&';
    messages += (typeof(object.type) === 'string') ? '' : 'messages[]=Typ musi być tekstem!&';
    messages += (typeof(object.price) === 'number') ? '' : 'messages[]=Cena musi być liczbą!&';
    messages += (typeof(object.description) === 'string') ? '' : 'messages[]=Opis musi być tekstem!&';

    return messages;
}
app.post('/serviceAdd', function (req, res) {

    console.log('Form : ' + req.query.form);
    console.log('Name : ' + req.body.name);
    console.log('Price : ' + req.body.price);
    console.log('Description : ' + req.body.description);

    req.body.price = parseInt(req.body.price);

    var messages = validServiceAdd(req.body);

    var created = new Date;
    console.log('Created : ' + created);
    req.body.created = created;

    if(messages === false) return res.redirect(303, '/error');

    if(messages == '') {
        messages = 'messages[]=Pomyślnie dodano usługę!&alertType=alert-success';
        var location = '/servicesList/?';
    }
    else {
        messages += 'alertType=alert-danger';
        var location = '/serviceAdd/?';
    }

    var sqlquery = connection.query('INSERT INTO `services` SET ?', req.body, function (err, result) {
        if(err){
            console.error(err);
            return res.redirect(505,'/505');
        }
    });

    return res.redirect(303, location + messages);
});

function validServiceAdd(object){
    if(typeof(object) != 'object') return false;

    for(var foo in object){
        if((foo != 'name') && (foo != 'price') && (foo != 'description')) return false;
    }

    var messages = '';
    messages += (typeof(object.name) === 'string') ? '' : 'messages[]=Nazwa musi być tekstem!&';
    messages += (typeof(object.price) === 'number') ? '' : 'messages[]=Cena osób musi być liczbą!&';
    messages += (typeof(object.description) === 'string') ? '' : 'messages[]=Opis musi być tekstem!&';

    return messages;
}
app.post('/reservationAdd', function (req, res) {

    console.log('Client Id : ' + req.query.idClient);
    console.log('Room Id : ' + req.query.idRoom);
    console.log('Date From : ' + req.query.dateFrom);
    console.log('Date To : ' + req.body.dateTo);
    console.log('Paid : ' + req.body.paid);

    req.body.price = parseInt(req.body.price);

    var messages = validReservationAdd(req.body);

    var created = new Date;
    console.log('Created : ' + created);
    req.body.created = created;

    if(messages === false) return res.redirect(303, '/error');

    if(messages == '') {
        messages = 'messages[]=Pomyślnie dodano usługę!&alertType=alert-success';
        var location = '/servicesList/?';
    }
    else {
        messages += 'alertType=alert-danger';
        var location = '/serviceAdd/?';
    }

    var sqlquery = connection.query('INSERT INTO `services` SET ?', req.body, function (err, result) {
        if(err){
            console.error(err);
            return res.redirect(505,'/505');
        }
    });

    return res.redirect(303, location + messages);
});

function validReservationAdd(object){
    if(typeof(object) != 'object') return false;

    for(var foo in object){
        if((foo != 'name') && (foo != 'price') && (foo != 'description')) return false;
    }

    var messages = '';
    messages += (typeof(object.name) === 'string') ? '' : 'messages[]=Nazwa musi być tekstem!&';
    messages += (typeof(object.price) === 'number') ? '' : 'messages[]=Cena osób musi być liczbą!&';
    messages += (typeof(object.description) === 'string') ? '' : 'messages[]=Opis musi być tekstem!&';

    return messages;
}

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