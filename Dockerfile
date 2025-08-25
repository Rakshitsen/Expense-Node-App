# FROM node:22
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# ENTRYPOINT [ "node" ]
# CMD ["index.js"]





# ---------- Stage 1: Build ----------
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false

COPY . .

# ---------- Stage 2: Runtime ----------
FROM node:22-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js ./index.js
COPY --from=builder /app/views ./views

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["index.js"]
