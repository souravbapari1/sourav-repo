import { useState, useEffect } from "react";

export function useLocalStorage(key: string, initialValue: string) {
  // State to hold the stored value
  const [storedValue, setStoredValue] = useState<string>(() => {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return initialValue; // Return initial value if nothing is in localStorage
    }
    return item as any;
  });

  // Update localStorage whenever storedValue changes
  useEffect(() => {
    window.localStorage.setItem(key, storedValue);
  }, [key, storedValue]); // Run the effect when storedValue or key changes

  // Function to update storedValue
  const setValue = (value: string | ((prevValue: string) => string)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore); // Update state
    } catch {
      console.error("Failed to update state", key);
    }
  };

  return [storedValue, setValue] as const;
}
