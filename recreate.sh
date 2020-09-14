#!/bin/sh
docker-compose down
docker rmi webapp
docker-compose up -d