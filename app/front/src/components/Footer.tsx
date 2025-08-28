import { useState } from "react";
import Logo from "./ui/Logo";
import PrivacyModal from "./RGPD/PrivacyModal";
import TermsModal from "./RGPD/TermsModal";

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <footer className="bg-white text-secondary text-center p-6 pb-0 mb-0">
        <div className="flex gap-2 justify-center items-center mb-2">
          <Logo />
          <div className="text-lg font-semibold">SkillSwap</div>
        </div>
        <div className="mt-2 flex flex-col gap-2 mb-2">
          <button
            onClick={() => setShowPrivacy(true)}
            className="text-secondary hover:text-accent underline cursor-pointer"
          >
            Politique de confidentialité
          </button>
          <button
            onClick={() => setShowTerms(true)}
            className="text-secondary hover:text-accent underline cursor-pointer"
          >
            Mentions légales
          </button>
        </div>
        <div className="text-sm mb-0">
          © {new Date().getFullYear()} Tous droits réservés Maxime.M Anthony.M Karine.D Ludovic.F
        </div>
      </footer>

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </>
  );
}