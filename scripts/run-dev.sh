#!/bin/sh

export BUILD_TYPE="dev"
export SERVICE_PORT="8080"
export DB_PORT="5400"

docker-compose up --build