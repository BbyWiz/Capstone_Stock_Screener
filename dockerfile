# Lightweight Node image
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy backend package files and install dependencies
COPY server/package*.json ./server/

WORKDIR /usr/src/app/server
RUN npm install --omit=dev

# Copy backend source
COPY server/ /usr/src/app/server

# Set port (Azure will override PORT via env var, but this is a sane default)
ENV PORT=4300
EXPOSE 4300

# Start the Express API
CMD ["node", "server.js"]
