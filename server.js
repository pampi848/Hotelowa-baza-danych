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

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
String.prototype.createClause = function () {
    return this.replaceAll('_',' ').capitalizeFirstLetter();
};

function fetchColumns(table, callback) {
    connection.query("DESCRIBE "+ table, function (err, row) {
        if (err) {
            console.error(err);
            return res.redirect(505, '/505');
        }
        callback(row);
    });
}

function clauseColumns(table) {
    row = fetchColumns(table, callback);
    var fields = [];
    for (var i = 0; i < row.length; i++) {
        fields[i] = row[i].Field.createClause();
    }
}

app.get('/', function (req, res){
    return res.render('home', { home_active: "active"});
});

app.get('/phpmyadmin', function (req, res) {
    console.log('Redirect to localhost/phpmyadmin')
    return res.redirect(303, 'http://localhost/phpmyadmin/');
});


// [Forms]
var service = {
    formName: 'service',
    services_active: 'active',
    fields: [
        {id: 'fieldName', displayed: 'Name', type: 'text', name: 'name'},
        {id: 'fieldPrice', displayed: 'Price', type: 'number', name: 'price', step: 0.1}
    ],
    textarea: [
        {id: 'fieldDescription', displayed: 'Description',  name: 'description'}
        ]
};
var reservation = {
    formName: 'reservation',
    reservations_active: 'active',
    fields: [
        {id: 'fieldClientId', displayed: 'Client id', type: 'number', name: 'id_client'},
        {id: 'fieldRoomId', displayed: 'Room id', type: 'number', name: 'id_room'},
        {id: 'fieldDateFrom', displayed: 'From', type: 'date', name: 'date_from'},
        {id: 'fieldDateTo', displayed: 'To', type: 'date', name: 'date_to'}
    ]
};
var room = {
    formName: 'room',
    rooms_active: 'active',
    fields: [
        {id: 'fieldNumber', displayed: 'Number of room', type: 'number', name: 'number'},
        {id: 'fieldCountOfPeople', displayed: 'Count of people', type: 'number', name: 'count_of_people'},
        {id: 'fieldType', displayed: 'Type', type: 'text', name: 'type'},
        {id: 'fieldPrice', displayed: 'Price', type: 'number', name: 'price', step: 0.1}
    ],
    textarea: [
        {id: 'fieldDescription', displayed: 'Description',  name: 'description'}
    ]
};
var client = {
    formName: 'client',
    clients_active: 'active',
    fields: [
        {id: 'fieldName', displayed: 'Name', type: 'text', name: 'name'},
        {id: 'fieldLastName', displayed: 'Last Name', type: 'text', name: 'last_name'},
        {id: 'fieldPESEL', displayed: 'PESEL', type: 'number', name: 'pesel'},
        {id: 'fieldCity', displayed: 'City', type: 'text', name: 'city'},
        {id: 'fieldPostCode', displayed: 'Post code', type: 'text', name: 'post_code'},
        {id: 'fieldStreet', displayed: 'Street', type: 'text', name: 'street'},
        {id: 'fieldHome', displayed: 'Home', type: 'number', name: 'home'},
        {id: 'fieldFlat', displayed: 'Flat', type: 'number', name: 'flat'},
        {id: 'fieldEmail', displayed: 'Email', type: 'email', name: 'email'},
        {id: 'fieldBirthday', displayed: 'Birthday', type: 'date', name: 'birthday'},
        {id: 'fieldPhone', displayed: 'Phone', type: 'number', name: 'phone'},
        {id: 'fieldPhoto', displayed: 'Photo', type: 'file', name: 'photo', accept: "image/*" }
    ]
};


app.get('/list/:list',function (req, res){
    var table = '';
    switch (req.params.list){
        case 'reservation':
            table = 'reservations';
            break;
        case 'service':
            table = 'services';
            break;
        case 'room':
            table = 'rooms';
            break;
        case 'client':
            table = 'clients';
            break;
        default:
            next();
            break;
    }
    connection.query("DESCRIBE "+table,function (err, row) {
        if (err) {
            console.error(err);
            return res.redirect(505, '/505');
        }
        var fields = [];
        for (var i = 0; i< row.length; i++){
            fields[i] = row[i].Field.createClause();
        }
        connection.query('SELECT * FROM `'+table+'`',function (err, result) {
            if (err) {
                console.error(err);
                return res.redirect(505, '/505');
            }
            var options = {
                list_active: 'active',
                item: 'list',
                thead: fields,
                list: result
            };
            if (req.query.messages) options.messages = req.query.messages;
            if (req.query.alertType) options.alertType = req.query.alertType;
            return res.render('list', options);
        });
    });
});
// [/Forms]

app.get('/add/:form', function (req, res) {
    var options = {};
    switch (req.params.form){
        case 'reservation':
            options = reservation;
            break;
        case 'service':
            options = service;
            break;
        case 'room':
            options = room;
            break;
        case 'client':
        options = client;
        break;
        default:
            next();
            break;
    }
    if(req.query.messages) options.messages = req.query.messages;
    if(req.query.alertType) options.alertType = req.query.alertType;
    return res.render('add', options);
});

app.post('/clientAdd', upload.single('photo'), function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, file) {
        if(err) return next();

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


app.post('/add/:form', function (req, res) {
    var table = '';
    switch (req.params.form){
        case 'reservation':
            table = 'reservations';
            break;
        case 'service':
            table = 'services';
            break;
        case 'room':
            table = 'rooms';
            break;
        case 'client':
            table = 'clients';
            break;
        default:
            next();
            break;
    }
    var messages = validAdd(req.body, clauseColumns(table, function (err, columns) {
        if(err){
            console.log(err);
            next();
        }
    })
    );

    // var created = new Date;
    // console.log('Created : ' + created);
    // req.body.created = created;
    //
    // if(messages === false) return res.redirect(303, '/error');
    //
    // if(messages == '') {
    //     messages = 'messages[]=Pomyślnie dodano usługę!&alertType=alert-success';
    //     var location = '/servicesList/?';
    // }
    // else {
    //     messages += 'alertType=alert-danger';
    //     var location = '/serviceAdd/?';
    // }
    //
    // var sqlquery = connection.query('INSERT INTO `services` SET ?', req.body, function (err, result) {
    //     if(err){
    //         console.error(err);
    //         return res.redirect(505,'/505');
    //     }
    // });
    //
    // return res.redirect(303, location + messages);
});
function validAdd(form, row){
console.log(form, row);
    // if(typeof(object) != 'object') return false;
    //
    // for(var foo in object){
    //     if((foo != 'name') && (foo != 'price') && (foo != 'description')) return false;
    // }
    //
    // var messages = '';
    // messages += (typeof(object.name) === 'string') ? '' : 'messages[]=Nazwa musi być tekstem!&';
    // messages += (typeof(object.price) === 'number') ? '' : 'messages[]=Cena osób musi być liczbą!&';
    // messages += (typeof(object.description) === 'string') ? '' : 'messages[]=Opis musi być tekstem!&';
    //
    // return messages;
}

//

app.use(function (req, res) {
    res.type('text/html');
    res.status(404);
    res.render('404');
    console.log('Response : 404');
});

app.use('/500', function (err, req, res) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function () {
    console.log('Express started at 127.0.0.1:' + app.get('port'));
});