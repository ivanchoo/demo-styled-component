#! /bin/sh

# Compiles `frontend` and output to `dist` directory

echo 'Building frontend'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIST_DIR="${DIR}/dist"
HTML_DIR="${DIR}/frontend/html"

if [ "$(ls -A ${DIST_DIR})" ]; then
  rm -vRf $DIST_DIR/*
fi

cp -R $HTML_DIR/* $DIST_DIR

docker-compose run --rm -e NODE_ENV=production frontend webpack -p

mkdir $DIST_DIR/lib

mv $DIST_DIR/*bundle* $DIST_DIR/lib
