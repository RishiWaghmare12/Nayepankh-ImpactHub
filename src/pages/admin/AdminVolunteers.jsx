import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Check, X, Clock, Award } from 'lucide-react';
import { volunteers } from '../../data/sampleData';
import toast from 'react-hot-toast';

const pending = [
  { id: 'p1', name: 'Arjun Nair', email: 'arjun@email.com', city: 'Bangalore', interests: ['Education', 'Tech'], submittedAt: '2025-01-14' },
  { id: 'p2', name: 'Pooja Yadav', email: 'pooja@email.com', city: 'Mumbai', interests: ['Healthcare', 'Women'], submittedAt: '2025-01-13' },
  { id: 'p3', name: 'Siddharth Rao', email: 'sid@email.com', city: 'Hyderabad', interests: ['Environment'], submittedAt: '2025-01-12' },
];

export default function AdminVolunteers() {
  const [tab, setTab] = useState('approved');
  const [search, setSearch] = useState('');
  const [pendingList, setPendingList] = useState(pending);

  const approve = (id) => {
    setPendingList(prev => prev.filter(p => p.id !== id));
    toast.success('Volunteer approved!');
  };

  const reject = (id) => {
    setPendingList(prev => prev.filter(p => p.id !== id));
    toast.error('Application rejected');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Volunteers</h1>
        <p className="text-gray-500 text-sm mt-1">Manage volunteer applications and active members</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['approved', 'pending'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              tab === t ? 'gradient-bg text-white' : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-600'
            }`}>
            {t} {t === 'pending' && pendingList.length > 0 && (
              <span className="ml-1.5 w-5 h-5 inline-flex items-center justify-center bg-red-500 text-white text-xs rounded-full">{pendingList.length}</span>
            )}
          </button>
        ))}
      </div>

      {tab === 'approved' ? (
        <>
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              placeholder="Search volunteers..." />
          </div>
          <div className="space-y-3">
            {volunteers.filter(v => v.name.toLowerCase().includes(search.toLowerCase())).map((v, i) => (
              <motion.div key={v.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-gray-900 rounded-2xl p-5 border border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={v.avatar} alt={v.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-semibold text-white">{v.name}</h3>
                    <p className="text-sm text-gray-400">{v.role}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock size={10} /> {v.hours}h</span>
                      <span>{v.events} events</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-bold text-indigo-400">{v.points.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">pts</div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    v.badge === 'Champion' ? 'bg-amber-900/30 text-amber-400' :
                    v.badge === 'Hero' ? 'bg-purple-900/30 text-purple-400' :
                    'bg-gray-800 text-gray-400'
                  }`}>
                    <Award size={10} className="inline mr-1" />{v.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-3">
          {pendingList.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-gray-400">No pending applications</p>
            </div>
          ) : pendingList.map((app, i) => (
            <motion.div key={app.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{app.name}</h3>
                  <p className="text-sm text-gray-400">{app.email} • {app.city}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {app.interests.map(i => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-indigo-900/30 text-indigo-400 rounded-full">{i}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Applied: {new Date(app.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => approve(app.id)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-green-900/30 text-green-400 border border-green-800 rounded-xl text-xs font-medium hover:bg-green-900/50 transition-colors">
                    <Check size={13} /> Approve
                  </button>
                  <button onClick={() => reject(app.id)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-red-900/30 text-red-400 border border-red-800 rounded-xl text-xs font-medium hover:bg-red-900/50 transition-colors">
                    <X size={13} /> Reject
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
