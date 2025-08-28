/**
 * SCHÉMA DE VALIDATION D'AUTHENTIFICATION ZOD
 * 
 * Ce schéma définit les règles de validation pour les données d'authentification
 * (email et mot de passe) utilisées lors de la connexion et de l'inscription.
 * Il garantit la sécurité et la qualité des données avant traitement.
 * 
 * Validation de l'email :
 * - Format conforme aux standards RFC 5322
 * - Vérification automatique de la syntaxe
 * - Message d'erreur personnalisé en français
 * 
 * Validation du mot de passe (politique de sécurité stricte) :
 * - Longueur minimale : 8 caractères
 * - Longueur maximale : 100 caractères
 * - Au moins une lettre majuscule (A-Z)
 * - Au moins une lettre minuscule (a-z)
 * - Au moins un chiffre (0-9)
 * - Au moins un caractère spécial (!@#$%^&*)
 * 
 * Sécurité implémentée :
 * - Protection contre les mots de passe faibles
 * - Prévention des attaques par dictionnaire
 * - Complexité suffisante pour résister au bruteforce
 * - Messages d'erreur détaillés pour guider l'utilisateur
 * 
 * Utilisation :
 * - Middleware validateAuth pour les routes /login et /register
 * - Validation côté serveur avant traitement des données
 * - Garantie de la qualité des données en base
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { z } from "zod";

// Authentication schema with strict validation rules
const authSchema = z.object({
  email: z.string().email({ message: "Email invalide" }), // Valid email format required
  password: z
    .string()
    .min(8, { message: "Mot de passe trop court" }) // Minimum 8 characters
    .max(100, { message: "Mot de passe trop long" }) // Maximum 100 characters
    .regex(/[A-Z]/, { message: "Doit contenir une majuscule" }) // At least one uppercase letter
    .regex(/[a-z]/, { message: "Doit contenir une minuscule" }) // At least one lowercase letter
    .regex(/\d/, { message: "Doit contenir un chiffre" }) // At least one digit
    .regex(/[^A-Za-z0-9]/, { message: "Doit contenir un caractère spécial" }), // At least one special character
});

export default authSchema;
