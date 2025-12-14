import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';

interface GuideLink {
  title: string;
  slug: string;
}

interface GuideCategory {
  title: string;
  articles: GuideLink[];
}

const guideCategories: GuideCategory[] = [
  {
    title: 'Account & Support',
    articles: [
      { title: 'Manage your communication preferences', slug: 'communication-preferences' },
      { title: 'Troubleshooting Ramp login issues', slug: 'login-troubleshooting' },
      { title: "How to contact Ramp's Support team", slug: 'contact-support' },
    ],
  },
  {
    title: 'Travel',
    articles: [
      { title: 'Booking travel on Ramp: Employee guide', slug: 'booking-travel' },
    ],
  },
  {
    title: 'Expense Policy and Receipts',
    articles: [
      { title: 'Submitting receipts and memos for your Ramp funds', slug: 'receipts-and-memos' },
      { title: 'Submitting reimbursements', slug: 'submitting-reimbursements' },
    ],
  },
  {
    title: 'Bill Pay',
    articles: [
      { title: 'Bill payment methods and timelines', slug: 'bill-payment-methods' },
    ],
  },
  {
    title: 'Integrations',
    articles: [
      { title: 'QuickBooks Online overview', slug: 'quickbooks-online' },
    ],
  },
  {
    title: 'Vendors',
    articles: [
      { title: 'Ramp Vendor Portal', slug: 'vendor-portal' },
      { title: 'Faster Payments', slug: 'faster-payments' },
    ],
  },
];

// Group categories into columns
const columns = [
  guideCategories.slice(0, 2), // Account & Support, Travel
  guideCategories.slice(2, 4), // Expense Policy, Bill Pay
  guideCategories.slice(4, 6), // Integrations, Vendors
];

const GuidesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#1C2B2A] py-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Guides by topic
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full lg:w-auto lg:min-w-[400px]"
            >
              <SearchBar size="default" placeholder="Search our help center" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="space-y-12">
                {column.map((category, catIndex) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (colIndex + catIndex) }}
                  >
                    <h2 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-border">
                      {category.title}
                    </h2>
                    
                    <ul className="space-y-1">
                      {category.articles.map((article) => (
                        <li key={article.slug}>
                          <Link
                            to={`/articles/${article.slug}`}
                            className="block py-3 text-muted-foreground hover:text-foreground hover:underline transition-colors border-b border-border/50"
                          >
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to="/search"
                      className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                    >
                      See all {category.articles.length} article{category.articles.length !== 1 ? 's' : ''}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
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

export default GuidesPage;
