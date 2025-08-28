import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import api from "@/api/axios";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiverId: number;
  onSuccess?: () => void;
}

export default function ServiceModal({
  isOpen,
  onClose,
  receiverId,
  onSuccess,
}: ServiceModalProps) {
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!object.trim()) {
      setError("Merci de préciser l'objet du service.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post(
        "/services",
        {
          object,
          receiver_id: receiverId,
        },
        { withCredentials: true }
      );

      onSuccess?.(); // callback de rafraîchissement si fourni
      setObject("");
      onClose();
    } catch (err) {
      console.error("Erreur création service :", err);
      setError("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] sm:max-w-lg w-full bg-[var(--color-whitish)] text-[var(--color-secondary)] p-6 rounded-2xl shadow-2xl border border-[var(--color-primary)] animate-fadeIn scrollbar-custom">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[var(--color-secondary)]">
            Demander un service
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            placeholder="Ex : Besoin d'aide pour déménager"
            value={object}
            onChange={(e) => setObject(e.target.value)}
            disabled={loading}
            className="border-[var(--color-primary)] focus:ring-[var(--color-accent)]"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            className="rounded-md bg-gray-200 text-[var(--color-secondary)] hover:bg-gray-300"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-md bg-[var(--color-accent)] text-white hover:bg-orange-700"
          >
            {loading ? "Envoi..." : "Envoyer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
