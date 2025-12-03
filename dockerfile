# ===== Stage 1: build Angular client =====
FROM node:20-alpine AS client-build

# Work inside the Angular project
WORKDIR /usr/src/app/client

# Install Angular deps
COPY client/package*.json ./
RUN npm ci

# Copy the rest of the Angular app and build
COPY client/ .
RUN npm run build

# ===== Stage 2: server + static Angular =====
FROM node:20-alpine

# Work inside the server project
WORKDIR /usr/src/app/server

# Install server deps
COPY server/package*.json ./
RUN npm ci --omit=dev

# Copy server source
COPY server/ .

# Copy built Angular app from stage 1
# Result: /usr/src/app/client/dist/... will exist inside the container
COPY --from=client-build /usr/src/app/client/dist /usr/src/app/client/dist

# Environment and port
ENV NODE_ENV=production
EXPOSE 4300

# Start Express API
CMD ["node", "server.js"]
