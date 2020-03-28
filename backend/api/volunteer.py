from flask import Blueprint

# API for volunteer management
bp = Blueprint('volunteer', __name__, url_prefix='/volunteer')

@bp.route('/request', methods=('GET', 'POST'))
def request():
    pass

@bp.route('/offer', methods=('GET', 'POST'))
def offer():
    pass
