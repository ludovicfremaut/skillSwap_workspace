/**
 * COMPOSANT SÉLECTEUR D'AVATAR - GÉNÉRATION ET CHOIX D'AVATARS
 * 
 * Ce composant React permet aux utilisateurs de choisir un avatar personnalisé
 * pour leur profil SkillSwap. Il génère automatiquement une galerie d'avatars
 * variés en utilisant l'API Dicebear et permet la sélection interactive.
 * 
 * Fonctionnalités principales :
 * - Génération automatique de 15 avatars uniques à chaque chargement
 * - Utilisation de 5 styles différents de Dicebear (adventurer, avataaars, etc.)
 * - Interface de sélection avec prévisualisation en temps réel
 * - Responsive design pour tous les écrans (mobile à desktop)
 * - Gestion d'état pour l'avatar sélectionné
 * 
 * Styles d'avatar disponibles :
 * - adventurer : Style aventurier moderne
 * - avataaars : Style cartoon populaire
 * - big-smile : Style souriant et amical
 * - open-peeps : Style illustrations ouvertes
 * - personas : Style personnages diversifiés
 * 
 * API Dicebear intégrée :
 * - Service externe gratuit pour génération d'avatars SVG
 * - Seeds aléatoires pour garantir l'unicité
 * - URLs formatées avec paramètres d'encodage sécurisé
 * - Pas de dépendance locale pour les images
 * 
 * Interface utilisateur :
 * - Grille responsive (3-5 colonnes selon écran)
 * - Prévisualisation d'avatar avec sélection visuelle
 * - Feedback immédiat lors de la sélection
 * - Design cohérent avec le système de design global
 * 
 * Gestion d'état :
 * - State local pour la liste des avatars générés
 * - Props pour l'avatar actuellement sélectionné
 * - Callback de sélection pour communication avec composant parent
 * 
 * Performance :
 * - Génération d'avatars au montage du composant uniquement
 * - URLs optimisées SVG pour chargement rapide
 * - Pas de re-génération inutile des avatars
 * 
 * Utilisation dans l'application :
 * - Formulaire d'inscription pour choix avatar initial
 * - Page de paramètres pour modification d'avatar
 * - Profil utilisateur pour personnalisation
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { useState, useEffect } from "react";

// Available Dicebear avatar styles for variety
const styles = ["adventurer", "avataaars", "big-smile", "open-peeps", "personas"];

// Props interface for AvatarPicker component
export default function AvatarPicker({
  selectedUrl,  // Currently selected avatar URL
  onSelect,     // Callback function when avatar is selected
}: {
  selectedUrl: string | null;
  onSelect: (url: string) => void;
}) {
  // State to store generated avatars
  const [avatars, setAvatars] = useState<
    { seed: string; style: string; url: string }[]
  >([]);

  // Generate avatars on component mount
  useEffect(() => {
    const seeds = generateSeeds(15); // Generate 15 unique seeds
    const newAvatars = seeds.map((seed) => {
      // Randomly select a style for each avatar
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      // Construct Dicebear API URL with proper encoding
      const url = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${encodeURIComponent(seed)}`;
      return { seed, style: randomStyle, url };
    });
    setAvatars(newAvatars);
  }, []);

  return (
    <div>
      <p className="text-lg font-semibold mb-4 text-center">Choisis ton avatar :</p>
      {/* Responsive grid layout for avatar selection */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {avatars.map(({ seed, style, url }) => (
          <img
            key={`${style}-${seed}`}
            src={url}
            alt={`Avatar ${seed} style ${style}`}
            onClick={() => onSelect(url)}
            className={`w-full aspect-square rounded-md cursor-pointer border ${
              selectedUrl === url
                ? "border-4 border-blue-500"
                : "border-gray-300"
            } hover:scale-105 transition-transform duration-150`}
          />
        ))}
      </div>
    </div>
  );
}

function generateRandomSeed(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateSeeds(count = 8) {
  const seeds: string[] = [];
  for (let i = 0; i < count; i++) {
    seeds.push(generateRandomSeed());
  }
  return seeds;
}
