FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy root workspace files
COPY package*.json ./
COPY tsconfig.json ./
COPY lerna.json ./

# Copy server package files
COPY packages/server/package*.json ./packages/server/

# Install dependencies
RUN npm install --ignore-scripts \
    && cd packages/server \
    && npm install --ignore-scripts

# Copy source code
COPY packages/server/src ./packages/server/src
COPY packages/server/tsconfig.json ./packages/server/

# Build the application
RUN cd packages/server && npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "packages/server/dist/index.js"]
