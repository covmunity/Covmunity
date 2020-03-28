#!/bin/bash

set -e

HOST=${HOST:-127.0.0.1}
PORT=${PORT:-8888}

export FLASK_APP=api
export FLASK_ENV=${FLASK_ENV:-development}

echo -e "\nDefined routes:\n"
flask routes
echo -e "\nRunning web server...\n"
flask run --host=$HOST --port=$PORT
echo -e "\nServer stoppped.\n"
