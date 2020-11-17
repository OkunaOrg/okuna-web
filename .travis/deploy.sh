#!/bin/sh

# start the ssh agent
eval "$(ssh-agent -s)"

# set required key permissions
chmod 600 .travis/dokku.key

# add dokku key to ssh
ssh-add .travis/dokku.key

# add dev server to known hosts
ssh-keyscan $DOKKU_HOST >> ~/.ssh/known_hosts

git remote add dokku $DOKKU_GIT_REMOTE

# force push to dokku master from develop branch
git push -f dokku hydrogen:master
