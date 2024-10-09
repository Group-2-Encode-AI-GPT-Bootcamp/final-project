import { useContext } from "react";
import { ApiKeyContext } from "./ApiKeyContext";

export function useApiKey() {
  const context = useContext(ApiKeyContext);

  if (!context) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }

  return context;
}