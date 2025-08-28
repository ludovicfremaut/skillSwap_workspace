import { useState } from "react";
import type { IUser } from "@/types/user";

export function useUserSearch(initialUsers: IUser[]) {
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(initialUsers);

  function handleSearch(
    { skill, zipcode }: { skill: string; zipcode: string },
    usersToFilter: IUser[] = initialUsers,
  ) {
    // console.log("Recherche lancée :", skill, zipcode, usersToFilter);

    setFilteredUsers(
      usersToFilter.filter((user) => {
        const hasSkill = user.skills.some(
          (s) => s.name.trim().toLowerCase() === skill.trim().toLowerCase(),
        );
        const hasZip = user.zipcode.trim() === zipcode.trim();
        // console.log(user.firstname, "hasSkill:", hasSkill, "hasZip:", hasZip);
        if (skill && zipcode) return hasSkill && hasZip;
        if (skill) return hasSkill;
        if (zipcode) return hasZip;
        return true;
      }),
    );
  }
  return { filteredUsers, handleSearch, setFilteredUsers };
}
