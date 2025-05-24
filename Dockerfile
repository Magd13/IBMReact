# ---------- Etapa 1: build del cliente React ----------
    FROM node:14 AS builder
    WORKDIR /app
    
    # Copiamos solo package.json para cachear npm install
    COPY package.json package-lock.json ./
    RUN npm install
    
    # Copiamos todo el código y corremos build de React
    COPY . .
    RUN npm run build   ## Este script ya mueve build/ a server/build/ si lo tienes configurado
    
    # ---------- Etapa 2: servidor Express en modo producción ----------
    FROM node:14-alpine AS runner
    WORKDIR /app
    
    # Copiamos package.json y solo instalamos prod deps
    COPY package.json package-lock.json ./
    RUN npm install --production
    
    # Copiamos la carpeta del servidor
    COPY server ./server
    
    # Copiamos el build del cliente desde la etapa builder
    COPY --from=builder /app/server/build ./server/build
    
    # Nos movemos al directorio del servidor
    WORKDIR /app/server
    
    # Exponemos el puerto que usa Express (ej. 8181)
    EXPOSE 8181
    
    # Comando final: arranca tu servidor Express
    CMD ["node", "index.js"]
    