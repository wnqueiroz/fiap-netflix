#/bin/sh

docker-compose rm -fs && docker-compose up --remove-orphans --build
