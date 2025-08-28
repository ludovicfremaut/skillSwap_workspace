import { useEffect, useState } from "react";
import type { ISkill } from "@/types/skill";
import { getAllSkills } from "@/services/skill.service";
import { useAsyncState } from "@/hooks/useAsyncState";

export default function SkillBubble() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  // la logique de chargement et gestion d'erreur est centralisée via notre hook personnalisé
  const { loading, error, setLoading, setError, reset } = useAsyncState();

  useEffect(() => {
    const fetchSkills = async () => {
      reset();
      // on essaie de récupérer toutes les compétences depuis l’API (skill.service.ts)
      try {
        setLoading(true);
        const allSkills = await getAllSkills();
        // on mélange les compétences de manière aléatoire
        const shuffled = allSkills.sort(() => 0.5 - Math.random());
        setSkills(shuffled.slice(0, 4));
      } catch (err) {
        setError("Erreur lors du chargement des compétences");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <p className="text-white text-sm italic">Chargement des compétences...</p>
    );
  }

  if (error) {
    return <p className="text-red-500 text-sm italic">{error}</p>;
  }

  // On affiche des bulles de compétences
  return (
    <div className="grid grid-cols-2 gap-6 p-6 place-items-center">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="flex items-center justify-center w-28 h-28 rounded-full border border-accent bg-primary shadow-lg text-center
                     transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer p-2"
        >
          <span className="text-secondary text-l font-semibold leading-tight break-words text-center">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
}
