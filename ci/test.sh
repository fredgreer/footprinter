#!/bin/sh
set -e -u

yarn install
yarn test -- --coverage
