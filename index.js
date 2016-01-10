"use strict";

var express =  require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var sphero = require("sphero"),
    orb = sphero("/dev/rfcomm1"); // change port accordingly
    
app.use('/control', express.static('control')); 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

orb.connect(listen);

function listen() {
    io.on('connection', function(socket){
    var stop = orb.roll.bind(orb, 0, 0),
    roll = orb.roll.bind(orb, 60);
      
    socket.on('robot message', function(msg){
        console.log('message: ' + msg);
        switch(msg){
            case "forward":
                roll(0);
                break;
            case "backward":
                roll(180);
                break;
            case "left":
                roll(270);
                break;
            case "right":
                roll(90);
                break;
            case "stop":
                stop();
                break;
            case "calib_start":
                orb.startCalibration();
                break;
            case "calib_end":
                orb.finishCalibration();
                break;
            default:
                console.log('invalid message. ');
        }
    });
    });

    http.listen(3000, function(){
    console.log('listening on *:3000');
    });
}
