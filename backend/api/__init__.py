import os

from flask import Flask

from . import report, volunteer, account


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        # flask configuration
        SECRET_KEY='dev',

        # mysql info
        MYSQL_PASSWORD='dev',
        MYSQL_DB='dev',
        MYSQL_HOST='localhost',
        MYSQL_PORT='3306',
    )

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

    # a simple status page for healthcheck
    @app.route('/status')
    def hello():
        return 'OK'

    # register blueprints
    app.register_blueprint(report.bp)
    app.register_blueprint(volunteer.bp)
    app.register_blueprint(account.bp)

    return app

