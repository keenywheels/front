FROM oven/bun:1.3-debian AS base
WORKDIR /app

FROM base AS dev-deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS prod-deps
COPY package.json bun.lock ./
RUN bun install --production --frozen-lockfile

FROM base AS build
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1.3-debian AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY package.json bun.lock ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["bun", "run", "start"]
