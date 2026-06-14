import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'New Campaign Launched', message: 'Digital Literacy Drive has been launched. Join now!', read: false, time: '2 min ago', type: 'info' },
    { id: '2', title: 'Event Reminder', message: 'Annual Charity Run is tomorrow at 7 AM', read: false, time: '1 hr ago', type: 'reminder' },
    { id: '3', title: 'Donation Successful', message: 'Your donation of ₹500 was received. Thank you!', read: true, time: '2 hrs ago', type: 'success' },
  ]);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notification) => {
    setNotifications(prev => [{ id: Date.now().toString(), ...notification, read: false, time: 'Just now' }, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead, markAllAsRead, addNotification, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};
