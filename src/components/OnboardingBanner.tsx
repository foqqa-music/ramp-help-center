import { motion } from 'framer-motion';
import { ExternalLink, Play, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const OnboardingBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full bg-gradient-hero rounded-2xl p-8 border border-border/10"
    >
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-primary-foreground mb-3">
          Check out our Onboarding Resources
        </h2>
        <p className="text-primary-foreground/80 mb-6">
          Get up to speed quickly with our comprehensive training materials, including live sessions, 
          self-paced courses, and an active community forum.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <Button variant="accent" className="gap-2" asChild>
            <a href="https://ramp.com/training#live-webinars" target="_blank" rel="noopener noreferrer">
              <Play className="w-4 h-4" />
              Live training
            </a>
          </Button>
          <Button variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground gap-2" asChild>
            <a href="https://ramp.com/training" target="_blank" rel="noopener noreferrer">
              <BookOpen className="w-4 h-4" />
              On-demand resources
            </a>
          </Button>
          <Button variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground gap-2" asChild>
            <a href="https://community.ramp.com/" target="_blank" rel="noopener noreferrer">
              <Users className="w-4 h-4" />
              Community forum
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
