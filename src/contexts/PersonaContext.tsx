import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type RoleType = 'employee' | 'admin' | 'bookkeeper' | 'vendor' | 'exploring';
export type PlanType = 'free' | 'plus' | 'enterprise';

export interface Persona {
  role: RoleType;
  plan?: PlanType;
  company?: string;
  industry?: string;
  identified?: boolean;
  hasSelected?: boolean;
}

interface PersonaContextType {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  clearPersona: () => void;
  isExploring: boolean;
  hasSelectedPersona: boolean;
  isIdentifying: boolean;
  setIsIdentifying: (value: boolean) => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

const STORAGE_KEY = 'ramp-help-persona';

export const PersonaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [persona, setPersonaState] = useState<Persona>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { role: 'exploring' };
      }
    }
    return { role: 'exploring' };
  });
  const [isIdentifying, setIsIdentifying] = useState(true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persona));
  }, [persona]);

  const setPersona = (newPersona: Persona) => {
    setPersonaState({ ...newPersona, hasSelected: true });
  };

  const clearPersona = () => {
    setPersonaState({ role: 'exploring', hasSelected: false });
  };

  const isExploring = persona.role === 'exploring';
  const hasSelectedPersona = persona.hasSelected || false;

  return (
    <PersonaContext.Provider value={{ persona, setPersona, clearPersona, isExploring, hasSelectedPersona, isIdentifying, setIsIdentifying }}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
};

export const getRoleLabel = (role: RoleType): string => {
  const labels: Record<RoleType, string> = {
    employee: 'Employee',
    admin: 'Admin',
    bookkeeper: 'Bookkeeper',
    vendor: 'Vendor',
    exploring: 'Exploring',
  };
  return labels[role];
};

export const getPlanLabel = (plan?: PlanType): string => {
  if (!plan) return '';
  const labels: Record<PlanType, string> = {
    free: 'Free',
    plus: 'Ramp Plus',
    enterprise: 'Enterprise',
  };
  return labels[plan];
};
