# Usamos la imagen oficial de Node.js LTS
FROM node:18-alpine

# Crear y usar el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias (sin la carpeta node_modules)
RUN npm install --production

# Copiar todo el código fuente al contenedor
COPY . .

# Puerto en el que correrá la app
EXPOSE 3000

# Variable de entorno para producción (opcional)
ENV NODE_ENV=production

# Comando para arrancar el servidor
CMD ["node", "server.js"]
