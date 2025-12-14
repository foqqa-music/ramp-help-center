import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  delay?: number;
}

export const ResourceCard = ({ title, description, icon: Icon, href, delay = 0 }: ResourceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Link
        to={href}
        className="flex flex-col h-full bg-gradient-card rounded-2xl p-6 border border-border/20 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            className="text-secondary-foreground/60 group-hover:text-accent transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
        
        <h3 className="font-semibold text-lg text-secondary-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm text-secondary-foreground/70 flex-1">
          {description}
        </p>
      </Link>
    </motion.div>
  );
};
