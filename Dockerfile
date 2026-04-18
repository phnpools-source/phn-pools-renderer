FROM mcr.microsoft.com/playwright:v1.48.0-noble

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the app
COPY . .

# Expose port for Railway
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
