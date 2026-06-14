import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Search } from 'lucide-react';
import { campaigns as initialCampaigns } from '../../data/sampleData';
import toast from 'react-hot-toast';

const card = 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800';
const input = 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-500';
const modalBg = 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700';

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ title: '', description: '', goal: '', category: 'Education', deadline: '', image: '' });

  const filtered = campaigns.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    const newCampaign = {
      id: Date.now().toString(),
      ...form,
      goal: parseInt(form.goal),
      raised: 0,
      volunteers: 0,
      donors: 0,
      image: form.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format',
    };
    setCampaigns(prev => [newCampaign, ...prev]);
    setShowModal(false);
    setForm({ title: '', description: '', goal: '', category: 'Education', deadline: '', image: '' });
    toast.success('Campaign created!');
  };

  const handleDelete = (id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    toast.success('Campaign deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
          <p className="text-gray-500 text-sm mt-1">{campaigns.length} active campaigns</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> New Campaign
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none ${input}`}
          placeholder="Search campaigns..." />
      </div>

      <div className="space-y-3">
        {filtered.map((campaign, i) => {
          const progress = Math.round((campaign.raised / campaign.goal) * 100);
          return (
            <motion.div key={campaign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl p-5 flex items-center gap-4 ${card}`}>
              <img src={campaign.image} alt={campaign.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{campaign.title}</h3>
                  <span className="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex-shrink-0">{campaign.category}</span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>₹{(campaign.raised / 1000).toFixed(0)}K / ₹{(campaign.goal / 1000).toFixed(0)}K</span>
                  <span>{campaign.donors} donors</span>
                  <span>Deadline: {new Date(campaign.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mt-2 overflow-hidden w-full max-w-xs">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors">
                  <Edit2 size={15} />
                </button>
                <button onClick={() => handleDelete(campaign.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-3xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto ${modalBg}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create Campaign</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                {[
                  { label: 'Title', key: 'title', type: 'text', placeholder: 'Campaign title' },
                  { label: 'Goal Amount (₹)', key: 'goal', type: 'number', placeholder: '500000' },
                  { label: 'Deadline', key: 'deadline', type: 'date', placeholder: '' },
                  { label: 'Image URL', key: 'image', type: 'url', placeholder: 'https://...' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
                    <input required={f.key !== 'image'} type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none ${input}`}
                      placeholder={f.placeholder} />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none ${input}`}>
                    {['Education', 'Food & Nutrition', 'Healthcare', 'Environment', 'Women Empowerment'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                  <textarea required rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none resize-none ${input}`}
                    placeholder="Campaign description..." />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 gradient-bg text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">Create Campaign</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
