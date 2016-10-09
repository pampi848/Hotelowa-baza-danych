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

function clauseColumns(row) {
    var fields = [];
    for (var i = 0; i < row.length; i++) {
         fields[i] = row[i].Field.createClause();
    }
    return fields;
}
function makeArray(object) {
    var array = [];
    var i = 0;
    for(var key in object) {
        array[i] = key;
        i++;
    }
    return array;
}

function checkForm(inputsNames, formName) {
    inputsNames = makeArray(inputsNames);
    var formOptions = formData(formName);
    var formFields = formOptions.fields;
    if(formOptions.textarea)var formFields = formFields.concat(formOptions.textarea);
    for (var i = 0; i < inputsNames.length; i++){
        if(inputsNames[i] == 'id' || inputsNames[i] == 'created')return false;
        for (var j = 0; j < formFields.length; j++) {
            if(inputsNames[i] == formFields[j].name)break;
            if(j+1 == formFields.length)return false;
        }
    }
    return true;
}

function formData(formName) {
    switch (formName){
        case 'reservation':
            return reservation;
            break;
        case 'service':
            return service;
            break;
        case 'room':
            return room;
            break;
        case 'client':
            return client;
            break;
        case 'discount':
            return discount;
            break;
        case 'client_service':
            return clientService;
            break;
        default:
            return '404';
            break;
    }
}


// [Forms]
var service = {
    formName: 'service',
    tableName: 'services',
    services_active: 'active',
    fields: [
        {id: 'fieldName', displayed: 'Name', type: 'text', name: 'name'},
        {id: 'fieldPrice', displayed: 'Price', type: 'number', name: 'price', step: 0.1}
    ],
    textarea: [
        {id: 'fieldDescription', displayed: 'Description',  name: 'description'}
        ]
};
var discount = {
    formName: 'discount',
    tableName: 'discounts',
    discounts_active: 'active',
    fields: [
        {id: 'fieldName', displayed: 'Name', type: 'text', name: 'name'},
        {id: 'fieldCode', displayed: 'Code', type: 'text', name: 'code'},
        {id: 'fieldValue', displayed: 'Value', type: 'number', name: 'value'},
        {id: 'fieldDateFrom', displayed: 'From', type: 'date', name: 'date_from'},
        {id: 'fieldDateTo', displayed: 'To', type: 'date', name: 'date_to'}
    ]
};
var clientService = {
    formName: 'client&service',
    tableName: 'client_service',
    client_service_active: 'active',
    fields: [
        {id: 'fieldClientId', displayed: 'Client id', type: 'number', name: 'id_client'},
        {id: 'fieldServiceId', displayed: 'Service id', type: 'number', name: 'id_service'},
        {id: 'fieldPaid', displayed: 'Date of paid', type: 'date', name: 'paid'}
    ]
};
var reservation = {
    formName: 'reservation',
    tableName: 'reservations',
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
    tableName: 'rooms',
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
    tableName: 'clients',
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

app.get('/', function (req, res){
    return res.render('home', { home_active: "active"});
});

app.get('/phpmyadmin', function (req, res) {
    console.log('Redirect to localhost/phpmyadmin')
    return res.redirect(303, 'http://localhost/phpmyadmin/');
});

app.get('/list/:form',function (req, res, next){
    if(formData(req.params.form) != '404')var table = formData(req.params.form).tableName;
    else return next();
    connection.query("DESCRIBE "+table,function (err, row) {
        if (err) {
            console.error(err);
            return res.redirect(505, '/505');
        }
        connection.query('SELECT * FROM `'+table+'`',function (err, result) {
            if (err) {
                console.error(err);
                return res.redirect(505, '/505');
            }
            var formName = formData(req.params.form).formName;
            var options = {
                item: formName,
                thead: clauseColumns(row),
                list: result
            };
            if (req.query.messages) options.messages = req.query.messages;
            if (req.query.alertType) options.alertType = req.query.alertType;
            return res.render('list', options);
        });
    });
});
// [/Forms]

app.get('/add/:form', function (req, res, next) {
    if(formData(req.params.form) != '404')var options = formData(req.params.form);
    else return next();
    if(req.query.messages) options.messages = req.query.messages;
    if(req.query.alertType) options.alertType = req.query.alertType;
    return res.render('add', options);
});

app.post('/add/:form', function (req, res, next) {
    console.log("Received form : " + req.params.form);
    console.log("User data : ");
    console.log(req.body);
    if(formData(req.params.form) != '404')var table = formData(req.params.form).tableName;
    else return next();

    if(checkForm(req.body,req.params.form) == false)return next();

    req.body.created = new Date();

    connection.query('INSERT INTO `'+table+'` SET ?', req.body, function (err, result) {
        if(err){
            console.error(err);
            return res.redirect(505,'/505');
        }
        res.redirect(303,'/list/'+req.params.form);
    });
});


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
