var express = require('express');
var path = require('path');
var app = express();
var pageName = 'index';
const response404 = 'response404';

app.use(express.static(path.join(__dirname, 'public/static/')));

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
    var actionGet = req.query.action; // $_GET["id"]
    switch(actionGet){
        case ('index' || 'undefined' || '' || null):
            pageName = 'index';
            break;
        case "wynajem":
            pageName = 'wynajem';
            break;
        default:
            pageName = response404;
            break;

    }
    typeof(actionGet)==('undefined')||actionGet==''?pageName='index':'';
    console.log(actionGet);
        res.sendFile('public/' + pageName + '.html', {root: __dirname}, function (e){
            if(typeof(e)=='object' && e.status==404){
                console.log(e);
                console.log('Wysłano odpowiedź 404');
                res.sendFile('public/' + response404 + '.html', {root: __dirname});
            }
            else{
                console.log('Wysłano plik public/' + pageName + '.html');
            }
        });
});
 
app.listen(app.get('port'), function(){
    console.log("Serwer is working at 127.0.0.1:3000");
});