#!/bin/bash

set -e

# Always run this script from where it is defined
cd $(dirname $0)

HOST=${HOST:-127.0.0.1}
PORT=${PORT:-8888}

export FLASK_APP=api
export FLASK_ENV=${FLASK_ENV:-development}


source ./scripts/python.sh
enable_venv

if [ "$FLASK_ENV"="development" ]; then
export OAUTHLIB_INSECURE_TRANSPORT=1

echo -e "\nStart database:\n"
docker-compose up -d
flask db wait
flask db init
fi

echo -e "\nDefined routes:\n"
flask routes
echo -e "\nRunning web server...\n"
flask run --host=$HOST --port=$PORT
echo -e "\nServer stoppped.\n"
