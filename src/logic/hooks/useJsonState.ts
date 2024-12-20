import { useState, useCallback } from "react";

export function useJsonState<T extends Record<string, any>>(
  initialData: T = {} as T
) {
  const [data, setData] = useState<T>(initialData);

  // Get a value from the JSON data by key
  const getValue = useCallback((key: keyof T): T[keyof T] => data[key], [data]);

  // Set a value in the JSON data
  const setValue = useCallback((key: keyof T, value: T[keyof T]) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  }, []);

  // Delete a key from the JSON data
  const deleteKey = useCallback((key: keyof T) => {
    setData((prevData) => {
      const { [key]: _, ...newData } = prevData;
      return newData as T;
    });
  }, []);

  // Reset the JSON data to the initial state
  const resetData = useCallback(() => {
    setData(initialData);
  }, [initialData]);

  // Clear all data
  const clearData = useCallback(() => {
    setData({} as T);
  }, []);

  return {
    data,
    getValue,
    setValue,
    deleteKey,
    resetData,
    clearData,
  };
}
