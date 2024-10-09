"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useApiKey } from "@/hooks/useApiKey";

export default function MaskedAPIKey() {
  const [apiKey, updateApiKey] = useApiKey();
  const [showApiKey, setShowApiKey] = useState(false);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateApiKey(e.target.value);
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 6) return key;
    return key.slice(0, 6) + "*".repeat(Math.max(0, key.length - 11));
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-4">
      <div className="mb-8">
        <label
          htmlFor="api-key"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          OpenAI API Key
        </label>
        <div className="relative">
          <Input
            id="api-key"
            type={showApiKey ? "text" : "password"}
            value={apiKey}
            onChange={handleApiKeyChange}
            className="pr-10"
            placeholder="Enter your OpenAI API key"
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showApiKey ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          API Key: {showApiKey ? apiKey : maskApiKey(apiKey)}
        </p>
      </div>
    </div>
  );
}