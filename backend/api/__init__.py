import os

from flask import Flask, jsonify, redirect, url_for, flash, request, session, abort
from flask import get_flashed_messages
from flask_login import login_required, current_user, logout_user, LoginManager, login_url

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

    # configure login
    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.request_loader
    def load_user_from_request(request):
        # XXX: Only for development
        user_id = request.headers.get("X-User-ID")
        if user_id:
            user = account.User.query.get(user_id)
            if not user:
                user = account.User(id=user_id)
                db.session.add(user)
                db.session.commit()
            return user
        return None

    # TODO: complete login management
    @login_manager.user_loader
    def load_user(user_id):
       return auth.User.query.get(user_id)

    @app.route("/test/login")
    @login_manager.unauthorized_handler
    def login():
        abort(401)
        return url_for('google.login', next=request.endpoint)

    @app.route("/test/logout")
    def logout():
        logout_user()
        flash("Succesfuly logged out.")
        return redirect(url_for('root'))

    # XXX: remove this
    @app.route("/test")
    @login_required
    def test():
        return jsonify([current_user.id, current_user.email])

    # XXX: remove this
    @app.route("/")
    def root():
        if 'next' in session:
            next_url = url_for(session.pop('next'))
            return redirect(next_url)

        return jsonify(get_flashed_messages())

    return app
