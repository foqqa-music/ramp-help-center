import { motion } from 'framer-motion';
import { User, Settings, CheckCircle2, Building2, Users, Briefcase } from 'lucide-react';
import { usePersona, getRoleLabel, getPlanLabel } from '@/contexts/PersonaContext';
import { Button } from '@/components/ui/button';

interface PersonaBannerProps {
  onChangeClick?: () => void;
}

export const PersonaBanner = ({ onChangeClick }: PersonaBannerProps) => {
  const { persona, isExploring } = usePersona();

  if (isExploring) return null;

  // Show welcome banner for identified companies
  if (persona.identified && persona.company) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="flex items-center justify-center gap-3 py-2.5 px-5 bg-accent/10 border border-accent/20 rounded-full text-sm">
          <Building2 className="w-4 h-4 text-accent" />
          <span className="text-foreground">
            Welcome! Visiting from <span className="font-semibold text-accent">{persona.company}</span>
          </span>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-accent/20 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-accent" />
            <span className="text-xs font-medium text-accent">Identified</span>
          </div>
          {onChangeClick && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 ml-1"
              onClick={onChangeClick}
            >
              <Settings className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        {/* Industry and size badges */}
        {(persona.industry || persona.size) && (
          <div className="flex items-center gap-2">
            {persona.industry && (
              <div className="flex items-center gap-1 px-2.5 py-1 bg-muted/60 rounded-full text-xs text-muted-foreground">
                <Briefcase className="w-3 h-3" />
                <span>{persona.industry}</span>
              </div>
            )}
            {persona.size && (
              <div className="flex items-center gap-1 px-2.5 py-1 bg-muted/60 rounded-full text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                <span>{persona.size} employees</span>
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="flex items-center justify-center gap-2 py-2 px-4 bg-muted/50 rounded-full text-sm"
    >
      <User className="w-4 h-4 text-muted-foreground" />
      <span className="text-muted-foreground">Browsing as:</span>
      <span className="font-medium text-foreground">
        {getRoleLabel(persona.role)}
        {persona.plan && ` · ${getPlanLabel(persona.plan)}`}
      </span>
      {onChangeClick && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 ml-1"
          onClick={onChangeClick}
        >
          <Settings className="w-3 h-3" />
        </Button>
      )}
    </motion.div>
  );
};
