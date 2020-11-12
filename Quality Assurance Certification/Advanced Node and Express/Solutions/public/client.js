$(document).ready(function () {
  
  // io() works only when connecting to a socket hosted on the same url/server.
  // For connecting to an external socket hosted elsewhere, you would use io.connect("URL");
  let socket = io();

  // socket.on("user count", function(data) {
  //   console.log(data);
  // });

  socket.on("user", (data) => {
    $("#num-users").text(data.currentUsers + " users online");
    const message = data.name + (data.connected ? " has joined the chat." : " has left the chat.");
    $("#messages").append($("<li>").html("<b>" + message + "</b>"));
  });

  socket.on("chat message", (data) => {
    $("#num-users").text(data.currentUsers + " users online");
    const message = data.name + ": " + data.message;
    $("#messages").append($("<li>").html("<b>" + message + "</b>"));
  });

  // Form submittion with new message in field with id "m"
  $("form").submit(function () {
    var messageToSend = $("#m").val();

    // On the socket architecture, the socket.emit function sends a request, potentially with data to the server (or viceversa), and the socket.on function listens for events.
    socket.emit("chat message", messageToSend);  // "chat message" is the name of the event and messageToSend is the data.

    $("#m").val("");
    return false; // prevent form submit from refreshing page
  });
});
