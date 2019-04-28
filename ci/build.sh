#!/bin/sh
set -e -u

yarn install
yarn build

rm -rf /artifacts/build
mv ./build /artifacts/build

echo "$CI_COMMIT_ID/$CI_BUILD_ID" > /artifacts/build/VERSION.txt
