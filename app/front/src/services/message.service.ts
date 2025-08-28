/**
 * SERVICE DE GESTION DES MESSAGES ET CONVERSATIONS
 * 
 * Ce service gère toute la messagerie instantanée de l'application SkillSwap,
 * permettant aux utilisateurs de communiquer entre eux pour organiser leurs
 * échanges de compétences et négocier les détails de leurs services.
 * 
 * Fonctionnalités principales :
 * - Récupération des dernières conversations d'un utilisateur
 * - Affichage de l'historique complet d'une conversation
 * - Envoi de nouveaux messages entre utilisateurs
 * - Support pour la communication bidirectionnelle
 * 
 * Architecture de messagerie :
 * - Conversations : Vue d'ensemble des derniers échanges
 * - Messages : Détail complet d'une conversation spécifique
 * - Temps réel : Base pour l'ajout futur de WebSockets
 * 
 * Utilisation dans l'application :
 * - Interface de messagerie pour négocier les services
 * - Contact direct entre offreurs et demandeurs
 * - Suivi des échanges et arrangements
 * - Historique des communications pour référence
 * 
 * Sécurité et permissions :
 * - Vérification de l'identité des interlocuteurs
 * - Protection contre le spam et les messages non sollicités
 * - Respect de la confidentialité des conversations
 * 
 * Performance :
 * - Pagination potentielle pour les longues conversations
 * - Cache local des messages récents
 * - Optimisation pour l'affichage en temps réel
 * 
 * Évolutions futures :
 * - Intégration WebSocket pour les messages en temps réel
 * - Notifications push pour nouveaux messages
 * - Système de lecture/non-lu des messages
 * - Pièces jointes et médias dans les messages
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import api from "@/api/axios";

import type { IMessage } from "@/types/message";
import type { IConversation } from "@/types/conversation";

// Get latest conversations for a specific user (overview)
export async function getLatestMessagesForUser(
  id: string,
): Promise<IConversation[]> {
  const res = await api.get(`/messages/last-conversations/${id}`);
  return res.data; // Returns array of conversations with last message info
}

// Get full conversation between two users (message history)
export async function getConversation(userId: string, contactId: string): Promise<IMessage[]> {
  const res = await api.get(`/messages/${userId}/${contactId}`);
  return res.data; // Returns chronological array of messages
}

// Send new message to a contact
export async function createMessage(data: Omit<IMessage, "id" | "sending_date" | "updated_at">, contactId: string
): Promise<IMessage> {
  const res = await api.post(`/messages/${contactId}`, data);
  return res.data; // Returns created message with generated metadata
}
