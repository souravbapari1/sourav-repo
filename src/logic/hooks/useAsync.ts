import { useState, useEffect, useCallback } from "react";

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = [],
  onSuccess?: (data: T) => void,
  onError?: (error: Error) => void
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to execute the async operation
  const executeAsyncFunction = useCallback(async () => {
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

  // Trigger the async function on mount or when dependencies change
  useEffect(() => {
    executeAsyncFunction();
  }, [executeAsyncFunction, ...dependencies]);

  // Manual trigger function (can be used for refetching)
  const refetch = useCallback(() => {
    executeAsyncFunction();
  }, [executeAsyncFunction]);

  return { data, error, loading, refetch };
}
