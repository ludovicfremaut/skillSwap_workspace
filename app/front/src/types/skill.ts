/**
 * TYPES TYPESCRIPT POUR LES COMPÉTENCES
 * 
 * Ce fichier définit les interfaces TypeScript pour les compétences
 * dans l'application SkillSwap côté frontend. Les compétences sont
 * les éléments centraux autour desquels s'organisent tous les échanges.
 * 
 * Interface ISkill :
 * Structure simple et efficace d'une compétence :
 * - ID unique pour l'identification en base de données
 * - Nom de la compétence pour l'affichage utilisateur
 * 
 * Utilisation dans l'application :
 * - Sélection de compétences lors de l'inscription
 * - Affichage des compétences dans les profils utilisateur
 * - Filtrage et recherche de services par compétences
 * - Système de tags pour les services proposés/demandés
 * - Matching entre offres et demandes de compétences
 * 
 * Exemples de compétences :
 * - Techniques : "Développement web", "Réparation informatique"
 * - Créatives : "Photographie", "Design graphique", "Musique"
 * - Pratiques : "Cuisine", "Jardinage", "Bricolage"
 * - Éducatives : "Langues étrangères", "Mathématiques", "Histoire"
 * 
 * Correspondance backend :
 * Cette interface correspond exactement au modèle Skill.model.ts
 * côté backend pour garantir la cohérence des données.
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

// Skill interface for frontend TypeScript validation
export interface ISkill {
    id: number; // Unique skill identifier (primary key)
    name: string; // Skill name for display (e.g., "Développement web", "Cuisine")
}