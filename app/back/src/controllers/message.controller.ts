/**
 * CONTRÔLEUR DE GESTION DES MESSAGES
 * 
 * Ce contrôleur gère le système de messagerie entre utilisateurs de l'application SkillSwap.
 * Il permet aux utilisateurs de communiquer directement pour organiser leurs échanges
 * de compétences et services.
 * 
 * Fonctionnalités principales :
 * - Récupération des conversations entre deux utilisateurs
 * - Création et envoi de nouveaux messages
 * - Récupération des derniers messages pour un utilisateur
 * - Gestion de la sécurité et des permissions d'accès
 * 
 * Sécurité implémentée :
 * - Vérification de l'authentification JWT obligatoire
 * - Contrôle d'accès : seuls les participants peuvent voir une conversation
 * - Validation des permissions avant affichage des messages
 * - Protection contre l'accès non autorisé aux conversations privées
 * 
 * Structure des messages :
 * - Expéditeur (sender_id) et destinataire (receiver_id)
 * - Contenu du message et horodatage
 * - Tri chronologique pour l'affichage des conversations
 * 
 * Utilisation dans l'application :
 * - Communication pour négocier les services
 * - Coordination des échanges de compétences
 * - Support et assistance entre utilisateurs
 * - Feedback après réalisation des services
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Request, Response } from "express";
import Message from "../models/Message.model";
import { Op } from "sequelize";
import { QueryTypes } from "sequelize";

// Interface defining message controller methods
interface MessageController {
  getConversation(req: Request, res: Response): Promise<void>; // Get messages between two users
  createMessage(req: Request, res: Response): Promise<void>; // Send new message
  getLatestMessagesForUser(req: Request, res: Response): Promise<void>; // Get recent messages
}

const messageController: MessageController = {
  // Get conversation between authenticated user and another user
  getConversation: async (req: Request, res: Response) => {
    try {
      const authenticatedUserId = req.user!.id; // Get authenticated user ID from JWT
      const { userId, contactId } = req.params;

      // Security check: ensure user can only access their own conversations
      if (
        Number(userId) !== authenticatedUserId &&
        Number(contactId) !== authenticatedUserId
      ) {
        res.status(403).json({
          message: "Forbidden: User ID does not match authenticated user",
        });
        return;
      }

      // Validate required parameters
      if (!authenticatedUserId || !contactId) {
        res
          .status(400)
          .json({ message: "User ID and Contact ID are required" });
        return;
      }

      // Fetch all messages between the two users (bidirectional)
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { sender_id: authenticatedUserId, receiver_id: contactId }, // Messages sent by auth user
            { sender_id: contactId, receiver_id: authenticatedUserId }, // Messages received by auth user
          ],
        },
        order: [["sending_date", "ASC"]], // Sort chronologically
      });

      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createMessage: async (req: Request, res: Response) => {
    try {
      const authenticatedUserId = req.user!.id;
      const { contactId } = req.params;
      // console.log(
      //   `Authenticated User ID: ${authenticatedUserId},Contact ID: ${contactId}`,
      // );

      if (isNaN(authenticatedUserId) || !authenticatedUserId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }
      const { sender_id, receiver_id, body } = req.body;
      // console.log("Request body:", req.body); // Log des données reçues

      // Validate request body
      if (!sender_id || !receiver_id || !body) {
        res.status(400).json({
          message: "Sender ID, Receiver ID, and content are required",
        });
        return;
      }

      // Create a new message
      const newMessage = await Message.create({
        sender_id,
        receiver_id,
        body,
        sending_date: new Date(),
      });

      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getLatestMessagesForUser: async (req: Request, res: Response) => {
    try {
      const authenticatedUserId = req.user!.id;
      const { userId, contactId } = req.params;

      if (
        Number(userId) !== authenticatedUserId &&
        Number(contactId) !== authenticatedUserId
      ) {
        res.status(403).json({
          message: "Forbidden: User ID does not match authenticated user",
        });
        return;
      }

      if (isNaN(authenticatedUserId) || !authenticatedUserId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      // Fetch the latest messages for the user
      const results = await Message.sequelize!.query(
        `
                SELECT DISTINCT ON (
                LEAST(sender_id, receiver_id),
                GREATEST(sender_id, receiver_id)
                ) *
                FROM message
                WHERE sender_id = :userId OR receiver_id = :userId
                ORDER BY
                LEAST(sender_id, receiver_id),
                GREATEST(sender_id, receiver_id),
                sending_date DESC
                `,
        {
          replacements: { userId: authenticatedUserId },
          type: QueryTypes.SELECT,
        },
      );

      res.status(200).json(results);
    } catch (error) {
      console.error("Error fetching latest messages:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
export default messageController;
