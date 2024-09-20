FROM node:lts-alpine

# Set working directory
WORKDIR shop/new_shop_backend

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port 4000
EXPOSE 4000

# Start the express js application
CMD ["node", "index.js"]
