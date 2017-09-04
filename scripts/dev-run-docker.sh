#!/usr/bin/env bash

docker image build -t nasa .
docker container run --publish 8000:8000 --name tmp-nasa nasa
