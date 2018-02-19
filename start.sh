#!/usr/bin/env bash

./gradlew &> gradle_out.txt &
yarn start &> yarn_out.txt &
