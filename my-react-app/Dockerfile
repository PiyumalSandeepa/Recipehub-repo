# Use the latest LTS version of Node.js
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Environment variable to ensure file watching works in Docker
ENV CHOKIDAR_USEPOLLING=true

# Expose the React dev server port
EXPOSE 3000

# Start the React dev server
CMD ["npm", "start"]
