# # Use Node.js 20 Alpine
# FROM node:20-alpine

# WORKDIR /app

# # Copy package.json & package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all backend files
# COPY . .

# # Expose backend port from .env (9000)
# EXPOSE 9000

# # Run server
# CMD ["node", "server.js"]

# FROM mirror.gcr.io/library/node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --legacy-peer-deps

# COPY . .

# # Expose your API port
# EXPOSE 9001

# # Start your backend application
# CMD ["node", "server.js"]

# -------- Stage 1: Builder --------
FROM mirror.gcr.io/library/node:18 AS builder

WORKDIR /app

# Copy only package files first (better layer caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production --legacy-peer-deps

# Copy rest of backend source
COPY . .

# -------- Stage 2: Final Slim Image --------
FROM mirror.gcr.io/library/node:18-slim

WORKDIR /app

# Copy only required files from builder image
COPY --from=builder /app /app

# Expose backend port
EXPOSE 9000

# Start server
CMD ["node", "server.js"]
