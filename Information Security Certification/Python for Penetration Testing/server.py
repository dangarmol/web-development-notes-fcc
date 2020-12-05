#!/usr/bin/python3

import socket

server_socket = socket.socket(
   socket.AF_INET,  # This indicates we are using IPv4
   socket.SOCK_STREAM  # This indicates we are using a connection protocol (TCP), as UDP is not connection oriented.
)

host = socket.gethostname()
port = 999

# .bind() binds the socket to a local address. A tuple is needed for IP sockets.
server_socket.bind((host, port))
# The OS may ask for admin permission when binding a port.

server_socket.listen(5)  # Listen for incoming connections. We can set a maximum number of connections allowed (5).

while True:
   client_socket, address = server_socket.accept()

   print("Received connection from: " %str(address))

   server_message = "Hello, thanks for connecting to the server.\n"
   client_socket.send(server_message)  # We send the message back to the client before closing connection.

   client_socket.close()
