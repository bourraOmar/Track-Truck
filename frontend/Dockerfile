# Dockerfile pour le Frontend (React/Vite)

# Étape 1 : Build
FROM node:20-alpine AS build

WORKDIR /app/frontend

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Production avec Nginx
FROM nginx:alpine

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers compilés depuis l'étape de build
COPY --from=build /app/frontend/dist /usr/share/nginx/html

# Exposer le port
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
