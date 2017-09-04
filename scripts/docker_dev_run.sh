#!/usr/bin/env bash

docker container run --name tmp-mongo --rm mongo
docker image build -t nasa .
docker container run --link tmp-mongo:mongodb --publish 8000:8000 --name tmp-nasa nasa
