from flask import Blueprint, jsonify

# API for health checking
bp = Blueprint('status', __name__, url_prefix='/status')


@bp.route('/')
def status():
    return jsonify({'status': 'OK'})

