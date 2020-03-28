import os

from flask import Flask, jsonify

from . import status, report, volunteer, account, auth
from .db import db, db_cli


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        # flask configuration
        SECRET_KEY='dev',

        # db settings
        SQLALCHEMY_DATABASE_URI='mysql+mysqlconnector://root:dev@localhost/covmunity',
        SQLALCHEMY_TRACK_MODIFICATIONS=True,
    )

    db.init_app(app)
    app.cli.add_command(db_cli)

    if test_config is None:
        # load the instance config file indicated by the environment variable
        app.config.from_envvar('COVMUNITY_SETTINGS', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # register blueprints
    app.register_blueprint(status.bp)
    app.register_blueprint(report.bp)
    app.register_blueprint(volunteer.bp)
    app.register_blueprint(account.bp)

    # register auth providers
    app.register_blueprint(auth.google, url_prefix="/auth")

    return app
