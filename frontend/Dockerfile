# 1. Construir la app con Node.js
FROM node:18-alpine as build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# 2. Servir la app estática con Nginx
FROM nginx:stable-alpine

# Copiar archivos build al directorio donde nginx sirve contenido
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración nginx si tienes (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]