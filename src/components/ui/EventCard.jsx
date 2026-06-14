import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Users } from 'lucide-react';

export default function EventCard({ event, onRegister, delay = 0 }) {
  const spotsLeft = event.maxParticipants - event.registered;
  const isFull = spotsLeft <= 0;
  const percentFull = (event.registered / event.maxParticipants) * 100;

  const categoryColors = {
    Sports: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Workshop: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Environment: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Fundraiser: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  };

  const eventDate = new Date(event.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 card-hover group"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[event.category] || 'bg-gray-100 text-gray-700'}`}>
          {event.category}
        </span>
        {event.fee === 0 && (
          <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-green-500 text-white">FREE</span>
        )}
        <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-900 rounded-xl p-2 text-center min-w-[50px]">
          <div className="text-lg font-bold text-indigo-600 leading-none">{eventDate.getDate()}</div>
          <div className="text-xs text-gray-500">{eventDate.toLocaleString('en', { month: 'short' })}</div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{event.description}</p>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Clock size={12} className="text-indigo-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <MapPin size={12} className="text-indigo-400" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Users size={12} className="text-indigo-400" />
            <span>{event.registered}/{event.maxParticipants} registered {isFull ? '(Full)' : `(${spotsLeft} spots left)`}</span>
          </div>
        </div>

        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all ${isFull ? 'bg-red-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
            style={{ width: `${Math.min(percentFull, 100)}%` }}
          />
        </div>

        <button
          onClick={() => onRegister?.(event)}
          disabled={isFull}
          className={`w-full py-2.5 text-sm font-medium rounded-xl transition-all ${
            isFull
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              : 'gradient-bg text-white hover:opacity-90'
          }`}
        >
          {isFull ? 'Event Full' : 'Register Now'}
        </button>
      </div>
    </motion.div>
  );
}
