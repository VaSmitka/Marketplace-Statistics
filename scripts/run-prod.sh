#!/bin/sh

export BUILD_TYPE="prod"
export SERVICE_PORT="8080"
export DB_PORT="5432"

docker-compose up --build