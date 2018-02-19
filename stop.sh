#!/usr/bin/env bash

kill $(ps u | grep 'gradle' | awk '{print $2}')
kill $(ps u | grep 'node' | awk '{print $2}')
