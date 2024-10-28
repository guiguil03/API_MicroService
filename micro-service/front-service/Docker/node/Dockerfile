# Use a base image for Node.js
FROM node:lts-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the frontend directory
COPY ./package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files from the frontend directory
COPY ./ ./

# Expose the port the application runs on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]