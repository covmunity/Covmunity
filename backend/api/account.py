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


class Profile(db.Model):
    """
    One of the profiles of the user, so it can report about the health of other people
    """
    __tablename__ = 'profiles'
    id = db.Column(db.String(36), primary_key=True, default=str_uuid)
    user_id = db.Column(db.String(36), db.ForeignKey(User.id))
    nickname = db.Column(db.String(64), nullable=False)


@bp.route('/profile/<uuid>', methods=('GET',))
@login_required
def get_profile(uuid):
    profile = Profile.query.get(uuid)
    if profile is None:
        abort(404)
    return jsonify({
        "id": profile.id,
        "user_id": profile.user_id,
        "nickname": profile.nickname,
    })

@bp.route('/profile', methods=('GET',))
@login_required
def list_profiles():
    profiles = Profile.query.filter_by(user_id=current_user.id)
    result = []
    for profile in profiles:
        result.append({
            "id": profile.id,
            "user_id": profile.user_id,
            "nickname": profile.nickname,
        })
    return jsonify(result)

@bp.route('/profile', methods=('POST',))
@login_required
def add_profile():
    profile = Profile(
        user_id=current_user.id,
    )
    if request.json:
        profile.nickname = request.json.get('nickname')
    db.session.add(profile)
    db.session.commit()
    return jsonify({
        "id": profile.id,
        "user_id": profile.user_id,
        "nickname": profile.nickname,
    })

@bp.route('/profile/<uuid>', methods=('DELETE',))
@login_required
def delete_profile(uuid):
    profile = Profile.query.get(uuid)
    if profile is None:
        abort(404)
    db.session.delete(profile)
    db.session.commit()
    return "", 200
