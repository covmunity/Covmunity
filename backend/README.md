# Covmunity

Allow people to respect quarantines and self isolation

## Backend

This place will contains everything related to the backend side.

### Running web server

A simple `bash` script has been made to start a minimal web server.

Usage:

```bash
# Navigate to the directory you want to serve
cd frontend/

# Start the web server
../backend/start-server.sh

# That's all!
```

Once started, navigate to <http://127.0.0.1:8888>.

### Configure web server

Export the follwing environment variables before running `start-server.sh`.

* `HOST`
* `PORT`
* `FLASK_ENV`

Nothing more :grin:
