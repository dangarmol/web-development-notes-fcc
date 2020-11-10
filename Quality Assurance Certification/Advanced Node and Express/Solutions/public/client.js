$(document).ready(function () {
  
  // io() works only when connecting to a socket hosted on the same url/server.
  // For connecting to an external socket hosted elsewhere, you would use io.connect('URL');
  let socket = io();

  socket.on("user count", function(data) {
    console.log(data);
  });

  // Form submittion with new message in field with id 'm'
  $('form').submit(function () {
    var messageToSend = $('#m').val();

    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
});
