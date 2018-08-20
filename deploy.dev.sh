#!/bin/bash
if [ $# -ne 1 ]; then
    echo ERROR: $0: usage: $0 PATH_TO_FILE_PEM
    exit 1
fi

sudo scp -i $1 -rp dist/* ubuntu@ec2-52-25-102-137.us-west-2.compute.amazonaws.com:/var/www/bunkey/bunkey-users
