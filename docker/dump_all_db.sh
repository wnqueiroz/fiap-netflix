#/bin/bash

source ../.env

export POSTGRES_USER

FILES=./pg-init-scripts/dumps/*.sql

for FILE in $FILES; do
    DB_NAME=$(basename "$FILE" .sql)

    echo "Dumping DB ["$DB_NAME"]..."

    docker-compose -f ../docker-compose.yaml \
        --env-file ../.env \
        exec postgres pg_dump -U "$POSTGRES_USER" "$DB_NAME" >./pg-init-scripts/dumps/$DB_NAME.sql
done

echo "Done!"
