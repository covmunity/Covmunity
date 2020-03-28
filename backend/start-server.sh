#!/bin/bash

HOST=127.0.0.1
PORT=8888

echo -e "\nRunning web server...\n"
python3 -m http.server $PORT --bind $HOST
echo -e "\nServer stoppped.\n"