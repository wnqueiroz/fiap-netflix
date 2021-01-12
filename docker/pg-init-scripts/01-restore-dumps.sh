#!/bin/bash

FILE="/docker-entrypoint-initdb.d/dumps/backend_user_dump.sql"
DB_NAME=backend_user

echo "Restoring DB ["$DB_NAME"] using: $FILE"
psql --username $POSTGRES_USER --password $POSTGRES_PASSWORD -d "$DB_NAME" < "$FILE" || exit 1
