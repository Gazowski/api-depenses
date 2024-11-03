# Utiliser une image Node.js officielle comme image de base
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier les fichiers et dossiers du projet dans le répertoire de travail du conteneur
COPY . .

# Exposer le port sur lequel l'API va s'exécuter
EXPOSE 3003

# Définir la commande pour démarrer l'API
CMD [ "npm", "run", "start" ]