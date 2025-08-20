# Base image
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Dependencies stage (only install all deps here)
FROM base AS deps
COPY package*.json ./
RUN npm install

# Build stage (use full deps)
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
RUN npm run build

# Production dependencies only
FROM base AS prod-deps
COPY package*.json ./
RUN npm install --omit=dev

# Production stage
FROM base AS production
ENV NODE_ENV=production

# Copy production-only node_modules
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy dist + prisma schema
COPY --from=build /app/dist ./dist
COPY prisma ./prisma

# Generate Prisma client (only for alpine/linux-musl target)
RUN npx prisma generate --no-engine && \
    npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
