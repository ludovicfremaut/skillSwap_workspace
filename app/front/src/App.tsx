// Configuration de la navigation client (SPA) avec React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import de toutes les pages principales
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import PersonalPage from "./pages/PersonalPage";
import MessagePage from "./pages/MessagePage";
import ServicePage from "./pages/ServicePage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/messages/:id" element={<MessagePage />} />
        <Route path="/profilepage/:id" element={<ProfilePage />} />
        <Route path="/personalpage/:id" element={<PersonalPage />} />
        <Route path="/servicepage/:id" element={<ServicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
