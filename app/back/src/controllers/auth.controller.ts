/**
 * CONTRÔLEUR D'AUTHENTIFICATION
 * 
 * Ce contrôleur gère toutes les opérations liées à l'authentification des utilisateurs
 * dans l'application SkillSwap. Il inclut les fonctionnalités de connexion, déconnexion
 * et inscription avec gestion sécurisée des mots de passe et des tokens JWT.
 * 
 * Fonctionnalités principales :
 * - Login : Vérification des identifiants et génération de token JWT
 * - Logout : Suppression du token d'authentification
 * - Register : Création de nouveaux comptes utilisateur avec validation
 * 
 * Sécurité implémentée :
 * - Hachage des mots de passe avec Argon2
 * - Tokens JWT stockés dans des cookies HttpOnly
 * - Protection CSRF avec SameSite strict
 * - Validation des données d'entrée
 * - Gestion d'erreurs sécurisée
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Request, Response } from "express";
import { User } from "../models/associations";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// JWT secret key from environment variables
const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

const authController = {
  // Login to user account
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      // Retrieve data sent by the frontend (email and password)
      const { email, password } = req.body;
      // console.log("Email reçu :", email);
      // console.log(Date.now()); // Display timestamp (debug)

      // Check: fields are required
      if (!email || !password) {
        res.status(400).json({ message: "Email et mot de passe sont requis" });
        return;
      }

      // Search for the user in the database by email
      const user = await User.findOne({ where: { email } });
      // console.log("Utilisateur trouvé :", user);

      // If no user is found, stop here
      if (!user) {
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
        return;
      }

      // If no password is registered (which shouldn't happen)
      if (!user.password) {
        res.status(500).json({
          message:
            "Erreur serveur : mot de passe manquant pour cet utilisateur",
        });
        return;
      }

      // Check password with argon2
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
        return;
      }

      // Generate JWT token (valid for 4 hours)
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "4h",
        },
      );

      // Send token in httpOnly cookie
      res.cookie("accessToken", token, {
        httpOnly: true, // Cookie cannot be read by JavaScript (XSS protection)
        secure: false, // Set to true in production with HTTPS
        sameSite: "strict", // CSRF protection
        path: "/", // Cookie is accessible everywhere on the site
        maxAge: 4 * 60 * 60 * 1000, // Expire après 4 heures
      });

      // RResponse sent to frontend with useful user information
      res.status(200).json({
        message: "Connexion réussie",
        user: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          profile_picture: user.profile_picture,
          description: user.description,
          availability: user.availability,
        },
      });
    } catch (err) {
      // In case of unexpected error, log + generic message
      // console.error("Erreur dans la méthode login :", err);
      res
        .status(500)
        .json({ message: "Erreur serveur", error: (err as Error).message });
    }
  },

  logout: (req: Request, res: Response): void => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict", // Protection CSRF
    });

    res.status(200).json({ message: "Déconnexion réussie" });
  },

  register: async (req: Request, res: Response): Promise<void> => {
    try {
      // Retrieve data sent from the registration form
      const {
        email,
        password,
        firstname,
        lastname,
        street,
        zipcode,
        city,
        profile_picture,
        description,
        availability,
      } = req.body;

      // Check that all required fields are present
      if (
        !email ||
        !password ||
        !firstname ||
        !lastname ||
        !street ||
        !zipcode ||
        !city ||
        !description ||
        availability === undefined
      ) {
        res.status(400).json({
          message: "Tous les champs obligatoires doivent être remplis.",
        });
        return;
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(409).json({ message: "Utilisateur déjà existant" });
        return;
      }

      const hashedPassword = await argon2.hash(password);

      // Create user in the database
      const newUser = await User.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        street,
        zipcode,
        city,
        profile_picture:
          profile_picture ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(firstname + lastname)}`,
        description,
        availability,
      });

      // Generate JWT token for user login upon registration
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        jwtSecretKey,
        {
          expiresIn: "4h",
        },
      );

      // Set secure cookie in HTTP response
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false, // true in prod with HTTPS
        sameSite: "strict",
        path: "/",
        maxAge: 4 * 60 * 60 * 1000,
      });

      // Return user as response
      res
        .status(201)
        .json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (err) {
      console.error("Erreur dans le contrôleur register :", err);
      res
        .status(500)
        .json({ message: "Erreur serveur", error: (err as Error).message });
    }
  },
};

export default authController;
