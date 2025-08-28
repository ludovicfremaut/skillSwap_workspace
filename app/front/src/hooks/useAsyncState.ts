import { useState } from "react";

export function useAsyncState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reset = () => {
    setLoading(false);
    setError(null);
  };

  return {
    loading,
    error,
    setLoading,
    setError,
    reset,
  };
}
