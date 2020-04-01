#! /bin/bash
yarn build:server
docker build -t henryfellerhoff/scorecompanion:latest .
docker push henryfellerhoff/scorecompanion:latest
ssh root@161.35.1.70 "docker pull henryfellerhoff/scorecompanion:latest && docker tag henryfellerhoff/scorecompanion:latest dokku/api:latest && dokku tags:deploy api latest"