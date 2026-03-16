import { create } from 'zustand';

export const TAG_COLORS = {
  FREE: 'bg-green-500/20 text-green-400',
  PDF: 'bg-blue-500/20 text-blue-400',
  BLOG: 'bg-purple-500/20 text-purple-400',
  VIDEO: 'bg-red-500/20 text-red-400',
  BOOK: 'bg-amber-500/20 text-amber-400',
} as const;

export type ResourceTag = keyof typeof TAG_COLORS;

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  tag: ResourceTag;
}

export const defaultResources: Resource[] = [
  {
    id: '1',
    title: 'ETS Official GRE Practice Tests (Free)',
    description: 'Two full-length, official GRE practice tests from the test makers themselves. The gold standard for authentic practice.',
    url: 'https://www.ets.org/gre/test-takers/general-test/prepare/materials/free-materials.html',
    tag: 'FREE',
  },
  {
    id: '2',
    title: 'GRE Math Review (Official PDF)',
    description: 'ETSs 150-page comprehensive Math Review covering all Quant topics tested on the GRE with worked examples.',
    url: 'https://www.ets.org/pdfs/gre/gre-math-review.pdf',
    tag: 'PDF',
  },
  {
    id: '3',
    title: 'Manhattan Prep GRE Blog',
    description: 'Expert strategy articles on GRE vocabulary, reading comprehension, and quantitative reasoning from 99th percentile instructors.',
    url: 'https://www.manhattanprep.com/gre/blog/',
    tag: 'BLOG',
  },
  {
    id: '4',
    title: 'Magoosh GRE Vocabulary Flashcards',
    description: '1,000 of the most important GRE words with definitions, sentences, and audio—completely free on their website.',
    url: 'https://gre.magoosh.com/flashcards/vocabulary',
    tag: 'FREE',
  },
  {
    id: '5',
    title: 'GregMat+ YouTube Channel',
    description: 'Highly structured, free GRE prep videos covering every section type. One of the most viewed GRE instructors online.',
    url: 'https://www.youtube.com/@GregMat',
    tag: 'VIDEO',
  },
  {
    id: '6',
    title: 'PowerScore GRE Verbal Bible',
    description: 'Deep-dive analytical guide to GRE Verbal reasoning, text completion, and reading comprehension strategies.',
    url: 'https://www.powerscore.com/gre/publications/',
    tag: 'BOOK',
  },
];

interface ResourceState {
  resources: Resource[];
  isLoaded: boolean;
  addResource: (res: Omit<Resource, 'id'>) => void;
  deleteResource: (id: string) => void;
  loadFromStorage: () => void;
}

const RESOURCES_KEY = 'gre_resources';

export const useResourceStore = create<ResourceState>((set, get) => ({
  resources: defaultResources,
  isLoaded: false,

  loadFromStorage: () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(RESOURCES_KEY);
      if (raw) {
        set({ resources: JSON.parse(raw), isLoaded: true });
      } else {
        set({ resources: defaultResources, isLoaded: true });
        window.localStorage.setItem(RESOURCES_KEY, JSON.stringify(defaultResources));
      }
    } catch {
      set({ resources: defaultResources, isLoaded: true });
    }
  },

  addResource: (res) => {
    const newResource = { ...res, id: Date.now().toString() };
    const newResources = [newResource, ...get().resources];
    set({ resources: newResources });
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(RESOURCES_KEY, JSON.stringify(newResources));
    }
  },

  deleteResource: (id) => {
    const newResources = get().resources.filter((r) => r.id !== id);
    set({ resources: newResources });
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(RESOURCES_KEY, JSON.stringify(newResources));
    }
  },
}));
