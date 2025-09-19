FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
# Para que Vite sea accesible desde fuera del contenedor:
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
