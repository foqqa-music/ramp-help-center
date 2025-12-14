import { motion } from 'framer-motion';
import { Building2, FileText } from 'lucide-react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { PersonaBanner } from '@/components/PersonaBanner';
import { PersonaSelector } from '@/components/PersonaSelector';
import { CategoryCard } from '@/components/CategoryCard';
import { ResourceCard } from '@/components/ResourceCard';
import { OnboardingBanner } from '@/components/OnboardingBanner';
import { ArticleCard } from '@/components/ArticleCard';
import { usePersona } from '@/contexts/PersonaContext';
import { articles, getArticlesByAudience, AudienceType } from '@/data/articles';

const categories = [
  {
    title: 'Getting Started',
    description: 'Set up your account and learn the basics',
    icon: 'Rocket',
    href: '/search?q=getting+started',
    gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
  },
  {
    title: 'Payments & Bills',
    description: 'Manage bill payments, methods, and timelines',
    icon: 'CreditCard',
    href: '/search?q=payment',
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  },
  {
    title: 'Expenses & Receipts',
    description: 'Submit receipts, memos, and reimbursements',
    icon: 'Receipt',
    href: '/search?q=receipt',
    gradient: 'bg-gradient-to-br from-orange-500 to-rose-600',
  },
];

const Index = () => {
  const { persona, isExploring } = usePersona();

  // Get articles based on persona
  const displayArticles = isExploring 
    ? articles.slice(0, 10)
    : getArticlesByAudience(persona.role as AudienceType).slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            How can we help?
          </motion.h1>
          
          <SearchBar size="large" />
          
          <div className="mt-6">
            <PersonaBanner />
          </div>
        </section>

        {/* Persona Selector (only if exploring) */}
        {isExploring && (
          <section>
            <PersonaSelector />
          </section>
        )}

        {/* Featured Categories */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-foreground mb-6"
          >
            Featured Topics
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.title}
                {...category}
                delay={0.4 + index * 0.1}
              />
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResourceCard
              title="About Ramp"
              description="Find out more about joining Ramp and how our platform can help your business"
              icon={Building2}
              href="https://support.ramp.com/hc/en-us/categories/4408650449043-About-Ramp"
              delay={0.5}
              external
            />
            <ResourceCard
              title="Guides by Topic"
              description="FAQs and best practices for using the platform effectively"
              icon={FileText}
              href="https://support.ramp.com/hc/en-us/categories/4669349730963-Guides-by-topic"
              delay={0.6}
              external
            />
          </div>
        </section>

        {/* Onboarding Banner */}
        <OnboardingBanner />

        {/* Popular Articles */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-2xl font-bold text-foreground mb-6"
          >
            {isExploring ? 'Popular Articles' : 'Recommended for You'}
          </motion.h2>
          
          <div className="space-y-3">
            {displayArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} delay={0.05 * index} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Ramp. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
