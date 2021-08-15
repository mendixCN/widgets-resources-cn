#!/bin/bash
set -u

BASEDIR=$(dirname "$0")

cd $BASEDIR/../../
git clone --branch v3.3.1 --config core.autocrlf=false https://github.com/mendix/docker-mendix-buildpack

cp -r testProject/ docker-mendix-buildpack/project
cd $BASEDIR/docker-mendix-buildpack

docker build \
  --build-arg BUILD_PATH=./project \
  --build-arg ROOTFS_IMAGE=mendix/rootfs:bionic \
  --build-arg BUILDER_ROOTFS_IMAGE=mendix/rootfs:bionic \
  --build-arg CF_BUILDPACK=v4.17.1 \
  --tag mendix/mendix-buildpack:v1.2 .