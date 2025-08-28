/**
 * CONTRÔLEUR DE GESTION DES SERVICES
 * 
 * Ce contrôleur gère toutes les opérations liées aux services dans l'application SkillSwap.
 * Un service représente une offre ou demande d'échange de compétences entre utilisateurs.
 * Il gère la création, récupération, mise à jour et suppression des services.
 * 
 * Fonctionnalités principales :
 * - Création de nouveaux services (offres/demandes)
 * - Récupération des services liés à un utilisateur connecté
 * - Mise à jour du statut des services (pending, active, completed, cancelled)
 * - Gestion des relations entre utilisateurs via les services
 * - Validation des permissions et de l'authentification
 * 
 * États des services gérés :
 * - "pending" : Service proposé en attente d'acceptation
 * - "active" : Service accepté et en cours
 * - "completed" : Service terminé avec succès
 * - "cancelled" : Service annulé par l'une des parties
 * 
 * Sécurité :
 * - Vérification de l'authentification JWT obligatoire
 * - Validation des permissions utilisateur
 * - Contrôle d'accès aux données sensibles
 * - Validation des données d'entrée
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Request, Response } from "express";
import { Service } from "../models/associations";
import { getAllServicesForUser } from "../queries/service.queries";

// Interface to type requests with JWT authentication data
interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string }; // User data from JWT token
}

export const serviceController = {
  // Create a new service proposal between users
  createService: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const senderId = Number(req.user?.id); // Get sender ID from JWT token
      const { receiver_id, object } = req.body;

      // Validate required fields
      if (!receiver_id || !object) {
        return res.status(400).json({ message: "Champs requis manquants" });
      }

      // Create new service with "pending" status
      const newService = await Service.create({
        object, // Service description
        status: "pending", // Initial status
        sender_id: senderId, // User proposing the service
        receiver_id, // User who will receive the service proposal
      });

      res.status(201).json({
        message: "Service proposé avec succès",
        service: newService,
      });
    } catch (error) {
      console.error("Erreur création service :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Get all services related to the authenticated user
  getAllForLoggedUser: async (req: AuthenticatedRequest, res: Response) => {
    // console.log("→ user dans getAllForLoggedUser :", req.user);

    try {
      const userId = Number(req.user?.id); // Extract user ID from JWT

      // Fetch all services where user is sender or receiver
      const services = await getAllServicesForUser(userId);

      res.status(200).json({
        success: true,
        message: "Services liés à l'utilisateur récupérés",
        data: services,
      });
    } catch (error) {
      console.error("Erreur dans getAllForLoggedUser :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  updateStatus: async (req: Request, res: Response) => {
    try {
      const serviceId = Number(req.params.id);
      const { newStatus } = req.body;

      const userId = Number((req as any).user?.id);

      const allowed = ["pending", "accepted", "done"];
      if (!allowed.includes(newStatus)) {
        return res.status(400).json({ message: "Statut non reconnu" });
      }

      const service = (await Service.findByPk(serviceId)) as any;
      if (!service) {
        return res.status(404).json({ message: "Service introuvable" });
      }

      const receiverId = Number(service.receiver_id);

      if (userId !== receiverId) {
        return res
          .status(403)
          .json({ message: "Non autorisé à modifier ce service" });
      }

      if (
        (newStatus === "accepted" && service.status !== "pending") ||
        (newStatus === "done" && service.status !== "accepted")
      ) {
        return res
          .status(400)
          .json({ message: "Transition de statut invalide" });
      }

      // Correspondance front/backend ↔ PostgreSQL
      const dbStatusMap: Record<string, string> = {
        pending: "pending",
        accepted: "accepted",
        done: "completed",
      };

      service.status = dbStatusMap[newStatus];

      await service.save();

      return res.status(200).json({
        message: "Statut mis à jour",
        status: newStatus, // on renvoie celui du front pour cohérence
      });
    } catch (error) {
      console.error("Erreur updateStatus :", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },
};
