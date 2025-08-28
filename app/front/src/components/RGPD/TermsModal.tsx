import { useEffect } from "react";

export default function TermsModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    // On bloque le scroll du body quand la modale est ouverte
    document.body.style.overflow = "hidden";

    return () => {
      // On restaure le scroll quand la modale est fermée
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div
      className="fixed inset-0 flex justify-center items-start z-50 p-4 overflow-auto"
      onClick={onClose}
    >
      {/* Fenêtre blanche, clic stoppe la propagation pour ne pas fermer */}
      <div
        className="bg-white rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto p-6 relative shadow-lg mt-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-accent text-2xl font-bold"
          aria-label="Fermer"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">
          Mentions légales
        </h2>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">1. Éditeur du site</h3>
          <p>
            Le site SkillSwap est édité par :<br />
            SkillSwap.
            <br />
            Adresse : 123 Rue Exemple, 75000 Paris, France
            <br />
            Email :{" "}
            <a
              href="mailto:contact@skillswap.com"
              className="text-accent underline"
            >
              contact@skillswap.com
            </a>
            <br />
            Téléphone : 01 23 45 67 89
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">2. Hébergement</h3>
          <p>
            Le site est hébergé par :<br />
            Nom de l’hébergeur
            <br />
            Adresse de l’hébergeur
            <br />
            Téléphone de l’hébergeur
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            3. Propriété intellectuelle
          </h3>
          <p>
            L’ensemble des contenus présents sur ce site (textes, images, logos,
            vidéos, etc.) sont la propriété exclusive de SkillSwap ou de ses
            partenaires et sont protégés par le droit de la propriété
            intellectuelle. Toute reproduction, distribution ou modification,
            même partielle, sans autorisation préalable est strictement
            interdite.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            4. Données personnelles
          </h3>
          <p>
            Nous nous engageons à respecter la confidentialité de vos données
            personnelles conformément à notre{" "}
            <a href="#" className="text-accent underline">
              Politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">5. Responsabilité</h3>
          <p>
            SkillSwap met tout en œuvre pour assurer l’exactitude des
            informations diffusées sur le site. Toutefois, nous ne pouvons
            garantir l’absence d’erreurs ou d’omissions. L’utilisation du site
            se fait sous votre seule responsabilité.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">
            6. Loi applicable et juridiction
          </h3>
          <p>
            Les présentes mentions légales sont soumises au droit français. En
            cas de litige, seuls les tribunaux français seront compétents.
          </p>
        </section>
      </div>
    </div>
  );
}
