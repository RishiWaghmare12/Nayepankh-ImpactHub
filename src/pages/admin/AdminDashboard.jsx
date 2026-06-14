import { motion } from 'framer-motion';
import { Users, Heart, Target, Calendar, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { campaigns, events, impactStats } from '../../data/sampleData';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

export default function AdminDashboard() {
  const { isDark } = useTheme();
  const totalRaised = campaigns.reduce((s, c) => s + c.raised, 0);

  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
  const tickColor = isDark ? '#6b7280' : '#9ca3af';
  const legendColor = isDark ? '#9ca3af' : '#6b7280';

  const chartDefaults = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: tickColor } },
      y: { grid: { color: gridColor }, ticks: { color: tickColor } },
    },
  };

  const donationData = {
    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [{
      label: 'Donations (₹)',
      data: [45000, 62000, 58000, 87000, 94000, 125000],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.15)',
      fill: true,
      tension: 0.4,
    }],
  };

  const volunteerGrowthData = {
    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [{
      label: 'New Volunteers',
      data: [45, 78, 92, 115, 130, 187],
      backgroundColor: '#8b5cf6',
      borderRadius: 6,
    }],
  };

  const campaignData = {
    labels: campaigns.map(c => c.title.split(' ').slice(0, 2).join(' ')),
    datasets: [{
      data: campaigns.map(c => Math.round((c.raised / c.goal) * 100)),
      backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'],
    }],
  };

  const stats = [
    { label: 'Total Donations', value: '₹' + (totalRaised / 100000).toFixed(1) + 'L', change: '+23%', icon: Heart, color: 'from-pink-600 to-rose-700' },
    { label: 'Active Volunteers', value: impactStats.volunteersActive.toLocaleString(), change: '+187', icon: Users, color: 'from-indigo-600 to-violet-700' },
    { label: 'Active Campaigns', value: campaigns.length, change: '+2', icon: Target, color: 'from-purple-600 to-pink-700' },
    { label: 'Events This Month', value: events.length, change: '+1', icon: Calendar, color: 'from-amber-500 to-orange-600' },
  ];

  const card = 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800';

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Overview of NayePankh platform</p>
        </div>
        <div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-5 bg-gradient-to-br ${s.color} text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-[50px]" />
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <s.icon size={18} />
            </div>
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-white/70 text-sm mt-0.5">{s.label}</div>
            <div className="flex items-center gap-1 text-xs text-green-300 mt-1">
              <TrendingUp size={11} /> {s.change} this month
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className={`lg:col-span-2 rounded-2xl p-6 ${card}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Donation Trend</h3>
            <span className="text-xs text-green-400 flex items-center gap-1"><ArrowUpRight size={12} /> +32% vs last period</span>
          </div>
          <Line data={donationData} options={chartDefaults} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className={`rounded-2xl p-6 ${card}`}>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Campaign Performance</h3>
          <Doughnut
            data={campaignData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom', labels: { color: legendColor, padding: 12, font: { size: 11 } } },
                tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}%` } },
              },
            }}
          />
        </motion.div>
      </div>

      {/* Volunteer Growth */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className={`rounded-2xl p-6 ${card}`}>
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Volunteer Growth</h3>
        <Bar data={volunteerGrowthData} options={chartDefaults} />
      </motion.div>

      {/* Quick stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Students Helped', value: impactStats.studentsHelped.toLocaleString(), emoji: '🎓' },
          { label: 'Meals Distributed', value: impactStats.mealsDistributed.toLocaleString(), emoji: '🍱' },
          { label: 'Trees Planted', value: impactStats.treesPlanted.toLocaleString(), emoji: '🌳' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
            className={`rounded-2xl p-5 text-center ${card}`}>
            <div className="text-3xl mb-2">{stat.emoji}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="text-sm text-gray-400 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
