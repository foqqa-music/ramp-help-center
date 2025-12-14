import { motion } from 'framer-motion';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';
import { ArticleChunk } from '@/data/articles';

interface ChunkBlockProps {
  chunk: ArticleChunk;
  index: number;
}

export const ChunkBlock = ({ chunk, index }: ChunkBlockProps) => {
  // Parse content for special formatting
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    
    return lines.map((line, i) => {
      // Headers
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={i} className="font-semibold text-foreground mt-4 mb-2">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      
      // List items
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="ml-4 text-foreground/90">
            {formatInlineMarkdown(line.substring(2))}
          </li>
        );
      }
      
      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={i} className="ml-4 text-foreground/90 list-decimal">
            {formatInlineMarkdown(line.replace(/^\d+\.\s/, ''))}
          </li>
        );
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <br key={i} />;
      }
      
      // Regular paragraphs
      return (
        <p key={i} className="text-foreground/90 leading-relaxed">
          {formatInlineMarkdown(line)}
        </p>
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    // Bold text
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <motion.section
      id={chunk.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="scroll-mt-24"
    >
      <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
        {chunk.title}
      </h2>
      <div className="prose prose-sm max-w-none">
        {renderContent(chunk.content)}
      </div>
    </motion.section>
  );
};

interface CalloutProps {
  type: 'info' | 'warning' | 'tip';
  children: React.ReactNode;
}

export const Callout = ({ type, children }: CalloutProps) => {
  const styles = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-800',
      icon: Info,
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    tip: {
      bg: 'bg-green-50 dark:bg-green-950/30',
      border: 'border-green-200 dark:border-green-800',
      icon: Lightbulb,
      iconColor: 'text-green-600 dark:text-green-400',
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${style.bg} ${style.border} my-4`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.iconColor}`} />
      <div className="text-sm text-foreground/90">{children}</div>
    </div>
  );
};
