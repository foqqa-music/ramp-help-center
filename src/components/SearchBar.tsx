import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  size?: 'default' | 'large';
  onSearch?: (query: string) => void;
}

export const SearchBar = ({ initialQuery = '', size = 'default', onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const isLarge = size === 'large';

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full max-w-3xl mx-auto"
    >
      <motion.div
        animate={{
          boxShadow: isFocused 
            ? '0 0 0 3px hsl(72 100% 50% / 0.3), 0 4px 20px rgba(0, 0, 0, 0.1)' 
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
        transition={{ duration: 0.2 }}
        className={`flex items-center bg-card rounded-full border border-border ${
          isLarge ? 'px-6 py-5' : 'px-5 py-3'
        }`}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className={`${isLarge ? 'w-5 h-5' : 'w-4 h-4'} text-accent`} />
          <Search className={`${isLarge ? 'w-5 h-5' : 'w-4 h-4'}`} />
        </div>
        
        <input
          type="text"
          placeholder="Ask anything..."
          className={`flex-1 outline-none bg-transparent text-foreground placeholder:text-muted-foreground ${
            isLarge ? 'text-lg ml-4' : 'text-base ml-3'
          }`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`bg-accent text-accent-foreground rounded-full flex items-center justify-center transition-colors hover:bg-accent/90 ${
            isLarge ? 'p-3' : 'p-2'
          }`}
        >
          <ArrowRight className={isLarge ? 'w-5 h-5' : 'w-4 h-4'} />
        </motion.button>
      </motion.div>
    </motion.form>
  );
};
