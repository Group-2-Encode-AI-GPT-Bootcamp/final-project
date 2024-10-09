'use client'

import { createContext, useState, useEffect } from "react";

interface ApiKeyContextValue {
    apiKey: string;
    updateApiKey: (newApiKey: string) => void;
}

export const ApiKeyContext = createContext<ApiKeyContextValue | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: React.ReactNode }) => {
    const [apiKey, setApiKey] = useState("");

    useEffect(() => {
        const storedApiKey = localStorage.getItem("openaiApiKey");
        if (storedApiKey) {
            setApiKey(storedApiKey);
        }
    }, []);

    const updateApiKey = (newApiKey: string) => {
        setApiKey(newApiKey);
        localStorage.setItem("openaiApiKey", newApiKey);
    };

    const value = { apiKey, updateApiKey };

    return <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>;
};
