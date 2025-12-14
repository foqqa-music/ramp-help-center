import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Users, ThumbsUp, ThumbsDown, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { ChunkBlock } from '@/components/ChunkBlock';
import { ArticleCard } from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getArticleBySlug, articles, Article } from '@/data/articles';
import { getRoleLabel } from '@/contexts/PersonaContext';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [activeChunk, setActiveChunk] = useState<string>('');
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);

  useEffect(() => {
    if (slug) {
      const found = getArticleBySlug(slug);
      setArticle(found || null);
      if (found && found.chunks.length > 0) {
        setActiveChunk(found.chunks[0].id);
      }
    }
  }, [slug]);

  // Get related articles
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter(a => 
        a.id !== article.id && 
        (a.category === article.category || 
          a.audience.some(aud => article.audience.includes(aud)))
      )
      .slice(0, 3);
  }, [article]);

  // Handle scroll spy
  useEffect(() => {
    if (!article) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChunk(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    article.chunks.forEach((chunk) => {
      const element = document.getElementById(chunk.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Link to="/" className="text-accent hover:underline">
            Return to Help Center
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
        >
          <Link to="/" className="hover:text-foreground transition-colors">
            Help Center
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/search" className="hover:text-foreground transition-colors">
            {article.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl border border-border p-4"
              >
                <h3 className="font-semibold text-foreground mb-4">On this page</h3>
                <nav className="space-y-1">
                  {article.chunks.map((chunk) => (
                    <a
                      key={chunk.id}
                      href={`#${chunk.id}`}
                      className={`block py-1.5 px-3 rounded-md text-sm transition-colors ${
                        activeChunk === chunk.id
                          ? 'bg-accent/10 text-accent font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {chunk.title}
                    </a>
                  ))}
                </nav>
              </motion.div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border p-6 md:p-8"
            >
              {/* Article Header */}
              <header className="mb-8">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="mb-4 -ml-2"
                >
                  <Link to="/search">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to articles
                  </Link>
                </Button>

                <h1 className="text-3xl font-bold text-foreground mb-4">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Updated {new Date(article.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {article.audience.map(a => getRoleLabel(a)).join(', ')}
                  </span>
                </div>
              </header>

              {/* Article Chunks */}
              <div className="space-y-8">
                {article.chunks.map((chunk, index) => (
                  <ChunkBlock key={chunk.id} chunk={chunk} index={index} />
                ))}
              </div>

              {/* Feedback Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-8 border-t border-border"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="text-foreground font-medium">Was this article helpful?</p>
                  <div className="flex gap-2">
                    <Button
                      variant={feedback === 'helpful' ? 'accent' : 'outline'}
                      size="sm"
                      onClick={() => setFeedback('helpful')}
                      className="gap-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Yes
                    </Button>
                    <Button
                      variant={feedback === 'not-helpful' ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => setFeedback('not-helpful')}
                      className="gap-2"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      No
                    </Button>
                  </div>
                </div>
                {feedback && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-sm text-muted-foreground"
                  >
                    Thank you for your feedback! We use this to improve our help content.
                  </motion.p>
                )}
              </motion.div>
            </motion.article>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <h2 className="text-xl font-semibold text-foreground mb-4">Related Articles</h2>
                <div className="space-y-3">
                  {relatedArticles.map((related, index) => (
                    <ArticleCard key={related.id} article={related} delay={0.1 * index} />
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;
