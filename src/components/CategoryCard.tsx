import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, CreditCard, Receipt, LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  delay?: number;
  gradient: string;
}

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  CreditCard,
  Receipt,
};

export const CategoryCard = ({ title, description, icon, href, delay = 0, gradient }: CategoryCardProps) => {
  const IconComponent = iconMap[icon] || Rocket;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link
        to={href}
        className="block h-full bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
      >
        <div className={`h-32 flex items-center justify-center ${gradient}`}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-16 h-16 bg-card/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
          >
            <IconComponent className="w-8 h-8 text-card" />
          </motion.div>
        </div>
        
        <div className="p-5">
          <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};
