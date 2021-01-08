#/bin/sh

export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)

BUILD=$1

docker-compose rm -fs

if [ "$BUILD" = "--build" ]; then
    docker-compose up --remove-orphans -d --build
else
    docker-compose up --remove-orphans -d
fi
