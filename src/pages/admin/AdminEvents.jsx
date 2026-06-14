import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Users, Calendar } from 'lucide-react';
import { events as initialEvents } from '../../data/sampleData';
import toast from 'react-hot-toast';

export default function AdminEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', location: '', category: 'Workshop', maxParticipants: '', fee: 0 });

  const handleCreate = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now().toString(),
      ...form,
      maxParticipants: parseInt(form.maxParticipants),
      fee: parseInt(form.fee),
      registered: 0,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format',
    };
    setEvents(prev => [newEvent, ...prev]);
    setShowModal(false);
    setForm({ title: '', description: '', date: '', time: '', location: '', category: 'Workshop', maxParticipants: '', fee: 0 });
    toast.success('Event created!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Events</h1>
          <p className="text-gray-500 text-sm mt-1">{events.length} upcoming events</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> New Event
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {events.map((event, i) => (
          <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
            <div className="relative h-32 overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button className="p-1.5 bg-gray-900/80 text-gray-400 hover:text-indigo-400 rounded-lg transition-colors">
                  <Edit2 size={13} />
                </button>
                <button onClick={() => { setEvents(prev => prev.filter(e => e.id !== event.id)); toast.success('Event removed'); }}
                  className="p-1.5 bg-gray-900/80 text-gray-400 hover:text-red-400 rounded-lg transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
              <span className="absolute bottom-3 left-3 text-xs px-2.5 py-1 bg-indigo-600/80 text-white rounded-full backdrop-blur-sm">{event.category}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2">{event.title}</h3>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex items-center gap-1.5"><Calendar size={11} /> {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} at {event.time}</div>
                <div className="flex items-center gap-1.5"><Users size={11} /> {event.registered}/{event.maxParticipants} registered</div>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  style={{ width: `${Math.round((event.registered / event.maxParticipants) * 100)}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Create Event</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white p-1"><X size={20} /></button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
                  <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                    placeholder="Event title" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Date</label>
                    <input required type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Time</label>
                    <input required value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                      placeholder="07:00 AM" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Location</label>
                  <input required value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                    placeholder="Event location" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Max Participants</label>
                    <input required type="number" value={form.maxParticipants} onChange={e => setForm(p => ({ ...p, maxParticipants: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                      placeholder="200" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Entry Fee (₹)</label>
                    <input type="number" value={form.fee} onChange={e => setForm(p => ({ ...p, fee: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                      placeholder="0 for free" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
                  <textarea required rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-indigo-500 resize-none"
                    placeholder="Event description..." />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-gray-700 rounded-xl text-sm text-gray-400 hover:bg-gray-800 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 gradient-bg text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">Create Event</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
