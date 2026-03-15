'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  url: string;
  tag: string;
  tagColor: string;
}

const resources: Resource[] = [
  {
    title: 'ETS Official GRE Practice Tests (Free)',
    description: 'Two full-length, official GRE practice tests from the test makers themselves. The gold standard for authentic practice.',
    url: 'https://www.ets.org/gre/test-takers/general-test/prepare/materials/free-materials.html',
    tag: 'FREE',
    tagColor: 'bg-green-500/20 text-green-400',
  },
  {
    title: 'GRE Math Review (Official PDF)',
    description: 'ETSs 150-page comprehensive Math Review covering all Quant topics tested on the GRE with worked examples.',
    url: 'https://www.ets.org/pdfs/gre/gre-math-review.pdf',
    tag: 'PDF',
    tagColor: 'bg-blue-500/20 text-blue-400',
  },
  {
    title: 'Manhattan Prep GRE Blog',
    description: 'Expert strategy articles on GRE vocabulary, reading comprehension, and quantitative reasoning from 99th percentile instructors.',
    url: 'https://www.manhattanprep.com/gre/blog/',
    tag: 'BLOG',
    tagColor: 'bg-purple-500/20 text-purple-400',
  },
  {
    title: 'Magoosh GRE Vocabulary Flashcards',
    description: '1,000 of the most important GRE words with definitions, sentences, and audio—completely free on their website.',
    url: 'https://gre.magoosh.com/flashcards/vocabulary',
    tag: 'FREE',
    tagColor: 'bg-green-500/20 text-green-400',
  },
  {
    title: 'GregMat+ YouTube Channel',
    description: 'Highly structured, free GRE prep videos covering every section type. One of the most viewed GRE instructors online.',
    url: 'https://www.youtube.com/@GregMat',
    tag: 'VIDEO',
    tagColor: 'bg-red-500/20 text-red-400',
  },
  {
    title: 'PowerScore GRE Verbal Bible',
    description: 'Deep-dive analytical guide to GRE Verbal reasoning, text completion, and reading comprehension strategies.',
    url: 'https://www.powerscore.com/gre/publications/',
    tag: 'BOOK',
    tagColor: 'bg-amber-500/20 text-amber-400',
  },
];

export function ResourceLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map((res, i) => (
        <motion.a
          key={i}
          href={res.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ x: 4 }}
          className="flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all group"
        >
          <div className="mt-0.5 p-2.5 rounded-xl bg-secondary border border-border/50 group-hover:border-primary/30 shrink-0 transition-colors">
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{res.title}</span>
              <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${res.tagColor}`}>
                {res.tag}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{res.description}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
