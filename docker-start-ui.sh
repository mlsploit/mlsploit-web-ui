#!/usr/bin/env bash

docker-compose -f services.docker-compose.yml build \
    && docker-compose -f services.docker-compose.yml up
