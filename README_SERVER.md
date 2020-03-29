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

* `HOST` (defaults to `localhost`)
* `PORT` (defaults to `8888`)
* `FLASK_ENV` (defaults to `development`)
* `COVMUNITY_SETTINGS` can be set to indicate an absolute path with a file witha
  additional Flask options.

Nothing more :grin:
