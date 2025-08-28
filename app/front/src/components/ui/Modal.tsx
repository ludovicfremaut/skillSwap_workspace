import { useEffect } from "react";

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    // Empêche le scroll quand la modale est ouverte
    document.body.style.overflow = "hidden";

    return () => {
      // Restaure le scroll à la fermeture
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-xl max-w-md w-[90%] max-h-[80vh] overflow-auto shadow-lg"
      >
        {children}
      </div>
    </div>
  );
}
