// src/utils/localStorage.ts
export const saveToLocalStorage = (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  };
  