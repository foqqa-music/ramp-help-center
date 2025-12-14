import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Store, Compass, Loader2 } from 'lucide-react';
import { usePersona, RoleType } from '@/contexts/PersonaContext';
import { useSnitcherIdentify } from '@/hooks/useSnitcherIdentify';

interface PersonaOption {
  role: RoleType;
  icon: React.ElementType;
  title: string;
  description: string;
}

const options: PersonaOption[] = [
  {
    role: 'employee',
    icon: Building2,
    title: "I'm a Customer",
    description: 'Access help for employees, admins, and bookkeepers',
  },
  {
    role: 'vendor',
    icon: Store,
    title: "I'm a Vendor",
    description: 'Get help with payments and the vendor portal',
  },
  {
    role: 'exploring',
    icon: Compass,
    title: "I'm Exploring Ramp",
    description: 'Browse all help content without filters',
  },
];

export const PersonaSelector = () => {
  const { setPersona, hasSelectedPersona, isIdentifying } = usePersona();
  
  // Initialize Snitcher identification
  useSnitcherIdentify();

  // Hide selector if user has already made a selection (including "exploring")
  if (hasSelectedPersona) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-4xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {isIdentifying ? (
          <motion.div
            key="identifying"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-8"
          >
            <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
            <p className="text-muted-foreground">Detecting your organization...</p>
          </motion.div>
        ) : (
          <motion.div
            key="selector"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-center text-muted-foreground mb-6">
              Select your role for personalized help content
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {options.map((option, index) => (
                <motion.button
                  key={option.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPersona({ role: option.role === 'exploring' ? 'exploring' : option.role, plan: 'plus' })}
                  className="flex flex-col items-center p-6 bg-card rounded-2xl border-2 border-border hover:border-accent hover:shadow-card-hover transition-all duration-200 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                    <option.icon className="w-7 h-7 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">{option.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
