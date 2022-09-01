import { useState, useEffect } from "react";

export function useFetch(uri) {
  const [loading, setLoading] = useState(true);
  const [data, setDate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uri) return;
    fetch(uri)
      .then((data) => data.json())
      .then(setDate)
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri]);

  return { loading, data, error };
}
