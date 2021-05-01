#!/bin/sh

export BUILD_TYPE="prod"
export SERVICE_PORT="8080"

docker-compose up --build