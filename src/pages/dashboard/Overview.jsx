import { motion } from 'framer-motion';
import { Calendar, Heart, Clock, Zap, Trophy, Star, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const sampleActivity = [
  { text: 'Registered for Annual Charity Run', time: '2 days ago', icon: '🏃' },
  { text: 'Donated ₹500 to Education for All', time: '1 week ago', icon: '💰' },
  { text: 'Completed Tree Plantation Event', time: '2 weeks ago', icon: '🌳' },
  { text: 'Received "Contributor" badge', time: '3 weeks ago', icon: '🏅' },
];

export default function Overview() {
  const { user, userProfile } = useAuth();

  const stats = [
    { label: 'Events Joined', value: userProfile?.eventsJoined || 3, icon: Calendar, color: 'from-blue-500 to-indigo-600', suffix: '' },
    { label: 'Total Donated', value: userProfile?.totalDonations || 1500, icon: Heart, color: 'from-pink-500 to-rose-600', prefix: '₹' },
    { label: 'Volunteer Hours', value: userProfile?.volunteerHours || 24, icon: Clock, color: 'from-amber-500 to-orange-600', suffix: 'h' },
    { label: 'Impact Score', value: userProfile?.impactScore || 840, icon: Zap, color: 'from-purple-500 to-violet-600', suffix: 'pts' },
  ];

  const chartData = {
    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [
      {
        label: 'Volunteer Hours',
        data: [4, 8, 6, 12, 10, 24],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
      y: { grid: { color: 'rgba(156,163,175,0.1)' }, ticks: { color: '#9ca3af' } },
    },
  };

  const badges = [
    { icon: '🌱', name: 'First Step', earned: true },
    { icon: '💪', name: 'Contributor', earned: true },
    { icon: '⭐', name: 'Star Volunteer', earned: false },
    { icon: '🏆', name: 'Champion', earned: false },
    { icon: '🦸', name: 'Hero', earned: false },
    { icon: '👑', name: 'Legend', earned: false },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}, {user?.displayName?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Here's your impact summary</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={18} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.prefix}{stat.value?.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Volunteer Hours</h3>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
              <TrendingUp size={12} /> +140% this month
            </span>
          </div>
          <Line data={chartData} options={chartOptions} />
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {sampleActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Achievement Badges</h3>
          <span className="text-xs text-gray-500">{badges.filter(b => b.earned).length}/{badges.length} earned</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <div key={badge.name} className={`text-center p-3 rounded-2xl border transition-all ${
              badge.earned
                ? 'border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-100 dark:border-gray-800 opacity-40 grayscale'
            }`}>
              <div className="text-2xl mb-1">{badge.icon}</div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{badge.name}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
        <h3 className="font-bold mb-1">Ready for more impact?</h3>
        <p className="text-white/70 text-sm mb-4">Join upcoming events or donate to an active campaign</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/events" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-all">
            View Events
          </Link>
          <Link to="/campaigns" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-all">
            Support a Campaign
          </Link>
          <Link to="/donate" className="px-4 py-2 bg-white text-indigo-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
            Donate Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
