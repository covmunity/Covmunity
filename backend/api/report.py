from flask import Blueprint, request
from flask_login import current_user, login_required

from sqlalchemy.sql import func

from .db import db

class Report(db.Model):
    __tablename__ = 'reports'
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.String(36))
    report = db.Column(db.JSON)

    # Timestamp
    timestamp = db.Column(db.DateTime(timezone=True), server_default=func.now())
    ingest_timestamp = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # Location data
    country = db.Column(db.String(3))
    zip_code = db.Column(db.String(16))
    address = db.Column(db.String(255))


# API for reports management
bp = Blueprint('report', __name__, url_prefix='/report')

@bp.route('/send', methods=('POST',))
@login_required
def send():
    if request.json is None:
        return "JSON expected\n", 400
    if request.json.get('report') is None:
        return "Missing 'report' attribute\n", 400
    if not contains_location(request):
        return "Missing location information\n", 400

    profile_id = request.json.get('profile_id')
    if profile_id is None:
        profile_id = current_user.self_profile().id
    report = Report(
        profile_id=profile_id,
        report=request.json.get('report'),
        timestamp=request.json.get('timestamp'),
        country=request.json.get('country'),
        zip_code=request.json.get('zip_code'),
        address=request.json.get('address'),
    )
    db.session.add(report)
    db.session.commit()
    return "", 200

def contains_location(request):
    json = request.json
    if json.get('country') and json.get('zip_code'):
        return True
    if json.get('address'):
        return True
    if json.get('latitude') and json.get('longitude'):
        return True
    return False


@bp.route('/query', methods=('GET', 'POST'))
@login_required
def query():
    pass
