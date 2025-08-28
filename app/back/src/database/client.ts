/**
 * CLIENT DE BASE DE DONNÉES SEQUELIZE
 * 
 * Ce fichier configure et initialise la connexion à la base de données PostgreSQL
 * en utilisant Sequelize ORM. Il gère la configuration des timestamps automatiques
 * et teste la connexion au démarrage de l'application.
 * 
 * Fonctionnalités :
 * - Configuration de la connexion PostgreSQL via variable d'environnement
 * - Définition des timestamps automatiques (created_at, updated_at)
 * - Test de connexion au démarrage
 * - Export de l'instance Sequelize pour utilisation dans les modèles
 * 
 * Variables d'environnement requises :
 * - PG_URL : URL de connexion PostgreSQL (format: postgresql://user:password@host:port/database)
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import "dotenv/config"; // Load environment variables
import { Sequelize } from "sequelize";

// Validate required environment variable
if (!process.env.PG_URL) {
  throw new Error("PG_URL variable environment is required !");
}

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    timestamps: true, // Enable automatic timestamps
    createdAt: "created_at", // Custom name for creation timestamp
    updatedAt: "updated_at", // Custom name for update timestamp
  },
});

// Test database connection on startup
try {
  await sequelize.authenticate();
  console.log("connection has been established succesfully.");
} catch (error) {
  console.log("Unable to connect to the database.", error);
}

export default sequelize;