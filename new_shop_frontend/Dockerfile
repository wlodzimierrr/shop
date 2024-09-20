FROM node:lts-alpine

# Set working directory
WORKDIR /shop/new_shop_frontend

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the react application
RUN npm run build

# Expose the port 4242
EXPOSE 4242

# Start the React application
CMD ["npm", "run", "preview"]
