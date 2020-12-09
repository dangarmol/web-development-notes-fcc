#!/usr/bin/python3

import nmap

scanner = nmap.PortScanner()

print("-----------------------------------------------")
print("Welcome, this is a simple nmap automation tool.")
print("-----------------------------------------------")

ip_addr = input("Please, enter the IP address you want to scan: ")
print("You entered:", ip_addr)
type(ip_addr)

scan_type = input("""\nPlease enter the type of scan you want to run:
1) SYN ACK Scan
2) UDP Scan
3) Comprehensive Scan\n""")

print("You have selected the option:", scan_type)

if scan_type == "1":
   print("nmap version:", scanner.nmap_version())
   scanner.scan(ip_addr, "1-1024", "-v -sS")
   print(scanner.scaninfo())
   print("IP status:", scanner[ip_addr].state())
   print(scanner[ip_addr].all_protocols())
   print("Open ports:", scanner[ip_addr]["tcp"].keys())
elif scan_type == "2":
   print("nmap version:", scanner.nmap_version())
   scanner.scan(ip_addr, "1-1024", "-v -sU")
   print(scanner.scaninfo())
   print("IP status:", scanner[ip_addr].state())
   print(scanner[ip_addr].all_protocols())
   print("Open ports:", scanner[ip_addr]["udp"].keys())
elif scan_type == "3":
   print("nmap version:", scanner.nmap_version())
   scanner.scan(ip_addr, "1-1024", "-v -sS -sV -sC -A -O")
   print(scanner.scaninfo())
   print("IP status:", scanner[ip_addr].state())
   print(scanner[ip_addr].all_protocols())
   print("Open ports:", scanner[ip_addr]["tcp"].keys())
else:
   print("Please enter a valid option!")