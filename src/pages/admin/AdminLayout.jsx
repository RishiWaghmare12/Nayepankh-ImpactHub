import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Target, Calendar, Users, BarChart2, Settings, Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Campaigns', path: '/admin/campaigns', icon: Target },
  { label: 'Events', path: '/admin/events', icon: Calendar },
  { label: 'Volunteers', path: '/admin/volunteers', icon: Users },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart2 },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/');
  };

  // Theme-aware class helpers
  const sidebar  = isDark ? 'bg-gray-900 border-gray-800'  : 'bg-white border-gray-200';
  const mainBg   = isDark ? 'bg-gray-950'                   : 'bg-gray-50';
  const headerBg = isDark ? 'bg-gray-900 border-gray-800'  : 'bg-white border-gray-200';
  const divider  = isDark ? 'border-gray-800'               : 'border-gray-200';
  const textPrimary   = isDark ? 'text-white'      : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400'   : 'text-gray-500';
  const hoverBg       = isDark ? 'hover:bg-white/5 hover:text-white' : 'hover:bg-gray-100 hover:text-gray-900';

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className={`p-5 border-b ${divider}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm">NP</div>
          <div>
            <div className={`font-bold text-sm ${textPrimary}`}>NayePankh</div>
            <div className="text-xs text-indigo-400">Admin Panel</div>
          </div>
        </div>
      </div>

      <div className={`p-4 border-b ${divider}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm">
            {user?.displayName?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className={`text-sm font-medium truncate max-w-[140px] ${textPrimary}`}>{user?.displayName}</div>
            <div className="text-xs text-indigo-400">Administrator</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30'
                  : `${textSecondary} ${hoverBg}`
              }`}
            >
              <item.icon size={18} />
              {item.label}
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className={`p-4 border-t ${divider} space-y-2`}>
        <button onClick={toggleTheme} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full ${textSecondary} ${hoverBg}`}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/20 transition-all w-full">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className={`flex h-screen overflow-hidden ${mainBg}`}>
      {/* Desktop sidebar */}
      <div className={`hidden lg:flex flex-col w-64 border-r flex-shrink-0 ${sidebar}`}>
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/60 lg:hidden" />
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              className={`fixed inset-y-0 left-0 z-50 w-72 border-r lg:hidden flex flex-col ${sidebar}`}>
              <div className={`flex items-center justify-between p-4 border-b ${divider}`}>
                <span className={`font-bold ${textPrimary}`}>Admin Menu</span>
                <button onClick={() => setSidebarOpen(false)} className={`p-1 ${textSecondary}`}>
                  <X size={20} />
                </button>
              </div>
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className={`lg:hidden flex items-center justify-between p-4 border-b ${headerBg}`}>
          <button onClick={() => setSidebarOpen(true)} className={`p-2 rounded-xl ${textSecondary}`}>
            <Menu size={20} />
          </button>
          <span className={`font-bold ${textPrimary}`}>Admin Panel</span>
          <div className="w-8" />
        </header>

        <main className={`flex-1 overflow-y-auto p-6 ${mainBg}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
