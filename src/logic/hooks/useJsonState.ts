import { useState, useCallback } from "react";

type JsonData<T> = Record<string, T>;

function useJsonState<T>(initialData: JsonData<T> = {} as JsonData<T>) {
  const [data, setData] = useState<JsonData<T>>(initialData);

  // Get a value from the JSON data by key
  const getValue = useCallback(
    (key: keyof JsonData<T>): T | undefined => data[key],
    [data]
  );

  // Set a value in the JSON data
  const setValue = useCallback((key: keyof JsonData<T>, value: T) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  }, []);

  // Delete a key from the JSON data
  const deleteKey = useCallback((key: string) => {
    setData((prevData) => {
      const newData = { ...prevData };
      delete newData[key];
      return newData;
    });
  }, []);

  // Reset the JSON data to the initial state
  const resetData = useCallback(() => {
    setData(initialData);
  }, [initialData]);

  // Clear all data
  const clearData = useCallback(() => {
    setData({} as JsonData<T>);
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

export default useJsonState;
