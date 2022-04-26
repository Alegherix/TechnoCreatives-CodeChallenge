import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue?: T) => {
  const [localStorageState, setLocalStorageState] = useState<T>(() => {
    const valueInlocalStorage = window.localStorage.getItem(key);
    return valueInlocalStorage ? JSON.parse(valueInlocalStorage) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(localStorageState));
  }, [key, localStorageState]);

  return [localStorageState, setLocalStorageState] as const;
};
