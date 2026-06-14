import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, CheckCircle } from 'lucide-react';
import { events } from '../data/sampleData';
import EventCard from '../components/ui/EventCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const categories = ['All', 'Sports', 'Workshop', 'Environment', 'Fundraiser'];

export default function Events() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [registerModal, setRegisterModal] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'All' || e.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleRegister = (event) => {
    if (!user) {
      toast.error('Please login to register for events');
      navigate('/login');
      return;
    }
    setRegisterModal(event);
  };

  const confirmRegistration = () => {
    setRegisteredEvents(prev => [...prev, registerModal.id]);
    toast.success(`Successfully registered for ${registerModal.title}! 🎉`);
    setRegisterModal(null);
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-white mb-4">
            Upcoming Events
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-white/80 text-lg">
            Join our events, make memories, and create impact together.
          </motion.p>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search events by name or location..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-300"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>
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

          {/* Events grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((event, i) => (
              <div key={event.id} className="relative">
                {registeredEvents.includes(event.id) && (
                  <div className="absolute -top-2 -right-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={12} /> Registered
                  </div>
                )}
                <EventCard event={event} onRegister={handleRegister} delay={i * 0.1} />
              </div>
            ))}
          </div>

          {/* Upcoming Calendar preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-16 bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={24} className="text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Event Calendar - February 2025</h2>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-center text-xs font-medium text-gray-400 py-2">{d}</div>
              ))}
              {Array.from({ length: 6 }, (_, i) => i + 1).map(() => null).concat(
                Array.from({ length: 28 }, (_, i) => i + 1)
              ).map((day, i) => {
                const eventDays = [15, 22];
                const hasEvent = day && eventDays.includes(day);
                return (
                  <div key={i}
                    className={`text-center text-sm py-2 rounded-xl transition-all cursor-pointer ${
                      !day ? '' :
                      hasEvent ? 'gradient-bg text-white font-bold shadow-lg' :
                      'text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                    }`}>
                    {day || ''}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-4">Highlighted dates have scheduled events</p>
          </motion.div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {registerModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Register for Event</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                You're about to register for <span className="font-semibold text-indigo-600">{registerModal.title}</span>
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 mb-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>📅 {registerModal.date}</div>
                <div>⏰ {registerModal.time}</div>
                <div>📍 {registerModal.location}</div>
                {registerModal.fee > 0 && <div>💰 Entry fee: ₹{registerModal.fee}</div>}
                {registerModal.fee === 0 && <div>✅ Free entry</div>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setRegisterModal(null)}
                  className="flex-1 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmRegistration}
                  className="flex-1 py-3 gradient-bg text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                  Confirm Registration
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
