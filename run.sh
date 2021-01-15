#/bin/sh

BUILD=$1

DOCKER_COMPOSE_PREFIX=./docker/docker-compose

if [ "$BUILD" = "--build" ]; then
    docker-compose -p "fiap-netflix" \
        -f $DOCKER_COMPOSE_PREFIX.build.yaml rm -fs
    docker-compose -p "fiap-netflix" \
        -f $DOCKER_COMPOSE_PREFIX.build.yaml up --remove-orphans -d --build --force-recreate
else
    docker-compose -p "fiap-netflix" \
        -f $DOCKER_COMPOSE_PREFIX.prod.yaml rm -fs
    docker-compose -p "fiap-netflix" \
        -f $DOCKER_COMPOSE_PREFIX.prod.yaml up --remove-orphans -d
fi
