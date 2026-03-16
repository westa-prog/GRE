'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Plus, Trash2, FileText, Link as LinkIcon, Tag } from 'lucide-react';
import { useResourceStore, TAG_COLORS, ResourceTag } from '@/store/resourceStore';
import { useAuthStore } from '@/store/authStore';
import clsx from 'clsx';

export function ResourceLinks() {
  const resources = useResourceStore((state) => state.resources);
  const addResource = useResourceStore((state) => state.addResource);
  const deleteResource = useResourceStore((state) => state.deleteResource);
  const loadFromStorage = useResourceStore((state) => state.loadFromStorage);
  const role = useAuthStore((state) => state.role);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newTag, setNewTag] = useState<ResourceTag>('PDF');

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;
    
    addResource({
      title: newTitle.trim(),
      description: newDesc.trim(),
      url: newUrl.trim(),
      tag: newTag,
    });
    
    setNewTitle('');
    setNewDesc('');
    setNewUrl('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {role === 'admin' && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Cancel' : 'Add New Resource'}
          </button>
        </div>
      )}

      <AnimatePresence>
        {showAddForm && role === 'admin' && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
            onSubmit={handleAdd}
          >
            <div className="p-6 bg-card border border-border/50 rounded-2xl shadow-sm space-y-4 mb-6">
              <h3 className="font-semibold text-lg">Add New Resource (PDF, Book, Link)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Title</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      placeholder="e.g. Official GRE Math PDF"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">URL / Link</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} required
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                  <textarea 
                    value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                    placeholder="Brief description of this resource..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Tag / Category</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      value={newTag} onChange={(e) => setNewTag(e.target.value as ResourceTag)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none"
                    >
                      {Object.keys(TAG_COLORS).map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Save Resource
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((res, i) => (
          <motion.div
            key={res.id || i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group relative flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
          >
            <a href={res.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0 rounded-2xl" aria-label={`Open ${res.title}`} />
            
            <div className="mt-0.5 p-2.5 rounded-xl bg-secondary border border-border/50 group-hover:border-primary/30 shrink-0 transition-colors relative z-10 pointer-events-none">
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            
            <div className="flex-1 relative z-10 pointer-events-none">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{res.title}</span>
                <span className={clsx("text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full", TAG_COLORS[res.tag])}>
                  {res.tag}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pr-6">{res.description}</p>
            </div>

            {role === 'admin' && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteResource(res.id);
                }}
                className="absolute top-4 right-4 p-2 rounded-lg bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-all z-20"
                aria-label="Delete resource"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
