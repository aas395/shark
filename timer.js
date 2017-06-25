//Using the date/time is the only thing I could think to use as a timer
// Gets the initial time
var initialTime = new Date().getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the initial time
  var distance = now - initialTime;

  // Time calculations for minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("time").setAttribute('text', 'value: ' + minutes + "m " + seconds + "s ;");
}, 1000);

//End of Timer Script
