# Stage 1: Build the application
FROM node:lts-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:stable-alpine AS production-stage

# Copy the built files from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the entrypoint script into the image
COPY entrypoint.sh /entrypoint.sh

# Ensure the entrypoint script is executable
RUN chmod +x /entrypoint.sh

# (Optional) Copy custom nginx configuration if you have one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Set the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
