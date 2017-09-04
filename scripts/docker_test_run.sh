#!/usr/bin/env bash

docker image build -t nasa-test -f Dockerfile.test .
docker container run --publish 8000:8000 --name tmp-nasa-test nasa-test
