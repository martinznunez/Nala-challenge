import { useState, useEffect, useCallback, useRef } from "react";

interface UseFetchMutationOptions<T> {
  autoFetch?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

export function useFetchMutation<T, A extends unknown[]>(
  promiseFn: (...args: A) => Promise<T>,
  { autoFetch = false, onSuccess, onError }: UseFetchMutationOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<unknown>(null);

  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [onSuccess, onError]);

  const fetchData = useCallback(async (...args: A | []) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await promiseFn(...(args as A)); 
     
      setData(() => {
        
        return result;
      });
      if (onSuccessRef.current) onSuccessRef.current(result);
    } catch (err) {
      setError(err);
      if (onErrorRef.current) onErrorRef.current(err);
    } finally {
      setIsLoading(false);
    }
  }, [promiseFn]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);


  return { data, isLoading, error, refetch: fetchData, mutate: fetchData };
}
