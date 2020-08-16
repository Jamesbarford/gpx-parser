#!/usr/bin/env bash

if [ ! -d dist ]; then
  mkdir dist
fi
tsc;
cp ./src/package.json ./dist/package.json;
cp ./src/package-lock.json ./dist/package-lock.json;
cd ./dist;
npm publish;
echo "published to npm"
