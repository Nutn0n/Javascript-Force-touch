// State Machine API by Apple
// Developed by @nutn0n

document.addEventListener("DOMContentLoaded", function() {

  var button = document.querySelector(".force-get");
  var forcetouch = document.querySelector(".force-push");

  var fsm = StateMachine.create({
    initial: 'rest',
    events: [
      { name: 'mousedown',      from: 'rest',           to: 'mousedown' },
      { name: 'mouseup',        from: 'mousedown',      to: 'rest' },
      { name: 'forcemousedown', from: 'mousedown',      to: 'forcemousedown' },
      { name: 'forcemouseup',   from: 'forcemousedown', to: 'mousedown' }
    ], callbacks: {
      onforcemousedown: function() { forcetouch.className = "force_down";  }, //force down
      onmousedown: function() {  forcetouch.className = "mouse_down";  }, // mouse down
      onrest: function() {  forcetouch.className = "mouse_rase";  } //rest state
    }
  });

  button.addEventListener("webkitmouseforcedown", function(ev) {
    fsm.forcemousedown();
    console.log("mouseforcedown");
  });

  button.addEventListener("webkitmouseforceup", function(ev) {
    fsm.forcemouseup();
    console.log("mouseforceup");
  });

  button.addEventListener("mouseup", function(ev) {
    fsm.mouseup();
    console.log("mouseup");
  });

  button.addEventListener("mousedown", function(ev) {
    fsm.mousedown();
    console.log("mousedown");
  });

  button.addEventListener("webkitmouseforcewillbegin", function(ev) {
    console.log("mouseforcewillbegin");
    // if not preventing default, force-mousing on text fires Quicklook
    ev.preventDefault();
  });

});
