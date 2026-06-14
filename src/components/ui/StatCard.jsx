import { motion } from 'framer-motion';
import { useCounter } from '../../hooks/useCounter';

export default function StatCard({ icon, label, value, suffix = '', color = 'from-indigo-500 to-purple-600', delay = 0 }) {
  const { count, ref } = useCounter(value, 2000);

  const formatNumber = (n) => {
    if (n >= 100000) return (n / 100000).toFixed(1) + 'L';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toLocaleString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 card-hover overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-[50px]`} />
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} text-white mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {formatNumber(count)}{suffix}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </motion.div>
  );
}
