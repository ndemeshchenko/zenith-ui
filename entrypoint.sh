#!/bin/sh

set -e

# Check if required environment variables are set
if [ -z "$API_BASE_URL" ]; then
  echo "Error: $API_BASE_URL is not set."
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
  VITE_ZENITH_API_TOKEN: "${VITE_ZENITH_API_TOKEN}"
};
EOF

sed -i "s|__API_BASE_URL__|$API_BASE_URL|g" /etc/nginx/conf.d/default.conf

# Start nginx
echo "Starting nginx..."
exec nginx -g 'daemon off;'
