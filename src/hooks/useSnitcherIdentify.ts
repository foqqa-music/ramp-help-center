import { useEffect, useRef } from 'react';
import { usePersona } from '@/contexts/PersonaContext';

declare global {
  interface Window {
    Snitcher?: {
      on: (event: string, callback: (data: SnitcherData) => void) => void;
      off: (event: string, callback: (data: SnitcherData) => void) => void;
    };
  }
}

interface SnitcherData {
  company?: {
    name: string;
    industry?: string;
  };
}

export const useSnitcherIdentify = () => {
  const { persona, setPersona, setIsIdentifying } = usePersona();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasIdentifiedRef = useRef(false);

  useEffect(() => {
    // Don't re-identify if already identified or if user already selected a persona
    if (persona.identified || persona.role !== 'exploring') {
      setIsIdentifying(false);
      return;
    }

    const handleIdentify = (data: SnitcherData) => {
      if (data.company && !hasIdentifiedRef.current) {
        hasIdentifiedRef.current = true;
        
        // Clear the timeout since we got a response
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        setPersona({
          role: 'employee',
          plan: 'plus',
          company: data.company.name,
          industry: data.company.industry,
          identified: true,
        });
        setIsIdentifying(false);
      }
    };

    // Set up the 3-second timeout fallback
    timeoutRef.current = setTimeout(() => {
      if (!hasIdentifiedRef.current) {
        setIsIdentifying(false);
      }
    }, 3000);

    // Listen for Snitcher identify event
    if (window.Snitcher) {
      window.Snitcher.on('identify', handleIdentify);
    } else {
      // If Snitcher isn't loaded yet, wait for it
      const checkInterval = setInterval(() => {
        if (window.Snitcher) {
          window.Snitcher.on('identify', handleIdentify);
          clearInterval(checkInterval);
        }
      }, 100);

      // Clean up interval after 3 seconds
      setTimeout(() => clearInterval(checkInterval), 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (window.Snitcher) {
        window.Snitcher.off('identify', handleIdentify);
      }
    };
  }, [persona.identified, persona.role, setPersona, setIsIdentifying]);

  return {
    isIdentified: persona.identified || false,
    company: persona.company,
    industry: persona.industry,
  };
};
