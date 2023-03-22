# Utilise l'image officielle Node.js comme image de base
FROM node:latest

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le fichier package.json et le package-lock.json (s'ils existent) dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances de l'application
RUN npm install

# Copie le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Expose le port 8081
EXPOSE 8081

# Démarre l'application
CMD [ "npm", "start" ]
