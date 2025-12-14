import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SearchSource {
  title: string;
  snippet: string;
  url: string;
}

export interface AISearchResult {
  answer: string;
  sources: SearchSource[];
  query: string;
}

export const useAISearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AISearchResult | null>(null);

  const search = async (query: string): Promise<AISearchResult | null> => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return null;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('searchHelpCenter', {
        body: { query },
      });

      if (fnError) {
        console.error('Search function error:', fnError);
        setError('Failed to search. Please try again.');
        return null;
      }

      if (data.error) {
        console.error('Search error:', data.error);
        setError(data.error);
        return null;
      }

      setResult(data);
      return data;
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    search,
    reset,
    isLoading,
    error,
    result,
  };
};
