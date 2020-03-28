from flask import Blueprint

# API for reports management
bp = Blueprint('report', __name__, url_prefix='/report')

@bp.route('/send', methods=('POST',))
def send():
    pass

@bp.route('/query', methods=('GET', 'POST'))
def query():
    pass
