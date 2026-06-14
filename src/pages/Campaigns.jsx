import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { campaigns } from '../data/sampleData';
import CampaignCard from '../components/ui/CampaignCard';
import { SkeletonCard } from '../components/ui/LoadingSkeleton';

const categories = ['All', 'Education', 'Food & Nutrition', 'Environment', 'Healthcare', 'Women Empowerment'];

export default function Campaigns() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const filtered = campaigns
    .filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || c.category === selectedCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'progress') return (b.raised / b.goal) - (a.raised / a.goal);
      if (sortBy === 'goal') return b.goal - a.goal;
      if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
      return 0;
    });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-white mb-4">
            Active Campaigns
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-white/80 text-lg">
            Every donation drives real change. Choose a cause close to your heart.
          </motion.p>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search campaigns..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-300"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-300"
            >
              <option value="default">Sort by: Default</option>
              <option value="progress">Progress</option>
              <option value="goal">Goal Amount</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'gradient-bg text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Showing <span className="font-medium text-gray-900 dark:text-white">{filtered.length}</span> campaigns
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No campaigns found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
              <button onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                className="mt-4 px-6 py-2.5 gradient-bg text-white rounded-xl text-sm font-medium">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((campaign, i) => (
                <CampaignCard key={campaign.id} campaign={campaign} delay={i * 0.05} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
