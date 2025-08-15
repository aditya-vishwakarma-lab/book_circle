# Development stage
FROM node:24-alpine AS development
WORKDIR /frontend
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Build stage
FROM node:24-alpine AS build
WORKDIR /frontend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=build /frontend/dist /usr/share/nginx/html
RUN adduser -D -H -u 1001 -s /sbin/nologin webuser
RUN chown -R webuser:webuser /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx
USER webuser
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
