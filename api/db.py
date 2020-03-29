import click
import time

from flask.cli import AppGroup
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

db_cli = AppGroup('db')

# TODO: Add support for schema migrations

@db_cli.command('init')
def init_db():
    """
    Create schema
    """
    db.create_all()

@db_cli.command('wait')
def wait_db():
    """
    Wait database to be available during 30 seconds
    """
    retries = 30
    for i in range(retries):
        try:
            db.session.execute('SELECT 1')
            return
        except Exception as e:
            if i >= retries-1:
                raise e
            time.sleep(1)
