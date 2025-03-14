#!/bin/bash
set -e  # Exit on error

echo "Installing dependencies..."

# Install ffmpeg and Python
apt-get update && apt-get install -y ffmpeg python3 python3-pip

# Install yt-dlp
pip3 install -U yt-dlp

echo "Setup complete!"
