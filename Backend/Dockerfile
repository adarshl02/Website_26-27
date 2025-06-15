# Stage 1: Build
FROM node:alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production && \
    npm cache clean --force
COPY . .

# Stage 2: Runtime
FROM node:alpine
WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app ./

# Runtime configurations
EXPOSE 3000
ENV NODE_ENV=production
USER node  # Run as non-root for security
CMD ["node", "index.js"]