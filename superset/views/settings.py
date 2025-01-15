from __future__ import annotations

from flask import jsonify, request
from flask_appbuilder import expose
from flask_appbuilder.api import rison
from flask_appbuilder.security.decorators import has_access_api
from superset import app, db, event_logger
from superset.superset_typing import FlaskResponse
from superset.views.base import api, BaseSupersetView
from superset.views.error_handling import handle_api_exception

class GeneralSettingsApi(BaseSupersetView):


    @event_logger.log_this
    @api
    @handle_api_exception
    @has_access_api
    @expose("/general_settings/feature_flags", methods=("GET",))
    def get_feature_flags(self) -> FlaskResponse:
        feature_flags = app.config.get("FEATURE_FLAGS", {})
        return jsonify(feature_flags)