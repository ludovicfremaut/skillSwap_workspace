/**
 * MIDDLEWARE D'AUTHENTIFICATION JWT
 * 
 * Ce middleware vérifie l'authentification des utilisateurs en validant
 * les tokens JWT envoyés dans les requêtes. Il protège les routes sensibles
 * en s'assurant que seuls les utilisateurs authentifiés peuvent y accéder.
 * 
 * Fonctionnalités :
 * - Extraction du token depuis les cookies ou l'en-tête Authorization
 * - Validation de la signature et de l'expiration du token JWT
 * - Vérification de l'intégrité des données utilisateur dans le payload
 * - Ajout des données utilisateur à l'objet Request pour utilisation ultérieure
 * - Gestion d'erreurs spécifiques (token expiré, invalide, manquant)
 * 
 * Sources de token supportées :
 * 1. Cookie HttpOnly 'accessToken' (méthode préférée pour la sécurité)
 * 2. En-tête Authorization avec format 'Bearer <token>'
 * 
 * Sécurité :
 * - Validation stricte du format du token
 * - Vérification de la signature avec clé secrète
 * - Contrôle de l'expiration automatique
 * - Protection contre les tokens malformés
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// JWT secret key from environment variables
const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

// Extended Request interface to include authenticated user data
interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string }; // User data added after successful authentication
}

// Middleware to verify JWT token and authenticate users
export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  // console.log("Vérification du token...");
  
  // First, check for token in HTTP-only cookies (preferred method)
  let token = req.cookies?.accessToken;
  // console.log("Token trouvé dans les cookies :", req.cookies);
  
  // If not found in cookies, check Authorization header as fallback
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1]; // Extract token from "Bearer <token>"
  }

  // No token found - user is not authenticated
  if (!token) {
    // console.log("Perdu");
    res.status(401).json({ message: "Perdu" });
    return;
  }

  try {
    // Verify token signature and decode payload
    const decoded = jwt.verify(token, jwtSecretKey) as jwt.JwtPayload;

    // Validate required fields in token payload
    if (!decoded.id || !decoded.email) {
      // console.log("Payload JWT invalide");
      res.status(403).json({ message: "Token invalide" });
      return;
    }

    // Ensure user ID is valid type
    if (typeof decoded.id !== "number" && typeof decoded.id !== "string") {
      res.status(403).json({ message: "ID utilisateur manquant ou invalide" });
      return;
    }

    // Add user data to request object for use in protected routes
    req.user = { id: Number(decoded.id), email: decoded.email };

    // console.log("Token valide, utilisateur authentifié");
    next(); // Proceed to next middleware/route handler
  } catch (error: any) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      console.log("Token expiré");
      res
        .status(401)
        .json({ message: "Token expiré, veuillez vous reconnecter" });
      return;
    }

    // Handle other JWT verification errors
    console.log("Erreur lors de la vérification du token :", error);
    res.status(403).json({ message: "Token invalide" });
    return;
  }
};
