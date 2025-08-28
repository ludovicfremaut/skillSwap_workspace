import React, { useEffect, useState } from "react";
import { useAsyncState } from "@/hooks/useAsyncState";
import { getAllSkills } from "@/services/skill.service";
import type { ISkill } from "@/types/skill";

type SearchFormProps = {
  onSearch: (data: { skill: string; zipcode: string }) => void;
  className?: string;
};

export default function SearchForm({
  onSearch,
  className = "",
}: SearchFormProps) {
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skill = formData.get("skill") as string;
    const zipcode = formData.get("zipcode") as string;
    onSearch({ skill, zipcode });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-10 bg-primary shadow p-8 m-5 rounded-xl border border-white ${className}`}
    >
      <h2 className="text-lg font-semibold mb-6 text-center text-secondary">
        Trouvez des nouvelles compétences proches de chez vous
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <select
          name="skill"
          className="w-full px-4 py-2 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent text-secondary"
          defaultValue=""
          disabled={loading}
        >
          <option value="" disabled>
            {loading
              ? "Chargement des compétences..."
              : "Sélectionner une compétence"}
          </option>

          {Array.isArray(skills) && skills.length > 0
            ? skills.map((skill, idx) => (
                <option
                  key={`${skill.name}-${idx}`}
                  value={skill.name}
                  className="text-secondary"
                >
                  {skill.name}
                </option>
              ))
            : !loading && (
                <option disabled>Aucune compétence disponible</option>
              )}
        </select>
      </div>
      <div className="mb-6">
        <input
          type="text"
          name="zipcode"
          placeholder="Code postal"
          className="w-full px-4 py-2 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent text-secondary placeholder:text-secondary"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent hover:bg-secondary text-white font-semibold py-2 rounded transition"
      >
        Rechercher
      </button>
    </form>
  );
}
