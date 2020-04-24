#!/bin/bash
set -e
source /pd_build/buildconfig

header "Installing Python..."

## Install Python.
minimal_apt_get_install python python2.7 python3.8 python3.8-dev python3-pip python3-setuptools
