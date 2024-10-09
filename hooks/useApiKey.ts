import { useState, useEffect } from "react";

export function useApiKey() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    // Load API key from localStorage on component mount
    const storedApiKey = localStorage.getItem("openaiApiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const updateApiKey = (newApiKey: string) => {
    setApiKey(newApiKey);
    localStorage.setItem("openaiApiKey", newApiKey);
  };

  return [apiKey, updateApiKey] as const;
}