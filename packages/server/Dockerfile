FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy root config files
COPY tsconfig.json ./
COPY package*.json ./

# Create server directory and set it up
WORKDIR /app/packages/server

# Copy server package files
COPY packages/server/package*.json ./
COPY packages/server/tsconfig.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy source code
COPY packages/server/src ./src

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]
