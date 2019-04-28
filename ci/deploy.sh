#!/bin/sh
set -e -u

if [ -z ${1+x} ]; then
  echo "a target bucket must be specified (e.g. \`deploy.sh staging.foo.com\`)"
  exit 1
fi

TARGET_BUCKET="$1"

cd /artifacts/build

echo "*******************************************************"
echo "* "
echo "* deploying the following files to $TARGET_BUCKET..."
echo "* "
echo "*******************************************************"

ls -lR

aws s3 sync --acl public-read --delete . "s3://$TARGET_BUCKET/"

echo "deployment complete"
