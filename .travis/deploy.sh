#!/bin/sh

# start the ssh agent
eval "$(ssh-agent -s)"

git remote add deploy https://dev.coac.de/okuna-web.git

# force push to dokku master from develop branch
git push -f deploy hydrogen:master
