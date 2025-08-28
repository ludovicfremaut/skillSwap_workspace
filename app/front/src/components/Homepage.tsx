import { CarouselPlugin } from "./ui/CarouselPlugin";
import SearchForm from "./Forms/SearchForm";
import SkillBubble from "./ui/SkillBubble";
import ProfileBubble from "./ui/ProfileBubble";
import WishToRegister from "./WishToRegister";
import { useNavigate } from "react-router-dom";
import { useAllUsers } from "@/hooks/useAllUsers";
import { ProfileCard } from "./ProfileCard";

export default function Homepage() {
  const { users, loading, error } = useAllUsers();
  const navigate = useNavigate();
  const shuffled = [...users].sort(() => 0.5 - Math.random());
  const randomUsers = shuffled.slice(0, 2);

  function handleSearch({
    skill,
    zipcode,
  }: {
    skill: string;
    zipcode: string;
  }) {
    const filtered = users.filter((user) => {
      const hasSkill = user.skills.some((s) =>
        s.name.toLowerCase().includes(skill.toLowerCase()),
      );

      // Si un code postal est fourni, on filtre aussi dessus
      if (zipcode.trim()) {
        return hasSkill && user.zipcode === zipcode;
      }

      // Sinon, on ne filtre que par compétence
      return hasSkill;
    });

    navigate("/search", { state: { filteredUsers: filtered } });
  }

  if (loading) {
    return (
      <p className="text-white text-sm italic text-center mt-10">
        Chargement des utilisateurs...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-sm italic text-center mt-10">
        {error.message}
      </p>
    );
  }

  return (
    <div className="w-full">
      {/* VERSION MOBILE */}
      <section className="block md:hidden flex flex-col items-center bg-secondary text-white">
        <CarouselPlugin />
        <div className="text-center text-lg p-6 font-bold">
          “Apprenez gratuitement ce que vous ne savez pas encore, en donnant ce
          que vous maîtrisez déjà.”
        </div>
        <SearchForm onSearch={handleSearch} />
        <div className="pt-10 items-start text-lg font-semibold">
          Compétences
        </div>
        <SkillBubble />
        <WishToRegister />
        <div className="pt-8 text-lg font-semibold text-center">
          Nos derniers inscrits
        </div>
        <ProfileBubble />
      </section>

      {/* VERSION DESKTOP */}
      <section className="hidden md:grid grid-cols-3 gap-8 px-8 py-12 bg-secondary text-white">
        {/* Colonne 1 */}
        <div className="space-y-8">
          <h2 className="font-semibold text-center text-2xl">
            Découvrez des profils
          </h2>
          <div className="space-y-4 p-4">
            {randomUsers.map((user) => (
              <ProfileCard key={user.id} user={user} />
            ))}
          </div>
        </div>

        {/* Colonne 2 */}
        <div className="flex flex-col items-center gap-10">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg max-w-md text-center text-lg">
            <p className="italic font-medium">
              “Apprenez gratuitement ce que vous ne savez pas encore, en donnant
              ce que vous maîtrisez déjà.”
            </p>
          </div>
          <div className="w-full max-w-md">
            <SearchForm
              onSearch={handleSearch}
              className="rounded-2xl border-2 border-white shadow-lg bg-accent p-4"
            />
          </div>
          <div className="w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Compétences
            </h2>
            <SkillBubble />
          </div>
        </div>

        {/* Colonne 3 */}
        <div className="space-y-8">
          <div className="bg-white text-black rounded-xl shadow-md p-6">
            <WishToRegister />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Nos derniers inscrits
            </h2>
            <ProfileBubble />
          </div>
        </div>
      </section>
    </div>
  );
}
