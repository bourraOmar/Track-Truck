# Dockerfile pour le Backend (Node.js/Express)

# Étape 1 : Image de base
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app/backend

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le reste du code
COPY . .

# Exposer le port du serveur
EXPOSE 5000

# Commande de démarrage
CMD ["npm", "start"]
