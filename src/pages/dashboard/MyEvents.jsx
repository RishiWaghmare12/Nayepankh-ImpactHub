import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const myEvents = [
  { id: '1', title: 'Annual Charity Run 2025', date: '2025-02-15', time: '07:00 AM', location: 'Lodhi Garden, Delhi', status: 'upcoming', category: 'Sports' },
  { id: '2', title: 'Tree Plantation Drive', date: '2025-03-08', time: '08:00 AM', location: 'Aravalli Biodiversity Park', status: 'upcoming', category: 'Environment' },
  { id: '3', title: 'Education Workshop', date: '2024-12-22', time: '10:00 AM', location: 'India Habitat Centre', status: 'completed', category: 'Workshop' },
];

export default function MyEvents() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Events</h1>
        <p className="text-sm text-gray-500 mt-1">Events you've registered for</p>
      </div>

      {myEvents.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No events registered</h3>
          <p className="text-gray-500 mb-4">Browse and register for upcoming events</p>
          <Link to="/events" className="px-6 py-2.5 gradient-bg text-white rounded-xl text-sm font-medium">View Events</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myEvents.map((event, i) => (
            <motion.div key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${event.status === 'upcoming' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className={`text-xs font-medium capitalize ${event.status === 'upcoming' ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                      {event.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{event.title}</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500"><Calendar size={12} /> {new Date(event.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500"><Clock size={12} /> {event.time}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500"><MapPin size={12} /> {event.location}</div>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full">{event.category}</span>
              </div>
              {event.status === 'completed' && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle size={14} /> Completed • Certificate available
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
