#!/usr/bin/env bash

VERSION="1.0.0"

if ! which docker >/dev/null; then
    echo "Error: docker is not installed" >&2
    exit 1
fi

docker inspect --type=image hlolli/csound-floss:$VERSION &> /dev/null
if [ $? -eq 1 ]; then
    docker pull hlolli/csound-floss:$VERSION
fi

docker run -i -p 6006:6006 -v ${PWD}:/mnt hlolli/csound-floss:$VERSION sh <<EOF
nix-shell /root/shell.nix --run "cd /mnt && python3 build.py html"
EOF
