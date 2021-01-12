#/bin/bash

FILES=/docker-entrypoint-initdb.d/dumps/*.sql

for FILE in $FILES; do
    DB_NAME=$(basename "$FILE" .sql)

    echo "Restoring DB ["$DB_NAME"] using: $FILE"

    psql -U $POSTGRES_USER -d "$DB_NAME" <"$FILE" || exit 1
done
