import { useState } from "react";
import SkillSelector from "../Skills/SkillSelector"; // Import du composant de sélection des compétences

// Définition des props attendues par la modale
type Props = {
  selectedSkills: string[]; // Liste des compétences déjà sélectionnées (venant du parent)
  onClose: () => void; // Fonction pour fermer la modale sans sauvegarder
  onSave: (skills: string[]) => void; // Fonction pour sauvegarder la sélection
};

export default function SkillModal({ selectedSkills, onClose, onSave }: Props) {
  // État local interne à la modale pour stocker temporairement les compétences sélectionnées
  const [localSkills, setLocalSkills] = useState<string[]>(selectedSkills);

  // Fonction appelée quand l'utilisateur clique sur "Valider"
  const handleSave = () => {
    onSave(localSkills); // Envoie les compétences sélectionnées au parent
    onClose(); // Ferme la modale
  };

  return (
    // Overlay semi-transparent noir couvrant tout l'écran (fond de la modale)
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {/* Contenu de la modale centré à l'écran */}
      <div className="bg-[var(--color-whitish)] text-black rounded-2xl shadow-lg max-w-2xl w-full p-6 animate-fade-in">
        {/* Titre de la modale */}
        <h2 className="text-xl font-bold text-[var(--color-secondary)] mb-4 text-center">
          ✨ Sélection des compétences
        </h2>

        {/* Composant de sélection des compétences (avec gestion par checkbox) */}
        <SkillSelector
          selectedSkills={localSkills} // Liste temporaire affichée
          onChange={setLocalSkills} // Met à jour la liste locale
        />

        {/* Pied de modale avec boutons d'action */}
        <div className="flex justify-end gap-4 mt-6">
          {/* Bouton pour fermer sans enregistrer */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
          >
            Annuler
          </button>

          {/* Bouton pour sauvegarder les compétences choisies */}
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-[var(--color-accent)] text-white hover:opacity-90"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
