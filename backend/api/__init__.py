import os

from flask import Flask, jsonify

from . import status, report, volunteer, account
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
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # register blueprints
    app.register_blueprint(report.bp)
    app.register_blueprint(volunteer.bp)
    app.register_blueprint(account.bp)

    return app
