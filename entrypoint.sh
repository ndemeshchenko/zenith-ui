#!/bin/sh

set -e

# Check if required environment variables are set
if [ -z "$VITE_ZENITH_ENDPOINT" ]; then
  echo "Error: VITE_ZENITH_ENDPOINT is not set."
  exit 1
fi

if [ -z "$VITE_ZENITH_API_TOKEN" ]; then
  echo "Error: VITE_ZENITH_API_TOKEN is not set."
  exit 1
fi

# Generate config.js
echo "Generating config.js with environment variables..."
cat <<EOF > /usr/share/nginx/html/config.js
window._env_ = {
  VITE_ZENITH_ENDPOINT: "${VITE_ZENITH_ENDPOINT}",
  VITE_ZENITH_API_TOKEN: "${VITE_ZENITH_API_TOKEN}"
};
EOF

# Start nginx
echo "Starting nginx..."
exec nginx -g 'daemon off;'
