import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, User, Building2, Store, Compass } from 'lucide-react';
import rampLogo from '@/assets/ramp-logo.png';
import { usePersona, getRoleLabel, getPlanLabel, RoleType } from '@/contexts/PersonaContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Browse Articles' },
];

const personaOptions: { role: RoleType; icon: React.ElementType; label: string }[] = [
  { role: 'employee', icon: User, label: 'Employee' },
  { role: 'admin', icon: Building2, label: 'Admin' },
  { role: 'bookkeeper', icon: Building2, label: 'Bookkeeper' },
  { role: 'vendor', icon: Store, label: 'Vendor' },
  { role: 'exploring', icon: Compass, label: 'Exploring' },
];

export const Header = () => {
  const location = useLocation();
  const { persona, setPersona, isExploring } = usePersona();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={rampLogo} alt="Ramp" className="h-9 w-9" />
            <span className="text-xl font-bold text-foreground">Help Center</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              {isExploring ? (
                <>
                  <Compass className="h-4 w-4" />
                  <span className="hidden sm:inline">Select Role</span>
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {getRoleLabel(persona.role)}
                    {persona.plan && ` · ${getPlanLabel(persona.plan)}`}
                  </span>
                </>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {personaOptions.map((option) => (
              <DropdownMenuItem
                key={option.role}
                onClick={() => setPersona({ role: option.role, plan: 'plus' })}
                className={persona.role === option.role ? 'bg-muted' : ''}
              >
                <option.icon className="h-4 w-4 mr-2" />
                {option.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setPersona({ role: 'exploring' })}>
              <Compass className="h-4 w-4 mr-2" />
              Reset Selection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};
