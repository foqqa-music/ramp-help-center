import { motion } from 'framer-motion';
import { Sparkles, FileText } from 'lucide-react';
import { Article } from '@/data/articles';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface AIAnswerBoxProps {
  query: string;
  articles: Article[];
}

export const AIAnswerBox = ({ query, articles }: AIAnswerBoxProps) => {
  if (articles.length === 0) return null;

  // Generate a synthetic answer based on the top results
  const topArticle = articles[0];
  const firstChunk = topArticle.chunks[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl border border-accent/20 p-6 mb-8"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-1">AI-Powered Answer</h3>
          <p className="text-sm text-muted-foreground">Based on {articles.length} articles</p>
        </div>
      </div>

      <div className="pl-11">
        <p className="text-foreground mb-4 leading-relaxed">
          Based on your search for "{query}", here's what we found: {topArticle.description}
        </p>

        <div className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {firstChunk.content.substring(0, 200)}...
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground font-medium">Sources:</span>
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="inline-flex items-center gap-1 text-xs bg-card px-2 py-1 rounded-md border border-border hover:border-accent/50 transition-colors"
            >
              <FileText className="w-3 h-3" />
              {article.title}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
