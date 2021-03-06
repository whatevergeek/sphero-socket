var socket = io();

var forwardRsrc = "forward",
  backwardRsrc = "backward",
  leftRsrc = "left",
  rightRsrc = "right",
  stopRsrc = "stop";
  calibStartRsrc = "calib_start";
  calibEndRsrc = "calib_end";

$(function() {

  $('#forward').on("mousedown", function(){
    console.log("forward")
    socket.emit('robot message',  forwardRsrc);
  })

  $('#backward').on("mousedown", function(){
    console.log("backward")
    socket.emit('robot message',  backwardRsrc);
  })

  $('#left').on("mousedown", function(){
    console.log("left")
    $.get(leftRsrc)
    socket.emit('robot message',  leftRsrc);
  })

  $('#right').on("mousedown", function(){
    console.log("right")
    $.get(rightRsrc)
    socket.emit('robot message',  rightRsrc);
  })

  $('#stop').on("mousedown", function(){
    console.log("stop")
    socket.emit('robot message',  stopRsrc);
  })

  // http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
  $(document).on("keydown", function(e){
    if (e.keyCode === 38) socket.emit('robot message',  forwardRsrc);// up
    if (e.keyCode === 40) socket.emit('robot message',  backwardRsrc); // down
    if (e.keyCode === 37) socket.emit('robot message',  leftRsrc); // left
    if (e.keyCode === 39) socket.emit('robot message',  rightRsrc); // right
    if (e.keyCode === 32) socket.emit('robot message',  stopRsrc); // space
    if (e.keyCode === 69) socket.emit('robot message',  calibStartRsrc); // e
    if (e.keyCode === 81) socket.emit('robot message',  calibEndRsrc); // e
  })

  $(document).on("keyup", function(e){
    if (e.keyCode === 38) socket.emit('robot message',  stopRsrc); // up
    if (e.keyCode === 40) socket.emit('robot message',  stopRsrc); // down
    if (e.keyCode === 37) socket.emit('robot message',  stopRsrc);// left
    if (e.keyCode === 39) socket.emit('robot message',  stopRsrc); // right
  })

})
