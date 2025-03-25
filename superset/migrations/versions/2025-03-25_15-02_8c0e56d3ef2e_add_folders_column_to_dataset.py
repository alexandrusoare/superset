# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
"""add folders column to dataset

Revision ID: 8c0e56d3ef2e
Revises: 48cbb571fa3a
Create Date: 2025-03-25 15:02:41.357865

"""

import sqlalchemy as sa
from sqlalchemy.types import JSON

from superset.migrations.shared.utils import add_columns, drop_columns

# revision identifiers, used by Alembic.
revision = "94e7a3499973"
down_revision = "48cbb571fa3a"


def upgrade():
    add_columns("tables", sa.Column("folders", JSON, nullable=True))


def downgrade():
    drop_columns("tables", "folders")
