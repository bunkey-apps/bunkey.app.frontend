#!/bin/bash
if [ $# -ne 1 ]; then
    echo ERROR: $0: usage: $0 PATH_TO_FILE_PEM
    exit 1
fi
#sudo scp -i $1 -rp dist/* ubuntu@ec2-52-25-102-137.us-west-2.compute.amazonaws.com:/var/www/bunkey/bunkey-users
tar cvfz dist.tgz -C dist .
# sudo scp -i $1 -rp dist.tgz ubuntu@ec2-52-25-102-137.us-west-2.compute.amazonaws.com:/var/www/bunkey/bunkey-users
# ssh -i $1 ubuntu@ec2-52-25-102-137.us-west-2.compute.amazonaws.com tar xvfz /var/www/bunkey/bunkey-users/dist.tgz -C /var/www/bunkey/bunkey-users/
# rm dist.tgz
sudo scp -i $1 -rp dist.tgz ubuntu@13.58.191.150:/home/ubuntu/bunkey/bunkey.users.front
ssh -i $1 ubuntu@13.58.191.150 tar xvfz /home/ubuntu/bunkey/bunkey.users.front/dist.tgz -C /home/ubuntu/bunkey/bunkey.users.front/dist
rm dist.tgz