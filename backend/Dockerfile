# Use the latest LTS Node.js
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json first (for caching)
COPY package*.json ./

# Install dependencies + nodemon globally
RUN npm install && npm install -g nodemon

# Copy the rest of your app
COPY . .

# Expose backend port (e.g., 4000)
EXPOSE 4000

# Start the app in dev mode
CMD ["npm", "run", "dev"]
