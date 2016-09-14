var express = require('express');
var app = express();
var pageName = 'index';
const __dir = "C:/Users/4ei/Documents/Hotelowa-baza-danych/";

app.get('/', function (req, res) {
    var actionGet = req.query.action; // $_GET["id"]
    switch(actionGet){
        case ('index' || 'undefined' || '' || null):
            pageName = 'index';
            break;
        case "wynajem":
            pageName = 'wynajem';
            break;
            
    }
    console.log(actionGet);
    res.sendFile('public/'+pageName+'.html' , { root : __dir});
})
 
app.listen(3000, function(){
    console.log("Serwer is working at 127.0.0.1:3000");
});