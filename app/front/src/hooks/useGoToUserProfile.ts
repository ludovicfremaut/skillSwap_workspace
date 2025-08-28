import { useNavigate } from "react-router-dom";

/**
 * Hook réutilisable pour rediriger vers la ProfilePage d'un utilisateur.
 */
export function useGoToUserProfile() {
  const navigate = useNavigate();

  return (id: number) => {
    navigate(`/profilepage/${id}`);
  };
}
