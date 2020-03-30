import random

from flask import Blueprint, request, Response, json, stream_with_context, jsonify
from flask_login import current_user, login_required

from sqlalchemy.sql import func
from sqlalchemy.types import UserDefinedType

from .db import db

class Point(UserDefinedType):
    def get_col_spec(self):
        return "POINT"

    def bind_expression(self, bindvalue):
        return func.ST_GeomFromText(bindvalue, type_=self)

    def column_expression(self, col):
        return func.ST_AsText(col, type_=self)

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
    location = db.Column(Point)


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
        location=location_from_request(request),
    )
    # TODO: Normalize location data
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

def location_from_request(request):
    latitude = request.json.get('latitude')
    longitude = request.json.get('longitude')
    if not latitude or not longitude:
        return None
    point = "POINT({} {})".format(latitude, longitude)
    return point

@bp.route('/query', methods=('GET', 'POST'))
@login_required
def query():
    pass

@bp.route('/query/random', methods=('GET', 'POST'))
@login_required
def query_random():
    """
    This endpoints randomly generates clusters of points around a central point

    Request can be customized with POST data like:
    {
      "latitude": 47.366667,
      "longitude": 8.55,
      "seed": 42,
      "clusters_count": 10
    }
    """
    center_lat = 47.05
    center_lon = 8.3
    seed = 1
    clusters_count = 20
    if request.json:
        center_lat = float(request.json.get('latitude', center_lat))
        center_lon = float(request.json.get('longitude', center_lon))
        seed = int(request.json.get('seed', seed))
        clusters_count = int(request.json.get('clusters', clusters_count))

    random.seed(seed)

    clusters_max_distance = 0.30 # max "distance", in degrees
    points_sigma = 0.10          # sigma for the gauss distribution of points, in degrees

    # Generate 10 clusters
    clusters = []
    def deviate(orig, max_deviation):
        int_max_deviation = max_deviation * 1000
        deviation = random.randint(-int_max_deviation, int_max_deviation)
        return orig + float(deviation) / int_max_deviation

    for i in range(clusters_count):
        clusters.append(
            (
                deviate(center_lat, clusters_max_distance),
                deviate(center_lon, clusters_max_distance),
                random.randint(10, 2000),
            )
        )

    # Stream data points
    def generate():
        def gauss_deviate(mu):
            return random.gauss(mu, points_sigma)

        for cluster in clusters:
            lat, lon, n = cluster
            for j in range(n):
                yield {"lat": gauss_deviate(lat), "lon": gauss_deviate(lon)}
    #return Response(stream_with_context(generate()), mimetype='application/json')
    return jsonify(list(generate()))
