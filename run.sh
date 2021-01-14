#/bin/sh

BUILD=$1

docker-compose rm -fs

if [ "$BUILD" = "--build" ]; then
    docker-compose up --remove-orphans -d --build --force-recreate
else
    docker-compose up --remove-orphans -d
fi
