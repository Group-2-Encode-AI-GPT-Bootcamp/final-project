"use client";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { useApiKey } from "@/hooks/useApiKey";

export default function RiskScoreCard() {
  const [twitterHandle, setTwitterHandle] = useState("");
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const { apiKey } = useApiKey();

  // useEffect(() => {
  //   console.log("API Key:", apiKey);
  // }, [apiKey]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRiskScore(null);
    setExplanation(null);

    // if (!apiKey) {
    //   setError("Please enter your OpenAI API key in the settings.");
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const response = await fetch("/api/generate-risk-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ twitterHandle }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate risk score");
      }

      const data = await response.json();
      setRiskScore(data.riskScore);
      setExplanation(data.result); // Capture AI's explanation 
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 5) return "text-red-700";
    if (score >= 5 && score <= 8) return "text-yellow-600";
    return "text-green-700";
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8 pt-20">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Generate Risk Score</CardTitle>
          <CardDescription>
            Enter a Twitter handle to analyze the Web3 risk score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="twitter-handle" className="text-sm font-medium">
                Twitter Handle
              </label>
              <Input
                id="twitter-handle"
                placeholder="e.g., elonmusk"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Risk Score
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {riskScore !== null && (
            <div className="mt-6 p-4 bg-green-100 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Risk Score Result</h2>
              <p className={`text-3xl font-bold ${getRiskScoreColor(riskScore)}`}>{riskScore}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {explanation && (
        <Card className="w-full max-w-xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Explanation of Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactMarkdown className="prose text-gray-700">
              {explanation}
            </ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
