/**
 * POINT D'ENTRÉE DU SERVEUR SKILLSWAP
 * 
 * Ce fichier sert de point d'entrée principal pour le serveur backend de SkillSwap.
 * Il importe la configuration de l'application Express et démarre le serveur HTTP
 * sur le port spécifié dans les variables d'environnement.
 * 
 * Le serveur gère :
 * - L'authentification et l'inscription des utilisateurs
 * - La gestion des compétences et des services
 * - Les échanges de messages entre utilisateurs
 * - Les endpoints API pour l'application frontend
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import app from "./app";

// Start the HTTP server on the configured port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
