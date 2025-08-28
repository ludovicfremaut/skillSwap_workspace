import { useAsyncState } from "@/hooks/useAsyncState";
import { getAllSkills } from "@/services/skill.service";
import type { ISkill } from "@/types/skill";

import { useState, useEffect } from "react";

// Props attendues par le composant SkillSelector
type Props = {
  selectedSkills: string[]; // Liste des compétences déjà sélectionnées
  onChange: (skills: string[]) => void; // Fonction à appeler quand la liste change
};

export default function SkillSelector({ selectedSkills, onChange }: Props) {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const { loading, error, setLoading, setError } = useAsyncState();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();

        setSkills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Impossible de charger les compétences.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [setError, setLoading]);

  // État local pour suivre la catégorie actuellement sélectionnée
  const handleCheckboxChange = (skill: string) => {
    const isSelected = selectedSkills.includes(skill);
    // Si on essaie d'en ajouter une 4e → ne rien faire
    if (!isSelected && selectedSkills.length >= 3) {
      alert("Vous ne pouvez sélectionner que 3 compétences maximum.");
      return;
    }
    const updated = isSelected
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    // On remonte la nouvelle liste des compétences au parent via onChange
    onChange(updated);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4 text-secondary">
        Sélectionnez vos compétences :
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-400 italic">Chargement des compétences...</p>
      ) : (
        <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skills.map((skill) => (
            <label key={skill.name} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill.name)}
                onChange={() => handleCheckboxChange(skill.name)}
                className="accent-[var(--color-accent)]"
              />
              {skill.name}
            </label>
          ))}
        </fieldset>
      )}

      {selectedSkills.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Compétences sélectionnées :</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-block rounded-full bg-[var(--color-primary)] text-[var(--color-secondary)] px-4 py-1 text-sm shadow-sm hover:scale-105 transition-transform duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
