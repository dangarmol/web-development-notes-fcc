#!/usr/bin/python3

import socket

# This tells you the version of the services running on the target IP.
# It can be used for vulnerability analysis.
def banner(ip, port):
   s = socket.socket()
   s.connect((ip, int(port)))
   s.settimeout(5)  # Times out after 5 seconds
   print(s.recv(1024).decode("ascii"))


def main():
   ip_addr = input("Please enter the IP: ")
   port = input("Please enter the port: ")
   banner(ip_addr, port)


main()