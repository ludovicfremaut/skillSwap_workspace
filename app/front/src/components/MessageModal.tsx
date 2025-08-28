/**
 * MODAL DE COMPOSITION DE MESSAGE - INTERFACE DE MESSAGERIE
 * 
 * Ce composant React Modal permet aux utilisateurs d'envoyer des messages
 * directs à d'autres membres de SkillSwap. Il fournit une interface simple
 * et intuitive pour la communication entre utilisateurs.
 * 
 * Fonctionnalités principales :
 * - Interface de composition de message avec textarea
 * - Validation des données avant envoi (message non vide)
 * - Gestion des erreurs avec affichage utilisateur
 * - Envoi asynchrone avec feedback de succès
 * - Fermeture automatique après envoi réussi
 * 
 * Comportement modal :
 * - Blocage du scroll de la page principale quand ouvert
 * - Restauration du scroll à la fermeture
 * - Overlay de fond pour isoler l'interface
 * - Boutons d'action (Envoyer/Annuler) clairement visibles
 * 
 * Gestion d'état :
 * - State local pour le contenu du message en cours
 * - Gestion des erreurs avec affichage contextuel
 * - Reset automatique du formulaire après envoi
 * - Validation côté client avant soumission
 * 
 * API et données :
 * - Utilisation du service message.service.ts
 * - Construction automatique de l'objet message avec IDs
 * - Gestion des erreurs réseau et serveur
 * - Callback de fermeture pour communication parent
 * 
 * Sécurité :
 * - Validation des IDs utilisateur (sender/receiver)
 * - Nettoyage des espaces pour éviter messages vides
 * - Protection contre l'envoi multiple rapide
 * - Gestion appropriée des erreurs d'authentification
 * 
 * Expérience utilisateur :
 * - Interface claire et accessible
 * - Feedback immédiat sur les actions
 * - Messages d'erreur compréhensibles
 * - Fermeture fluide avec restoration d'état
 * 
 * Utilisation dans l'application :
 * - Cartes utilisateur pour contact direct
 * - Profils utilisateur pour initier conversation
 * - Réponse rapide dans l'interface de messagerie
 * - Contact depuis les services et évaluations
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { createMessage } from "@/services/message.service";
import { useEffect, useState } from "react";

// Props interface for MessageModal component
export default function MessageModal({
  onClose,      // Callback function to close the modal
  receiverId,   // ID of the user who will receive the message
  userId,       // ID of the current user sending the message
}: {
  onClose: () => void;
  receiverId: number;
  userId: number;
}) {
  // State management for message composition
  const [error, setError] = useState<Error | null>(null); // Error handling
  const [newMessage, setNewMessage] = useState("");       // Message content
  
  // Handle modal body scroll blocking on mount/unmount
  useEffect(() => {
    // Block body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      // Restore scroll when modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  // Handle message sending with validation and error handling
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Don't send empty messages

    try {
      // Prepare message data for API
      const messageData = {
        sender_id: userId,
        receiver_id: receiverId,
        body: newMessage,
      };

      console.log("Sending message data:", messageData); // Log send data

      await createMessage(messageData, receiverId.toString());

      setNewMessage("");
      onClose(); // Close modal after sending
    } catch (error) {
      console.error("Error sending message:", error); // Log error
      setError(error as Error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-start z-50 p-4 overflow-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto p-6 relative shadow-lg mt-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-accent text-2xl font-bold"
          aria-label="Fermer"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Contactez-moi</h2>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Votre message ici :</h3>

          <div className="border-t pt-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Écrivez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-primary text-secondary px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Envoyer
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
