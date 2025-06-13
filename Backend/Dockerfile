FROM node:22.9.0-alpine
# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project files
COPY . .

# Expose the app port (adjust if needed)
EXPOSE 3000

# Set environment to production (optional)
ENV NODE_ENV=production

# Start the application
CMD ["node", "index.js"]
