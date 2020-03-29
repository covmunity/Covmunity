#!/bin/bash

# Will be used only to dev the UI without all the Flask framework
# Useful for quick UI changes and tests
#
# Usage: ./backend/start-minimal-server.sh

# Always run this script from where it is defined
# cd $(dirname $0)

# Thanks Jaime for that! [Jonathan]
HOST=${HOST:-127.0.0.1}
PORT=${PORT:-8888}

echo -e "\nRunning web server...\n"
python3 -m http.server $PORT --bind $HOST
echo -e "\nServer stoppped.\n"