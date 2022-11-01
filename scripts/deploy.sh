#!/bin/bash 

mv ./node_modules ../node_modules
mv ./.git ../.git
scp -prq ../jj-bot ddima@83.229.84.223:/home/ddima/
mv ../node_modules ./node_modules
mv ../.git ./.git