import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Heart, Calendar } from 'lucide-react';

export default function CampaignCard({ campaign, delay = 0 }) {
  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
  const remaining = campaign.goal - campaign.raised;

  const categoryColors = {
    'Education': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Food & Nutrition': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Environment': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Healthcare': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Women Empowerment': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 card-hover group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[campaign.category] || 'bg-gray-100 text-gray-700'}`}>
          {campaign.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-1">{campaign.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{campaign.description}</p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <span className="font-medium text-indigo-600 dark:text-indigo-400">₹{(campaign.raised / 1000).toFixed(0)}K raised</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: delay + 0.3 }}
              className="h-full gradient-bg rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Goal: ₹{(campaign.goal / 1000).toFixed(0)}K</span>
            <span>₹{(remaining / 1000).toFixed(0)}K more needed</span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Users size={12} /> {campaign.volunteers} volunteers</span>
          <span className="flex items-center gap-1"><Heart size={12} /> {campaign.donors} donors</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(campaign.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
        </div>

        <Link
          to={`/donate?campaign=${campaign.id}`}
          className="w-full block text-center py-2.5 gradient-bg text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
        >
          Donate Now
        </Link>
      </div>
    </motion.div>
  );
}
