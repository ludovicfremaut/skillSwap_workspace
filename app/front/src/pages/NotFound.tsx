import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />

      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <span className="text-8xl mb-4">😕</span>
        <h1 className="text-center text-6xl font-extrabold mb-4 text-blue-700">
          404
        </h1>
        <p className="text-center text-2xl mb-6">
          Oups ! La page recherchée n'existe pas.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Retour à l’accueil
        </Link>
      </div>
      <Footer />
    </>
  );
}
