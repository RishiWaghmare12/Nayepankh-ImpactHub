import { motion } from 'framer-motion';
import { Download, CheckCircle } from 'lucide-react';

const mockDonations = [
  { id: 'NP8834521A', amount: 500, purpose: 'Food & Nutrition', date: '2025-01-15', status: 'completed' },
  { id: 'NP7723410B', amount: 1000, purpose: 'Education Support', date: '2024-12-20', status: 'completed' },
  { id: 'NP6612309C', amount: 250, purpose: 'Healthcare', date: '2024-11-05', status: 'completed' },
  { id: 'NP5501208D', amount: 2500, purpose: 'Women Empowerment', date: '2024-10-18', status: 'completed' },
];

export default function DonationHistory() {
  const totalDonated = mockDonations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Donation History</h1>
        <p className="text-sm text-gray-500 mt-1">All your contributions at a glance</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="gradient-bg rounded-2xl p-6 text-white">
        <p className="text-white/70 text-sm mb-1">Total Donated</p>
        <p className="text-4xl font-bold">₹{totalDonated.toLocaleString()}</p>
        <p className="text-white/60 text-sm mt-1">{mockDonations.length} donations • Tax exempt under 80G</p>
      </motion.div>

      <div className="space-y-3">
        {mockDonations.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <CheckCircle size={18} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">₹{d.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{d.purpose}</p>
                <p className="text-xs text-gray-400">{new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-400">{d.id}</span>
              <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors">
                <Download size={15} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
