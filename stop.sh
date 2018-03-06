#!/usr/bin/env bash

kill $(ps xu | grep 'gradle' | awk '{print $2}')
kill $(ps xu | grep 'node' | awk '{print $2}')
