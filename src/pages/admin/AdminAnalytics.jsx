import { motion } from 'framer-motion';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Title, Tooltip, Legend, Filler);

const darkOptions = {
  responsive: true,
  plugins: { legend: { labels: { color: '#9ca3af', padding: 16 } } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } },
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } },
  },
};

export default function AdminAnalytics() {
  const monthlyDonations = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [
      {
        label: 'Donations (₹)',
        data: [35000, 45000, 62000, 58000, 87000, 94000, 125000],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.15)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Target (₹)',
        data: [50000, 50000, 70000, 70000, 90000, 100000, 120000],
        borderColor: '#e5e7eb',
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const volunteerData = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [{
      label: 'New Volunteers',
      data: [28, 45, 78, 92, 115, 130, 187],
      backgroundColor: 'rgba(139,92,246,0.8)',
      borderRadius: 6,
    }, {
      label: 'Active Volunteers',
      data: [120, 165, 243, 335, 450, 580, 767],
      backgroundColor: 'rgba(236,72,153,0.8)',
      borderRadius: 6,
    }],
  };

  const campaignPerformance = {
    labels: ['Education', 'Nutrition', 'Green Earth', 'Medical', 'Women', 'Digital'],
    datasets: [{
      data: [68, 63, 78, 56, 72, 39],
      backgroundColor: ['#6366f1','#8b5cf6','#10b981','#ec4899','#f59e0b','#3b82f6'],
      borderWidth: 0,
    }],
  };

  const impactRadar = {
    labels: ['Education', 'Healthcare', 'Environment', 'Nutrition', 'Women', 'Technology'],
    datasets: [{
      label: 'Impact Score',
      data: [85, 70, 92, 78, 65, 55],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.2)',
    }],
  };

  const kpis = [
    { label: 'Avg. Donation', value: '₹1,840', change: '+12%', up: true },
    { label: 'Donor Retention', value: '67%', change: '+5%', up: true },
    { label: 'Campaign Success', value: '84%', change: '+3%', up: true },
    { label: 'Volunteer Retention', value: '78%', change: '-2%', up: false },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Platform performance & insights</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
            <div className="text-2xl font-bold text-white">{kpi.value}</div>
            <div className="text-sm text-gray-400 mt-0.5">{kpi.label}</div>
            <div className={`text-xs mt-1 ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>{kpi.change} vs last period</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h3 className="font-bold text-white mb-4">Donation Trend vs Target</h3>
          <Line data={monthlyDonations} options={darkOptions} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h3 className="font-bold text-white mb-4">Volunteer Growth</h3>
          <Bar data={volunteerData} options={darkOptions} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h3 className="font-bold text-white mb-4">Campaign Performance (%)</h3>
          <Doughnut data={campaignPerformance} options={{
            responsive: true,
            plugins: { legend: { position: 'right', labels: { color: '#9ca3af', padding: 12, font: { size: 11 } } } },
          }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h3 className="font-bold text-white mb-4">Program Impact Radar</h3>
          <Radar data={impactRadar} options={{
            responsive: true,
            scales: { r: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#6b7280', backdropColor: 'transparent' }, pointLabels: { color: '#9ca3af' } } },
            plugins: { legend: { display: false } },
          }} />
        </motion.div>
      </div>
    </div>
  );
}
