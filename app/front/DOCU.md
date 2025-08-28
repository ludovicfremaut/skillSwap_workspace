# Projet SkillSwap 1

Un repo FRONT et un REPO BACK.

## Côté BACK

### Pré-requis

- Node.js version 18 ou supérieure
- PostgreSQL version 15 ou supérieure
- (Optionnel) Docker & Docker Compose


## 1. Installation avec Docker

### Préparation

#### a. Créez un fichier .env à la racine du projet et le remplir.

    PG_URL=postgres://skillswap:skillswap@db:5432/skillswap
    JWT_SECRET_KEY=une_clé_secrète
    POSTGRES_USER=skillswap
    POSTGRES_PASSWORD=skillswap
    POSTGRES_DB=skillswap

#### b. Lancement avec Docker compose

Dans le terminal : 

    docker compose up -- build

Cela va :

- Lancer la base de données PostrgeSQL.

- Lancer le serveur Node.js

- Appliquer les migrations et le seed automatiquement.

#### c. Accès à l'API

http://localhost:3000


## 2. Installation sans Docker

#### a. Cloner le dépôt back

    git clone https://github.com/O-clock-Skadi/skillswap.git  

#### b. Installer les dépendances

    cd ../skillswap-front
    npm install

#### c. Configurer la base de données

Dans skillswap-back, créez un fichier .env :

    PORT=3000
    PG_URL=postgres://skillswap:skillswap@localhost:5432/skillswap
    JWT_SECRET_KEY=une_clé_secrète

#### d. Initialiser la base de données

Dans skillswap-back :

    npm run db:create
    npm run db:seed

#### e. Démarrer le serveur BACK

    npm run dev

## Côté FRONT

Le front React/Vite n'est pas dockerisé ici. Suivre les consignes ci-dessous.

#### a. Cloner le dépôt front

    git clone https://github.com/O-clock-Skadi/skillswap.git  

#### b. Installer les dépendances

    cd ../skillswap-front
    npm install

#### c. Démarrer le serveur 

    npm run dev

#### d. Accès au site

http://localhost:5173
