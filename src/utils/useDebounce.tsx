import { useState, useEffect } from 'react';

export default function useDebounce<T>(value: T, delay: number) {
  if (!value) return undefined;

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
}
