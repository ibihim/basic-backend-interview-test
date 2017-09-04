#!/usr/bin/env bash

NASA_MONGO_DB_PID_FILE_NAME=mongodb.pid

[ -d "logs" ] || mkdir logs
[ -d "data" ] || mkdir -p data/db

mongod --port 27017 \
       --dbpath data/db \
       --logpath logs/mongo.log & \
echo $! > "$NASA_MONGO_DB_PID_FILE_NAME"
