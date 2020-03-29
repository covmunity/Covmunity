import uuid

from flask import Blueprint, jsonify, abort, request
from flask_login import UserMixin, current_user, login_required
from flask_sqlalchemy import SQLAlchemy

from .db import db

# API for accounts management
bp = Blueprint('account', __name__, url_prefix='/account')

def str_uuid():
    return str(uuid.uuid4())

class User(UserMixin, db.Model):
    """
    Registered user in the system
    """
    __tablename__ = 'users'
    id = db.Column(db.String(36), primary_key=True, default=str_uuid)
    #nickname = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(64), nullable=True)
    profiles = db.relationship('Profile')

    def profiles_count(self):
        return db.session.query(Profile).filter_by(user_id=self.id).count()


class Profile(db.Model):
    """
    One of the profiles of the user, so it can report about the health of other people
    """
    __tablename__ = 'profiles'
    id = db.Column(db.String(36), primary_key=True, default=str_uuid)
    user_id = db.Column(db.String(36), db.ForeignKey(User.id))
    nickname = db.Column(db.String(64), nullable=False)

    def as_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "nickname": self.nickname,
        }


@bp.route('/profile/<uuid>', methods=('GET',))
@login_required
def get_profile(uuid):
    profile = Profile.query.get(uuid)
    if profile is None:
        abort(404)
    return jsonify(profile.as_dict())

@bp.route('/profile', methods=('GET',))
@login_required
def list_profiles():
    result = []
    for profile in current_user.profiles:
        result.append(profile.as_dict())
    return jsonify(result)

@bp.route('/profile', methods=('POST',))
@login_required
def add_profile():
    if request.json is None or request.json.get('nickname') is None:
        return "Missing parameter 'nickname'\n", 400

    if current_user.profiles_count() >= 3:
        return "Maximum number of profiles exceeded\n", 400

    profile = Profile(
        user_id=current_user.id,
        nickname = request.json.get('nickname')
    )
    db.session.add(profile)
    db.session.commit()
    return jsonify(profile.as_dict())

@bp.route('/profile/<uuid>', methods=('DELETE',))
@login_required
def delete_profile(uuid):
    profile = Profile.query.filter_by(id=uuid, user_id=current_user.id).one_or_none()
    if profile is None:
        abort(404)
    db.session.delete(profile)
    db.session.commit()
    return "", 200
