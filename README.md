# SkillSwap - Plateforme d'échange de compétences

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue)](https://www.docker.com/)

> **Plateforme collaborative d'échange de compétences entre particuliers**

## Présentation du projet

SkillSwap permet aux utilisateurs d'échanger leurs compétences de manière gratuite et conviviale. 
**Objectif :** Créer des liens authentiques autour de l'apprentissage et du partage de savoir-faire.

## Fonctionnalités principales

- **Authentification sécurisée** (JWT + hashage Argon2)
- **Gestion des profils** avec compétences personnalisées  
- **Recherche et filtres** par compétence et localisation
- **Catalogue des services** avec système CRUD complet
- **Messagerie interne** sécurisée entre utilisateurs
- **Interface responsive** adaptée mobile/desktop

## Technologies utilisées

### Backend
- **Node.js** + Express.js + TypeScript
- **PostgreSQL** avec Sequelize ORM
- **Sécurité :** JWT, Argon2, Helmet, CORS

### Frontend  
- **React 18** + TypeScript + Vite
- **Tailwind CSS** pour le design
- **Hooks personnalisés** pour la logique métier

### DevOps
- **Docker** + Docker Compose
- **Architecture 3-tiers** conteneurisée

## Installation et démarrage

### Prérequis
- **Docker Desktop** installé et démarré
- Ports 3000, 5173 et 5432 disponibles

### Lancement rapide
```bash
# Cloner le projet
git clone https://github.com/ludovicfremaut/skillSwap_workspace.git
cd skillSwap_workspace

# Démarrer tous les services avec build automatique
docker-compose up --build

# Accéder à l'application
open http://localhost:5173
```

> **Note importante :** Les migrations et seeds se lancent automatiquement au démarrage !  
> La base de données est créée et peuplée avec des données de test lors du premier `docker-compose up --build`

### Services disponibles
| Service             | URL                   | Description                       |
| ------------------- | --------------------- | --------------------------------- |
| **Frontend**        | http://localhost:5173 | Interface React                   |
| **API Backend**     | http://localhost:3000 | API REST                          |
| **Base de données** | localhost:5432        | PostgreSQL (avec données de test) |

## Structure du projet

```
skillSwap_workspace/
├── app/
│   ├── back/              # API Backend (Express + TypeScript)
│   │   ├── src/
│   │   │   ├── controllers/   # Logique métier
│   │   │   ├── models/        # Modèles Sequelize  
│   │   │   ├── routers/       # Routes API
│   │   │   └── middleware/    # Sécurité et validation
│   │   └── package.json
│   └── front/             # Frontend (React + TypeScript)
│       ├── src/
│       │   ├── components/    # Composants réutilisables
│       │   ├── pages/         # Pages de l'application
│       │   ├── hooks/         # Hooks personnalisés
│       │   └── services/      # Appels API
│       └── package.json
├── docker-compose.yml     # Orchestration des services
└── README.md             # Ce fichier
```

## Sécurité

- **Authentification JWT** avec expiration automatique
- **Hashage des mots de passe** avec Argon2
- **Validation stricte** des données (Joi + sanitisation)
- **Protection CORS** et headers sécurisés (Helmet)

## Utilisation

1. **S'inscrire** avec email et mot de passe
2. **Compléter son profil** avec ses compétences
3. **Rechercher des services** ou en proposer
4. **Contacter** d'autres utilisateurs via messagerie

### Comptes de test disponibles

Après les seeds automatiques, vous pouvez utiliser ces comptes :

```
Email: alice@example.com    | Mot de passe: Password_alice_1
Email: bob@example.com      | Mot de passe: Password_bob_1 
Email: carol@example.com    | Mot de passe: Password_carol_1
```

> Ces comptes ont déjà des profils complets avec compétences et services pour tester toutes les fonctionnalités !

## Équipe de développement

**Projet réalisé dans le cadre de la formation CDA (Concepteur Développeur d'Applications)**

- **Ludovic Fremaut** - Lead Developer Frontend  
- **Anthony** - Lead Developer Backend
- **Maxime** - Product Owner
- **Karine** - Scrum Master

**Méthodologie :** Agile/Scrum avec sprints d'1 semaine

---

**SkillSwap - Parce que le savoir n'a de valeur que lorsqu'il est partagé ! Alors partagez vos talents, découvrez ceux des autres !**
