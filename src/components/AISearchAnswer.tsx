import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, FileText, Loader2 } from 'lucide-react';
import { AISearchResult } from '@/hooks/useAISearch';

interface AISearchAnswerProps {
  result: AISearchResult | null;
  isLoading: boolean;
  error: string | null;
}

export const AISearchAnswer = ({ result, isLoading, error }: AISearchAnswerProps) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl border border-accent/20 p-6 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Loader2 className="w-4 h-4 text-accent animate-spin" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Searching Help Center...</h3>
            <p className="text-sm text-muted-foreground">Finding relevant articles and generating an answer</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-destructive/5 rounded-2xl border border-destructive/20 p-6 mb-8"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Search Error</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!result) return null;

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
          <p className="text-sm text-muted-foreground">
            Based on {result.sources.length} help article{result.sources.length !== 1 ? 's' : ''} from Ramp
          </p>
        </div>
      </div>

      <div className="pl-11">
        <div className="prose prose-sm max-w-none text-foreground mb-6 leading-relaxed whitespace-pre-wrap">
          {result.answer}
        </div>

        {result.sources.length > 0 && (
          <div className="border-t border-accent/20 pt-4">
            <span className="text-xs font-medium text-muted-foreground mb-3 block">Sources</span>
            <div className="flex flex-col gap-2">
              {result.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 p-3 bg-card rounded-lg border border-border hover:border-accent/50 transition-colors group"
                >
                  <FileText className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors truncate">
                      {source.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {source.snippet}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
