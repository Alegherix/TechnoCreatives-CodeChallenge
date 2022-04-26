import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [storageState, setStorageState] = useState<T>(() => {
    const valueInlocalStorage = window.localStorage.getItem(key);
    return valueInlocalStorage ? JSON.parse(valueInlocalStorage) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storageState));
  }, [key, storageState]);

  return [storageState, setStorageState] as const;
};
