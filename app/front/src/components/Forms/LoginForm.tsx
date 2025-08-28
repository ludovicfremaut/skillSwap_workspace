import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  // Initialise locale state for email and password
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State to display any error to the user
  const [error, setError] = useState<string | null>(null);

  // React Router hook for redirection after login
  const navigate = useNavigate();
  const { login } = useAuth();

  // Function called on each input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: typeof value === "string" ? value.trimStart() : value,
    });
  };

  // Function called when submitting the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation: check that fields are not empty
    if (!loginData.email || !loginData.password) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    // Validation password minimal length
    if (loginData.password.length < 8) {
      alert("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }

    try {
      // Réinitialisation error before login attempt
      setError(null);
      // console.log("Tentative de connexion avec :", loginData);

      // Call to login function (API POST to /auth/login)
      const response = await login(loginData);
      // console.log("Reponse login: ", response);

      // console.log("Connexion réussie :", response);

      // Redirection vers la page de profil de l'utilisateur
      navigate(`/personalpage/${response.user.id}`);
    } catch (err: any) {
      console.log("Erreur complète : ", err);

      // If API error (401, 500...), display returned message
      const msg = err.response?.data?.message ?? "Erreur lors de la connexion.";
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Vous avez déjà un compte&nbsp;?
      </h2>

      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        value={loginData.email}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2 bg-white text-black mb-3"
      />

      <input
        name="password"
        type="password"
        minLength={8}
        required
        placeholder="Mot de passe"
        autoComplete="current-password"
        value={loginData.password}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2 bg-white text-black mb-3"
      />

      <button
        type="submit"
        className="w-full rounded bg-[var(--color-accent)] py-2 font-semibold text-white hover:opacity-90"
      >
        Se connecter
      </button>

      {error && (
        <p className="text-center text-red-500 font-semibold mt-2">{error}</p>
      )}
    </form>
  );
}
