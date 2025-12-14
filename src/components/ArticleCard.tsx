import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Article } from '@/data/articles';
import { Badge } from '@/components/ui/badge';

interface ArticleCardProps {
  article: Article;
  delay?: number;
}

export const ArticleCard = ({ article, delay = 0 }: ArticleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ x: 4 }}
      className="group"
    >
      <Link
        to={`/articles/${article.slug}`}
        className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-accent/50 hover:shadow-card transition-all duration-200"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
              {article.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground truncate mb-2">
            {article.description}
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {article.category}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {new Date(article.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 ml-4" />
      </Link>
    </motion.div>
  );
};
