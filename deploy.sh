#!/usr/bin/env bash
set -e  # Exit the script immediately if any command fails
echo "Starting application deployment..."
# Completely remove old versions of Node.js and npm to prevent dependency conflicts
sudo apt-get remove --purge -y nodejs npm || true
sudo apt-get autoremove -y
sudo apt-get autoclean
sudo rm -rf /usr/lib/node_modules ~/.npm ~/.node-gyp /usr/local/lib/node_modules /usr/local/bin/npm /usr/local/bin/node /usr/bin/node
# Ensure the system is up to date
sudo apt-get update -y
# Install Node.js and npm (from the official Nodesource repository)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
# Ensure npm is available
sudo npm install -g npm@latest
# Ensure pm2 is installed
sudo npm install -g pm2
# Navigate to the application directory
cd ~/DevOpsSec-Group-Project
# Install npm dependencies
npm install --legacy-peer-deps
# Fix npm security vulnerabilities ( Avoid disrupting CircleCI execution)
npm audit fix --force || true
# Recreate HTTPS certificate files
echo "$PRIVATE_KEY" | sed 's/\\n/\n/g' > privatekey.pem
echo "$SERVER" | sed 's/\\n/\n/g' > server.crt
# Stop the old process and start a new one
pm2 stop DevOpsSec-Group-Project || true
pm2 restart DevOpsSec-Group-Project || pm2 start ./bin/www --name DevOpsSec-Group-Project

echo "Deployment completed successfully!"
