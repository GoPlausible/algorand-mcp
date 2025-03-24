FROM node:23.6.1-alpine

# Set working directory
WORKDIR /app

# Copy workspace files
COPY package*.json ./
COPY tsconfig.json ./

# Install root dependencies
RUN npm install --ignore-scripts

# Copy server files
WORKDIR /app/packages/server
COPY packages/server/package*.json ./
COPY packages/server/tsconfig.json ./

# Install server dependencies
RUN npm install --ignore-scripts

# Copy source code
COPY packages/server/src ./src

# Build with full TypeScript configuration
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]
