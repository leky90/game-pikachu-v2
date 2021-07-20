import { useState, useEffect, useCallback } from "react";

export type ResponseData = Record<string, any> | null;

export interface Response {
  success: boolean;
  message: string;
  data?: ResponseData;
  error?: string;
}

export interface ResponseError extends Response {
  error?: string;
}

export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
  IDLE = "idle",
  PENDING = "pending",
}

// Hook
const useAsync = <T extends Response, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<ResponseStatus>(ResponseStatus.IDLE);
  const [value, setValue] = useState<T | ResponseData>(null);
  const [error, setError] = useState<E | ResponseError | null>(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus(ResponseStatus.PENDING);
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response: T) => {
        if (response) {
          setValue(response);
        }
        setStatus(ResponseStatus.SUCCESS);
      })
      .catch((error: ResponseError) => {
        if (error) {
          setError(error);
        }
        setStatus(ResponseStatus.ERROR);
      });
  }, [asyncFunction]);
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, status, value, error };
};

export default useAsync;
