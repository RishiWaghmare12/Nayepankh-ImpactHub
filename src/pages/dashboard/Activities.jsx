import { motion } from 'framer-motion';
import { Clock, Award, Star, TrendingUp } from 'lucide-react';
import { volunteers } from '../../data/sampleData';

const activities = [
  { id: '1', title: 'Tree Plantation Drive', hours: 6, date: '2024-11-08', category: 'Environment', points: 120 },
  { id: '2', title: 'Food Distribution', hours: 4, date: '2024-12-15', category: 'Nutrition', points: 80 },
  { id: '3', title: 'Teaching Assistant', hours: 8, date: '2025-01-05', category: 'Education', points: 160 },
  { id: '4', title: 'Medical Camp Support', hours: 6, date: '2025-01-18', category: 'Healthcare', points: 120 },
];

export default function Activities() {
  const totalHours = activities.reduce((sum, a) => sum + a.hours, 0);
  const totalPoints = activities.reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Volunteer Activities</h1>
        <p className="text-sm text-gray-500 mt-1">Track your contributions and hours</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Hours', value: totalHours + 'h', icon: Clock, color: 'from-blue-500 to-indigo-600' },
          { label: 'Activities', value: activities.length, icon: Award, color: 'from-purple-500 to-pink-600' },
          { label: 'Impact Points', value: totalPoints, icon: Star, color: 'from-amber-500 to-orange-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-3`}>
              <s.icon size={18} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        {activities.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white">
                <Award size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{a.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={10} /> {a.hours}h</span>
                  <span className="text-xs px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full">{a.category}</span>
                  <span className="text-xs text-gray-400">{new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">+{a.points}pts</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leaderboard preview */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><TrendingUp size={18} className="text-indigo-500" /> Leaderboard</h3>
          <span className="text-xs text-gray-400">Your rank: #24</span>
        </div>
        <div className="space-y-3">
          {volunteers.slice(0, 5).map((v, i) => (
            <div key={v.id} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-orange-600' : 'bg-indigo-200 text-indigo-700'
              }`}>{i + 1}</div>
              <img src={v.avatar} alt={v.name} className="w-8 h-8 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{v.name}</div>
                <div className="text-xs text-gray-500">{v.hours}h • {v.events} events</div>
              </div>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{v.points.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
