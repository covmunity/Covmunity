from flask import Blueprint

# API for accounts management
bp = Blueprint('account', __name__, url_prefix='/account')

@bp.route('/profile', methods=('GET', 'POST', 'PUT'))
def profile():
    pass
