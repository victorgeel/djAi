#!/bin/bash

# Update package list and install required packages (without sudo)
apt-get update -y
apt-get install python3-pip python3 -y  # Installing pip and Python 3 without sudo

# Install Python dependencies globally (without sudo)
pip3 install --user -r requirements.txt  # Install the required packages in user space

# Additional setup tasks can go here
