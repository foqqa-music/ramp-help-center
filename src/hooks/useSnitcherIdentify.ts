import { useEffect, useRef } from 'react';
import { usePersona } from '@/contexts/PersonaContext';
import { supabase } from '@/integrations/supabase/client';

interface SnitcherCompany {
  name: string | null;
  industry: string | null;
  size: string | null;
  domain: string | null;
  logo: string | null;
}

interface SnitcherResponse {
  identified: boolean;
  company?: SnitcherCompany;
  reason?: string;
  error?: string;
}

export const useSnitcherIdentify = () => {
  const { persona, setPersona, setIsIdentifying } = usePersona();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasIdentifiedRef = useRef(false);
  const hasCalledRef = useRef(false);

  useEffect(() => {
    // Don't re-identify if already identified or if user already selected a persona
    if (persona.identified || persona.hasSelected) {
      setIsIdentifying(false);
      return;
    }

    // Prevent duplicate calls
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    const identifyVisitor = async () => {
      try {
        console.log('Calling identifyVisitor edge function...');
        
        const { data, error } = await supabase.functions.invoke<SnitcherResponse>('identifyVisitor', {
          body: {},
        });

        console.log('identifyVisitor response:', data, error);

        if (error) {
          console.error('Edge function error:', error);
          setIsIdentifying(false);
          return;
        }

        if (data?.identified && data.company?.name && !hasIdentifiedRef.current) {
          hasIdentifiedRef.current = true;
          
          // Clear the timeout since we got a response
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          setPersona({
            role: 'employee', // Auto-select customer type
            plan: 'plus',
            company: data.company.name,
            industry: data.company.industry || undefined,
            size: data.company.size || undefined,
            identified: true,
          });
          setIsIdentifying(false);
        } else {
          console.log('No company identified:', data?.reason);
          setIsIdentifying(false);
        }
      } catch (err) {
        console.error('Error calling identifyVisitor:', err);
        setIsIdentifying(false);
      }
    };

    // Set up the 3-second timeout fallback
    timeoutRef.current = setTimeout(() => {
      if (!hasIdentifiedRef.current) {
        console.log('Identification timeout - falling back to manual selection');
        setIsIdentifying(false);
      }
    }, 5000);

    // Call the edge function
    identifyVisitor();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [persona.identified, persona.hasSelected, setPersona, setIsIdentifying]);

  return {
    isIdentified: persona.identified || false,
    company: persona.company,
    industry: persona.industry,
    size: persona.size,
  };
};
