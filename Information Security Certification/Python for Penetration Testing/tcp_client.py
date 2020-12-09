#!/usr/bin/python3

import socket

# Creating the socket object
client_socket = socket.socket(
   socket.AF_INET,  # This indicates we are using IPv4
   socket.SOCK_STREAM  # This indicates we are using a connection protocol (TCP), as UDP is not connection oriented.
)

host = socket.gethostname()
port = 999

# The client connects to the server and port of the server
client_socket.connect((host, port))

message_received = client_socket.recv(1024)  # Maximum size of data we will accept.

client_socket.close()  # Closes the connection to the server.

print(message_received.decode("ascii"))
