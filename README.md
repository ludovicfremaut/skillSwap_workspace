# SkillSwap - Plateforme d'échange de compétences

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue)](https://www.docker.com/)

> **Connectez-vous, échangez vos compétences, apprenez ensemble !**

SkillSwap est une plateforme collaborative permettant aux utilisateurs d'échanger leurs compétences de manière gratuite et conviviale. Trouvez des mentors locaux, proposez vos services, et créez des liens authentiques autour de l'apprentissage.

## Fonctionnalités principales

### MVP (Minimum Viable Product)

- **Authentification sécurisée** (JWT + Argon2)
- **Gestion des profils** avec compétences personnalisées
- **Recherche avancée** par compétence et localisation
- **Catalogue des services** avec filtres multiples
- **Messagerie interne** sécurisée
- **Page d'accueil** attractive et informative

### Fonctionnalités avancées

- **Profils aléatoires** pour découvrir de nouveaux talents
- **Modification de profil** en temps réel
- **Géolocalisation** par code postal
- **Pages détaillées** des prestataires
- **Système de contact** direct

## Architecture technique

### Stack technologique

- **Frontend** : React 18 + TypeScript + Tailwind CSS + Vite
- **Backend** : Node.js + Express + TypeScript + Sequelize ORM
- **Base de données** : PostgreSQL 15
- **Conteneurisation** : Docker + Docker Compose
- **Sécurité** : JWT + Argon2 + Helmet + CORS + Validation Joi

### Architecture 3-tiers
```
┌─────────────────┐   HTTP/JSON    ┌─────────────────┐   SQL/ORM   ┌─────────────────┐
│     REACT       │ ◄────────────► │    EXPRESS      │ ◄─────────► │   POSTGRESQL    │
│   Frontend      │  (API calls)   │    Backend      │ (Sequelize) │    Database     │
│  (Port 5173)    │                │  (Port 3000)    │             │  (Port 5432)    │
└─────────────────┘                └─────────────────┘             └─────────────────┘
```

## Démarrage rapide

### Prérequis
- [Docker](https://www.docker.com/get-started) et Docker Compose installés
- [Git](https://git-scm.com/) pour cloner le projet
- Port 3000, 5173 et 5432 disponibles

### Installation

1. **Cloner le projet**
```bash
git clone https://github.com/ludovicfremaut/skillSwap_workspace.git
cd skillSwap_workspace
```

2. **Lancer l'application avec Docker**
```bash
# Démarrer tous les services (base de données, backend, frontend)
docker-compose up -d

# Vérifier que tous les services sont opérationnels
docker-compose ps
```

3. **Attendre l'initialisation complète** (30-60 secondes)
```bash
# Vérifier les logs pour s'assurer que tout démarre bien
docker-compose logs -f
```

### Accès à l'application

Une fois l'installation terminée, l'application est accessible sur :

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Interface utilisateur principale |
| **Backend API** | http://localhost:3000 | API REST (endpoints disponibles) |
| **Base de données** | localhost:5432 | PostgreSQL (skillswap/skillswap) |

### Vérification du bon fonctionnement

**Test rapide des services :**
```bash
# Frontend accessible
curl http://localhost:5173

# API Backend opérationnelle
curl http://localhost:3000/api/health

# Base de données connectée
docker-compose exec database psql -U skillswap -c "SELECT version();"
```

**Indicateurs de succès :**

- Page d'accueil SkillSwap s'affiche sur http://localhost:5173
- API répond avec un status 200 sur http://localhost:3000
- Aucune erreur dans `docker-compose logs`

## Utilisation de l'application

### Première connexion
1. **Ouvrir** http://localhost:5173 dans votre navigateur
2. **S'inscrire** avec un email et mot de passe sécurisé
3. **Compléter** votre profil avec vos compétences
4. **Rechercher** des services ou proposer les vôtres
5. **Contacter** d'autres utilisateurs via la messagerie

### Comptes de test (si seeds activées)
```
Email: alice@example.com | Mot de passe: password123
Email: bob@example.com   | Mot de passe: password123
Email: charlie@example.com | Mot de passe: password123
```

## Développement

### Structure du projet
```
skillSwap_workspace/
├── app/
│   ├── back/                 # API Backend Express + TypeScript
│   │   ├── src/
│   │   │   ├── controllers/  # Logique métier
│   │   │   ├── models/       # Modèles Sequelize
│   │   │   ├── routers/      # Routes API REST
│   │   │   ├── middleware/   # Sécurité et validation
│   │   │   └── schemas/      # Validation Joi
│   │   └── package.json
│   └── front/                # Frontend React + TypeScript
│       ├── src/
│       │   ├── components/   # Composants réutilisables
│       │   ├── pages/        # Pages de l'application
│       │   ├── hooks/        # Hooks personnalisés
│       │   ├── services/     # Appels API
│       │   └── types/        # Types TypeScript
│       └── package.json
├── docker-compose.yml        # Orchestration des services
└── README.md                # Ce fichier
```

### Commandes de développement

**Docker Compose :**
```bash
# Démarrer les services en arrière-plan
docker-compose up -d

# Voir les logs en temps réel
docker-compose logs -f [service]

# Redémarrer un service spécifique
docker-compose restart [backend|frontend|database]

# Arrêter tous les services
docker-compose down

# Nettoyer complètement (supprime les volumes)
docker-compose down -v
```

**Développement local (optionnel) :**
```bash
# Backend
cd app/back
npm install
npm run dev        # Mode développement avec hot reload

# Frontend  
cd app/front
npm install
npm run dev        # Serveur de développement Vite
```

### Base de données

**Accès direct à PostgreSQL :**
```bash
# Se connecter à la base de données
docker-compose exec database psql -U skillswap -d skillswap

# Commandes SQL utiles
\dt                 # Lister les tables
\d users           # Décrire la table users
SELECT * FROM users LIMIT 5;
```

**Migrations et seeds :**
```bash
# Exécuter les migrations
docker-compose exec backend npm run migrate

# Peupler avec des données de test
docker-compose exec backend npm run seed
```

## Tests

### Lancer les tests automatisés

**Tests complets :**
```bash
# Tests backend (API + base de données)
docker-compose exec backend npm test

# Tests avec couverture
docker-compose exec backend npm run test:coverage

# Tests frontend (composants React)
docker-compose exec frontend npm test
```

**Résultats attendus :**

- **89% de couverture** de tests minimum
- **Tests unitaires** (controllers, models)
- **Tests d'intégration** (API endpoints)
- **Tests E2E** (parcours utilisateur critiques)

## Sécurité

### Mesures de sécurité implémentées

- **Authentification** : JWT avec expiration + Argon2 pour les mots de passe
- **Validation** : Joi pour toutes les entrées utilisateur
- **Sanitisation** : DOMPurify contre les attaques XSS
- **CORS** : Configuration stricte des origines autorisées
- **Headers sécurisés** : Helmet.js pour les bonnes pratiques
- **Rate limiting** : Protection contre les attaques par déni de service

### Variables d'environnement sensibles

Les secrets sont gérés via variables d'environnement :
```bash
JWT_SECRET=your_super_secure_jwt_secret_here
DATABASE_URL=postgresql://skillswap:skillswap@database:5432/skillswap
ARGON2_MEMORY_COST=65536
ARGON2_TIME_COST=3
```

## API Endpoints

### Authentification
```http
POST   /api/auth/register     # Inscription utilisateur
POST   /api/auth/login        # Connexion utilisateur  
GET    /api/auth/profile      # Profil utilisateur connecté
```

### Services
```http
GET    /api/services          # Liste des services (avec filtres)
POST   /api/services          # Créer un nouveau service
GET    /api/services/:id      # Détails d'un service
PUT    /api/services/:id      # Modifier un service (propriétaire)
DELETE /api/services/:id      # Supprimer un service (propriétaire)
```

### Utilisateurs
```http
GET    /api/users             # Liste des utilisateurs
GET    /api/users/:id         # Profil d'un utilisateur
PUT    /api/users/:id         # Modifier son profil
```

### Messagerie
```http
GET    /api/messages          # Conversations de l'utilisateur
POST   /api/messages          # Envoyer un nouveau message
PUT    /api/messages/:id/read # Marquer un message comme lu
```

### Format des réponses
```json
{
  "success": true,
  "data": { ... },
  "message": "Opération réussie"
}
```

## Dépannage

### Problèmes courants

**Port déjà utilisé :**
```bash
# Trouver le processus utilisant le port
lsof -i :3000
# Tuer le processus ou changer le port
```

**Base de données non accessible :**
```bash
# Redémarrer les services
docker-compose down && docker-compose up -d
# Vérifier les logs
docker-compose logs database
```

**Erreurs CORS :**
```bash
# Vérifier que frontend et backend utilisent les bonnes URLs
# Frontend : http://localhost:5173
# Backend : http://localhost:3000
```

**Services ne démarrent pas :**
```bash
# Nettoyer les conteneurs et volumes
docker-compose down -v
docker system prune -f
docker-compose up -d
```

## Déploiement en production

### Préparation
```bash
# Build optimisé du frontend
docker-compose exec frontend npm run build

# Tests complets avant déploiement
docker-compose exec backend npm run test:ci
```

### Variables d'environnement production
```bash
NODE_ENV=production
JWT_SECRET=your_production_jwt_secret
DATABASE_URL=your_production_database_url
FRONTEND_URL=https://your-domain.com
```

## Équipe de développement

**Projet développé par l'équipe SkillSwap :**

- **Ludovic Fremaut** - Lead Developer Frontend (React/TypeScript)
- **Anthony** - Lead Developer Backend (Node.js/Express) 
- **Maxime** - Product Owner (Définition besoins)
- **Karine** - Scrum Master (Méthodologie Agile)

**Méthodologie :** Agile/Scrum avec sprints d'1 semaine

## Licence

Ce projet est développé dans le cadre de la formation **Concepteur Développeur d'Applications (CDA)** chez O'clock.

## Contribution

Ce projet est actuellement en développement dans le cadre d'un cursus de formation.

Pour toute question ou suggestion :

- Email : ludovic.fremaut@example.com
- LinkedIn : [Ludovic Fremaut](https://linkedin.com/in/ludovic-fremaut)

---

**SkillSwap - Parce que le savoir n'a de valeur que lorsqu'il est partagé !**
