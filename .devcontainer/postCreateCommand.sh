#!/usr/bin/bash

sudo apt-get -y update && sudo apt upgrade -y
sudo apt-get -y install\
    build-essential\
    libcairo2-dev\
    libpango1.0-dev\
    libjpeg-dev\
    libgif-dev\
    librsvg2-dev

curl -fsSL https://claude.ai/install.sh | bash