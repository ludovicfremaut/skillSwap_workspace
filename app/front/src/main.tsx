// React.StrictMode permet d’attraper les effets de bord, double appel en dev pour détecter les erreurs
import { StrictMode } from "react";
// Point d’entrée pour monter l’application React sur le DOM
import { createRoot } from "react-dom/client";
// Composant global pour afficher les notifications (success, error, etc.)
import { ToastContainer } from "react-toastify";
import "./index.css";
// Composant racine de l’application (structure générale, routage)
import App from "./App.tsx";
// Initialisation d’un client react-query une fois pour toute l’app
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
