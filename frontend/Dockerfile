# 1. Construir la app con Node.js
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

# Instalar todas las dependencias, incluyendo dev
RUN npm install --include=dev

COPY . .

# Construir la app
RUN npm run build

# 2. Servir la app estática con Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
