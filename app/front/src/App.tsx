/**
 * COMPOSANT PRINCIPAL DE L'APPLICATION SKILLSWAP
 * 
 * Ce fichier constitue le point d'entrée principal de l'application React SkillSwap.
 * Il configure le routage client (SPA) avec React Router et définit toutes les routes
 * principales de l'application.
 * 
 * Fonctionnalités :
 * - Configuration du routage SPA (Single Page Application)
 * - Définition de toutes les routes publiques et privées
 * - Gestion des pages 404 pour les routes non trouvées
 * - Structure de navigation pour l'ensemble de l'application
 * 
 * Routes disponibles :
 * - / : Page d'accueil
 * - /search : Page de recherche de services/compétences
 * - /register : Page d'inscription
 * - /messages/:id : Page de messagerie avec un utilisateur
 * - /profilepage/:id : Page de profil public d'un utilisateur
 * - /personalpage/:id : Page de profil personnel (édition)
 * - /servicepage/:id : Page détaillée d'un service
 * - * : Page 404 pour toutes les autres routes
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

// Client-side navigation configuration (SPA) with React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all main application pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import PersonalPage from "./pages/PersonalPage";
import MessagePage from "./pages/MessagePage";
import ServicePage from "./pages/ServicePage";

// Main App component with routing configuration
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} /> {/* Homepage */}
        <Route path="/search" element={<SearchPage />} /> {/* Search services */}
        <Route path="/register" element={<RegisterPage />} /> {/* User registration */}
        
        {/* Dynamic routes with parameters */}
        <Route path="/messages/:id" element={<MessagePage />} /> {/* Messaging with user */}
        <Route path="/profilepage/:id" element={<ProfilePage />} /> {/* Public profile view */}
        <Route path="/personalpage/:id" element={<PersonalPage />} /> {/* Personal profile edit */}
        <Route path="/servicepage/:id" element={<ServicePage />} /> {/* Service details */}
        
        {/* 404 route - must be last */}
        <Route path="*" element={<NotFound />} /> {/* Not found page */}
      </Routes>
    </Router>
  );
}

export default App;
