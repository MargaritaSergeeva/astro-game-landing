# ─────────────────────────────────────────────
# Stage 1 — Build
# ─────────────────────────────────────────────
FROM node:24-alpine AS builder

WORKDIR /app

# Activate the exact Yarn version pinned in package.json
RUN corepack enable && corepack prepare yarn@4.17.0 --activate

# Install deps first — layer is cached until package manifests change
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

# Copy source
COPY . .

# Astro reads .env automatically via Vite during build
ENV ASTRO_TELEMETRY_DISABLED=1

RUN yarn build

# ─────────────────────────────────────────────
# Stage 2 — Serve
# ─────────────────────────────────────────────
FROM nginx:stable-alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
