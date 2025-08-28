import Header from "@/components/Header";
import { ProfileCard } from "@/components/ProfileCard";
import SearchForm from "@/components/Forms/SearchForm";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import type { IUser } from "@/types/user";
import { useUserSearch } from "@/hooks/useUserSearch";
import { useAllUsers } from "@/hooks/useAllUsers";

export default function SearchPage() {
  const location = useLocation();
  const initialUsers = location.state?.filteredUsers || [];
  const { users } = useAllUsers();

  const { filteredUsers, handleSearch } = useUserSearch(initialUsers);

  function handleGlobalSearch({
    skill,
    zipcode,
  }: {
    skill: string;
    zipcode: string;
  }) {
    handleSearch({ skill, zipcode }, users);
  }

  return (
    <>
      <Header />
      <section className="flex flex-col items-center min-h-screen bg-secondary text-white m-0 pt-5">
        <div className="text-center p-6 pb-2 font-semibold text-lg">
          “Des nouvelles compétences à portée de clics proches de chez vous.”
        </div>

        <div className="pb-6 w-full flex justify-center">
          <SearchForm
            className="w-full max-w-2xl"
            onSearch={handleGlobalSearch}
          />
        </div>

        <div className="bg-primary text-secondary border border-white rounded-xl shadow w-full max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {filteredUsers.length === 0 ? (
              <div className="col-span-full text-center text-secondary">
                Aucune compétence trouvée pour cette recherche.
              </div>
            ) : (
              filteredUsers.map((user: IUser) => (
                <ProfileCard key={user.id} user={user} />
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
