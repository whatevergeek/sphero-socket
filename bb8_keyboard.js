"use strict";

var sphero = require("sphero"),
    orb = sphero("d5:3b:86:9a:20:0b"); // change port accordingly

var process = require("process");

// make sure you install this first - `npm install keypress`
var keypress = require("keypress");


orb.connect(listen);

function handle(ch, key) {
  var stop = orb.roll.bind(orb, 0, 0),
      roll = orb.roll.bind(orb, 60);

  if (key.ctrl && key.name === "c") {
    process.stdin.pause();
    process.exit();
  }

  if (key.name === "e") {
    orb.startCalibration();
  }

  if (key.name === "q") {
    orb.finishCalibration();
  }

  if (key.name === "up") {
    roll(0);
  }

  if (key.name === "down") {
    roll(180);
  }

  if (key.name === "left") {
    roll(270);
  }

  if (key.name === "right") {
    roll(90);
  }

  if (key.name === "space") {
    stop();
  }
}

function listen() {
  keypress(process.stdin);
  process.stdin.on("keypress", handle);

  console.log("starting to listen for arrow key presses");

  process.stdin.setRawMode(true);
  process.stdin.resume();
}
