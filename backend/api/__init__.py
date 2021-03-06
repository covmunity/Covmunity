import os

from flask import Flask, jsonify, redirect, url_for, flash, request, session, abort
from flask import get_flashed_messages, render_template
from flask_login import login_required, current_user, login_user, logout_user, LoginManager

from . import status, report, volunteer, account, auth
from .db import db, db_cli




def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True, template_folder='../../frontend/', static_folder='../../frontend/')
    app.config.from_mapping(
        # flask configuration
        SECRET_KEY='dev',

        # db settings
        SQLALCHEMY_DATABASE_URI='mysql+mysqlconnector://root:dev@localhost:3307/covmunity',
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
    setup_login(app)

    @app.route('/dashboard')
    @app.route('/form')
    @app.route('/charts')
    @app.route('/maps')
    @app.route('/help')
    @login_required
    def show_dashboard():
        return render_template('index.html')

    @app.route("/")
    @login_required
    def root():
        if 'next' in session:
            next_url = url_for(session.pop('next'))
            return redirect(next_url)

        # XXX: Do something with flashed messages
        get_flashed_messages()
        return show_dashboard()

    return app


def setup_login(app):
    login_manager = LoginManager()
    login_manager.init_app(app)

    def test_user(user_id):
        user = account.User.query.get(user_id)
        if not user:
            user = account.User(id=user_id)
            db.session.add(user)
            db.session.commit()
        return user

    @login_manager.request_loader
    def load_user_from_request(request):
        if app.env != 'production':
            user_id = request.headers.get("X-User-ID")
            if user_id:
                return test_user(user_id)
        return None

    @login_manager.user_loader
    def load_user(user_id):
       return auth.User.query.get(user_id)

    @login_manager.unauthorized_handler
    def unauthorized():
        session['next'] = request.endpoint
        return redirect(url_for('login'))

    @app.route("/login", methods=['GET', 'POST'])
    def login():
        if current_user is not None:
            error = None
            if request.method == 'POST':
                if request.form['email'] != 'admin@admin.com' or request.form['password'] != '123456789':
                    error = 'Invalid Credentials. Please try again.'
                else:
                    user = test_user('test')
                    login_user(user)
                    return redirect(url_for('root'))
            return render_template('ressources/pages/Auth/login.html', error=error)
        return render_template('index.html')


    @app.route("/logout")
    def logout():
        logout_user()
        flash("Succesfuly logged out.")
        return redirect(url_for('root'))
