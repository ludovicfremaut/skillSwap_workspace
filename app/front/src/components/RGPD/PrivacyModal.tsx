import { useEffect } from "react";

export default function PrivacyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    // Bloque le scroll du body quand la modale est ouverte
    document.body.style.overflow = "hidden";

    return () => {
      // Restaure le scroll quand la modale est fermée
      document.body.style.overflow = "auto";
    };
  }, []);

    return (
    <div
      className="fixed inset-0 flex justify-center items-start z-50 p-4 overflow-auto"
      onClick={onClose}
    >
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

        <h2 className="text-3xl font-bold mb-6 text-center">Politique de confidentialité</h2>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Introduction</h3>
          <p>
            La présente politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre site SkillSwap.
            Nous nous engageons à respecter la confidentialité de vos données conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">1. Données collectées</h3>
          <p>
            Nous collectons les informations suivantes :
          </p>
          <ul className="list-disc list-inside ml-5">
            <li>Informations d’identification (nom, prénom, email)</li>
            <li>Données de connexion et d’utilisation</li>
            <li>Informations que vous fournissez volontairement sur votre profil</li>
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">2. Finalités du traitement</h3>
          <p>
            Vos données sont utilisées pour :
          </p>
          <ul className="list-disc list-inside ml-5">
            <li>Gérer votre compte utilisateur</li>
            <li>Vous fournir les services proposés par SkillSwap</li>
            <li>Communiquer avec vous (notifications, messages)</li>
            <li>Améliorer notre site et nos services</li>
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">3. Partage des données</h3>
          <p>
            Nous ne vendons ni ne louons vos données personnelles. Elles peuvent être partagées uniquement avec des prestataires tiers assurant le fonctionnement du site, sous contrat de confidentialité.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">4. Sécurité</h3>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre toute perte, altération ou accès non autorisé.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">5. Durée de conservation</h3>
          <p>
            Vos données sont conservées aussi longtemps que nécessaire pour les finalités indiquées ou pour respecter les obligations légales.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">6. Vos droits</h3>
          <p>
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside ml-5">
            <li>Droit d’accès, de rectification et de suppression de vos données</li>
            <li>Droit de limitation ou d’opposition au traitement</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit de retirer votre consentement à tout moment</li>
            <li>Droit d’introduire une réclamation auprès de la CNIL</li>
          </ul>
          <p>
            Pour exercer ces droits, vous pouvez nous contacter à l’adresse email suivante : <a href="mailto:contact@skillswap.com" className="text-accent underline">contact@skillswap.com</a>
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">7. Suppression des données</h3>
          <p>
            Vous pouvez demander la suppression totale ou partielle de vos données personnelles. Nous ferons notre possible pour répondre à votre demande dans les meilleurs délais, conformément au RGPD.
          </p>
        </section>
      </div>
    </div>
  );
}
