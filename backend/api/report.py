from flask import Blueprint, request
from flask_login import current_user, login_required

from .db import db

class Report(db.Model):
    __tablename__ = 'reports'
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.String(36))
    report = db.Column(db.JSON)


# API for reports management
bp = Blueprint('report', __name__, url_prefix='/report')

@bp.route('/send', methods=('POST',))
@login_required
def send():
    if request.json is None:
        return "JSON expected\n", 400
    if request.json.get('report') is None:
        return "Missing 'report' attribute\n", 400
    profile_id = request.json.get('profile_id')
    if profile_id is None:
        profile_id = current_user.self_profile().id
    report = Report(
        profile_id=profile_id,
        report=request.json.get('report'))
    db.session.add(report)
    db.session.commit()
    return "", 200

@bp.route('/query', methods=('GET', 'POST'))
@login_required
def query():
    pass
