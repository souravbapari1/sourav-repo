import { useState, useCallback } from "react";

export function useFetch<T>(
  asyncFunction: () => Promise<T>,
  onSuccess?: (data: T) => void,
  onError?: (error: Error) => void
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to execute the async operation manually
  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const result = await asyncFunction();
      setData(result);

      // Call onSuccess if provided
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      const error = err as Error;
      setError(error);

      // Call onError if provided
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [asyncFunction, onSuccess, onError]);

  // Refetch function to fetch the data again
  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await asyncFunction();
      setData(result);

      // Call onSuccess if provided
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      const error = err as Error;
      setError(error);

      // Call onError if provided
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [asyncFunction, onSuccess, onError]);

  return { data, error, loading, execute, refetch };
}
