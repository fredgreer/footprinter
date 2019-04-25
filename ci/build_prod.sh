#!/usr/bin/env bash
set -e
set -u

cd /app

npm install -g yarn
yarn install
yarn build
