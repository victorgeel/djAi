#!/bin/bash

# Update package list and install required packages
sudo apt-get update -y
sudo apt-get install python3-venv python3-pip -y

# Create a virtual environment
python3 -m venv /home/render/venv

# Activate the virtual environment
source /home/render/venv/bin/activate

# Install Python dependencies inside the virtual environment
pip install -r requirements.txt

# Additional setup tasks can go here
