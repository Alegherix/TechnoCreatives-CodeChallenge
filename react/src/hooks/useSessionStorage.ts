import { useEffect, useState } from 'react';

/**
 * Custom Session Storage hooks is used so persist the shopping cart and provide cleaner UX when browsing the site, can't persist in Localstorage incase prices changes on the backend.
 * @param key The key of for what the item should be named in localstorage
 * @param defaultValue The value to default to incase the key isn't found
 * @returns a Custom hook to set fetch data and set Session Storage
 */
export const useSessionStorage = <T>(key: string, defaultValue?: T) => {
  const [sessionStorageState, setSessionStorageState] = useState<T>(() => {
    const valueInSessionStorage = window.sessionStorage.getItem(key);
    return valueInSessionStorage
      ? JSON.parse(valueInSessionStorage)
      : defaultValue;
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(sessionStorageState));
  }, [key, sessionStorageState]);

  return [sessionStorageState, setSessionStorageState] as const;
};
