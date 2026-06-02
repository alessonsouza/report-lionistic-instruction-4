# syntax=docker/dockerfile:1

# ---- Build stage: compile the Vite app with Bun ----
FROM oven/bun:1 AS build
WORKDIR /app

# Install deps first (cached unless manifests change)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the static site (tsc -b && vite build -> /app/dist)
COPY . .
RUN bun run build

# ---- Runtime stage: serve the static build with nginx ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
