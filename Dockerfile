# Imagen base
FROM node:18

RUN mkdir -p /usr/src/app

# Establece la ruta de trabajo para las siguientes instrucciones
WORKDIR /usr/src/app

# Copia el código de la aplicación al contenedor 
COPY package.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia todos los archivos y carpetas del directorio actual 
COPY . .

# Indica que el contenedor escuchará en el puerto 8080
EXPOSE 8080

# Especifica el comando por defecto para ejecutar al iniciar el contenedor
CMD ["npm", "start"]