from flask import current_app, request
from flask_dance.contrib.google import make_google_blueprint, google

google = make_google_blueprint(redirect_to='status.status')
