import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, User, Calendar, Heart, Award, FileText, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

const navItems = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Profile', path: '/dashboard/profile', icon: User },
  { label: 'My Events', path: '/dashboard/events', icon: Calendar },
  { label: 'Donations', path: '/dashboard/donations', icon: Heart },
  { label: 'Activities', path: '/dashboard/activities', icon: Award },
  { label: 'Certificates', path: '/dashboard/certificates', icon: FileText },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, userProfile, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/');
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : 'w-64 border-r border-gray-100 dark:border-gray-800'}`}>
      {/* Brand */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm">NP</div>
          <div>
            <div className="font-bold text-gray-900 dark:text-white">NayePankh</div>
            <div className="text-xs text-indigo-500 -mt-0.5">ImpactHub</div>
          </div>
        </Link>
      </div>

      {/* Profile */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold">
            {user?.displayName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">{user?.displayName}</div>
            <div className="text-xs text-gray-500 capitalize">{userProfile?.role || 'volunteer'}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={18} />
              {item.label}
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
        <button onClick={toggleTheme} className="sidebar-item w-full">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={handleLogout} className="sidebar-item w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col bg-white dark:bg-gray-900 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'spring', damping: 20 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 lg:hidden flex flex-col">
              <div className="flex items-center justify-between p-4">
                <span className="font-bold text-gray-900 dark:text-white">Menu</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
            <Menu size={20} />
          </button>
          <span className="font-bold text-gray-900 dark:text-white">Dashboard</span>
          <button onClick={toggleTheme} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
