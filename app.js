
// importing  Modules

var express = require('express');
var mongoose = require('mongoose');

var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contactlist');

// on connection
mongoose.connection.on('connected', function(){
    console.log('Connected to MongoDB @27017');
});

mongoose.connection.on('error', function(err){
    if(err){
        console.log('Error Database MongoDB @27017' +err);
    }
    
});

const port =3000;

app.use(cors());
app.use(bodyparser.json());

// static files

app.use(express.static(path.join(__dirname,'public')));


app.use('/api', route);


app.get('/', function(req,res){
    res.send('hello');
});


app.listen(port, function(){
    console.log('Server started on port ' + port);
});

