/**
 * CONTRÔLEUR DE GESTION DES COMPÉTENCES
 * 
 * Ce contrôleur gère toutes les opérations liées aux compétences dans l'application SkillSwap.
 * Les compétences sont les éléments centraux autour desquels s'organisent les échanges
 * entre utilisateurs. Ce contrôleur fournit les endpoints pour leur gestion.
 * 
 * Fonctionnalités principales :
 * - Récupération de toutes les compétences disponibles
 * - Tri alphabétique des compétences pour faciliter la navigation
 * - Fourniture de données structurées pour les interfaces utilisateur
 * - Support des systèmes de filtrage et de recherche
 * 
 * Utilisation des compétences :
 * - Sélection lors de l'inscription utilisateur
 * - Filtrage dans les recherches de services
 * - Système de tags pour les profils utilisateurs
 * - Matching entre offres et demandes de services
 * 
 * Structure des données :
 * - ID unique pour chaque compétence
 * - Nom de la compétence (ex: "Développement web", "Cuisine", "Jardinage")
 * - Tri alphabétique pour améliorer l'expérience utilisateur
 * 
 * Évolutions futures possibles :
 * - Création dynamique de nouvelles compétences
 * - Système de catégories de compétences
 * - Statistiques d'utilisation des compétences
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Request, Response } from "express";
import { Skill } from "../models/associations";

// Interface defining skill controller methods
interface SkillController {
  getAllSkills(req: Request, res: Response): Promise<void>; // Fetch all available skills
}

const skillController: SkillController = {
  // Get all skills sorted alphabetically
  getAllSkills: async (req: Request, res: Response) => {
    try {
      // Fetch all skills with only necessary attributes
      const skills = await Skill.findAll({
        attributes: ["id", "name"], // Only return ID and name
        order: [["name", "ASC"]], // Sort alphabetically by name
      });
      
      // Return skills data for frontend consumption
      res.status(200).json(skills);
      return;
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  },
};

export default skillController;
