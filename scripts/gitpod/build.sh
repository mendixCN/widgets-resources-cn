#!/bin/bash
set -u


BASEDIR=$(dirname "$0")
ROOTDIR=$BASEDIR/../../

cd $ROOTDIR
git clone --branch v3.3.1 --config core.autocrlf=false https://github.com/mendix/docker-mendix-buildpack

cp -r $ROOTDIR/testProject/ $ROOTDIR/docker-mendix-buildpack/project
cd $ROOTDIR/docker-mendix-buildpack

#--build-arg BUILDER_ROOTFS_IMAGE=mendix/rootfs:bionic \
#  --build-arg FORCED_MXRUNTIME_URL=https://cdn.mendix.com/runtime/mendix-9.4.0.24572.tar.gz \
# export FORCED_MXRUNTIME_URL=https://cdn.mendix.com/runtime/mendix-9.4.0.24572.tar.gz
docker build \
  --build-arg BUILD_PATH=project \
  --build-arg ROOTFS_IMAGE=mendix/rootfs:bionic \
  --build-arg CF_BUILDPACK=v4.17.1 \
  --tag mendix/mendix-buildpack:v1.5 .

  # docker run --rm -it --entrypoint /bin/bash mendix/mendix-buildpack:v1.5 -c ls /opt/mendix/build/runtimes/9.4.0.24572/runtime/