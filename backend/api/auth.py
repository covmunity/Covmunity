from flask import current_app, request, flash
from flask_login import current_user, login_user

from flask_dance.consumer import oauth_authorized
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin, SQLAlchemyStorage

from sqlalchemy.orm.exc import NoResultFound

from .db import db
from .account import User

#
# Some settings are required in the flask configuration for this authentication
# method to work:
#
# * GOOGLE_OAUTH_CLIENT_ID
# * GOOGLE_OAUTH_CLIENT_SECRET
#

class OAuth(OAuthConsumerMixin, db.Model):
    __tablename__ = 'oauth_tokens'
    user_id = db.Column(db.String(36), db.ForeignKey(User.id))
    user = db.relationship(User)

google = make_google_blueprint(scope="openid https://www.googleapis.com/auth/userinfo.email")
google.storage = SQLAlchemyStorage(OAuth, db.session, user=current_user)

@oauth_authorized.connect_via(google)
def google_logged_in(blueprint, token):
    if not token:
        flash("Failed to log in with Google.", category="error")
        return False

    resp = blueprint.session.get("/oauth2/v1/userinfo")
    if not resp.ok:
        msg = "Failed to fetch user info from Google."
        flash(msg, category="error")
        return False

    google_info = resp.json()
    if "email" not in google_info:
        flash("User info from Google doesn't contain email")
        return False

    google_user_id = str(google_info["email"])

    # Find this OAuth token in the database, or create it
    query = OAuth.query.filter_by(
        provider=blueprint.name,
        user_id=google_user_id,
    )
    try:
        oauth = query.one()
    except NoResultFound:
        oauth = OAuth(
            provider=blueprint.name,
            user_id=google_user_id,
            token=token,
        )

    if oauth.user:
        login_user(oauth.user)
        flash("Successfully signed in with Google.")

    else:
        # Create a new local user account for this user.
        user = User(
            email=google_user_id
        )
        oauth.user = user

        db.session.add_all([user, oauth])
        db.session.commit()

        login_user(user)
        flash("Successfully registered and signed in with Google.")

    # Return False so Flask-Dance doesn't create another entry for the token
    return False
