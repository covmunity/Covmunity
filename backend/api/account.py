from flask import Blueprint
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy

from .db import db

# API for accounts management
bp = Blueprint('account', __name__, url_prefix='/account')


class User(UserMixin, db.Model):
    """
    Registered user in the system
    """
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    social_id = db.Column(db.String(64), nullable=False, unique=True)
    nickname = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(64), nullable=True)
    profiles = db.relationship('Profile')


class Profile(db.Model):
    """
    One of the profiles of the user, so it can report about the health of other people
    """
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    nickname = db.Column(db.String(64), nullable=False)


@bp.route('/profile', methods=('GET', 'POST', 'PUT'))
def profile():
    pass
