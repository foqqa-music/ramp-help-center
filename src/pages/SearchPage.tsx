import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { AIAnswerBox } from '@/components/AIAnswerBox';
import { ArticleCard } from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { searchArticles, articles, AudienceType } from '@/data/articles';
import { usePersona, getRoleLabel, RoleType } from '@/contexts/PersonaContext';

const audienceFilters: { value: AudienceType; label: string }[] = [
  { value: 'employee', label: 'Employee' },
  { value: 'admin', label: 'Admin' },
  { value: 'bookkeeper', label: 'Bookkeeper' },
  { value: 'vendor', label: 'Vendor' },
];

const categoryFilters = [
  'Account Settings',
  'Account Access',
  'Support',
  'Expenses',
  'Bill Pay',
  'Travel',
  'Integrations',
  'Vendors',
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { persona, isExploring } = usePersona();
  
  const [selectedAudience, setSelectedAudience] = useState<AudienceType | null>(
    isExploring ? null : (persona.role as AudienceType)
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Update audience filter when persona changes
  useEffect(() => {
    if (!isExploring && persona.role !== 'exploring') {
      setSelectedAudience(persona.role as AudienceType);
    }
  }, [persona, isExploring]);

  const filteredArticles = useMemo(() => {
    let results = query 
      ? searchArticles(query, selectedAudience || undefined)
      : selectedAudience
        ? articles.filter(a => a.audience.includes(selectedAudience))
        : articles;

    if (selectedCategory) {
      results = results.filter(a => a.category === selectedCategory);
    }

    return results;
  }, [query, selectedAudience, selectedCategory]);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  const clearFilters = () => {
    setSelectedAudience(null);
    setSelectedCategory(null);
  };

  const hasActiveFilters = selectedAudience || selectedCategory;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
            {query ? `Results for "${query}"` : 'Browse All Articles'}
          </h1>
          <SearchBar initialQuery={query} onSearch={handleSearch} />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 px-1.5 py-0">
                    {(selectedAudience ? 1 : 0) + (selectedCategory ? 1 : 0)}
                  </Badge>
                )}
              </Button>
              
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-1 text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card rounded-xl border border-border p-4 mb-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">Audience</h3>
                  <div className="flex flex-wrap gap-2">
                    {audienceFilters.map((filter) => (
                      <Button
                        key={filter.value}
                        variant={selectedAudience === filter.value ? 'accent' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedAudience(
                          selectedAudience === filter.value ? null : filter.value
                        )}
                      >
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categoryFilters.map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? 'accent' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(
                          selectedCategory === cat ? null : cat
                        )}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Active Filter Pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {selectedAudience && (
                <Badge variant="secondary" className="gap-1">
                  {getRoleLabel(selectedAudience as RoleType)}
                  <button
                    onClick={() => setSelectedAudience(null)}
                    className="ml-1 hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-1 hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </motion.div>

        {/* AI Answer Box */}
        {query && filteredArticles.length > 0 && (
          <AIAnswerBox query={query} articles={filteredArticles} />
        )}

        {/* Results */}
        <div className="space-y-3">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} delay={0.05 * index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg text-muted-foreground mb-2">
                No articles found{query && ` for "${query}"`}
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
