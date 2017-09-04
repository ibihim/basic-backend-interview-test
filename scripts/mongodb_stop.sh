#!/usr/bin/env bash

NASA_MONGO_DB_PID_FILE_NAME=mongodb.pid

[ -e "$NASA_MONGO_DB_PID_FILE_NAME" ] && \
    kill $(cat mongodb.pid) && \
    rm "$NASA_MONGO_DB_PID_FILE_NAME"
