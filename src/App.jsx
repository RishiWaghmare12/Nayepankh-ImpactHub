import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AIChatbot from './components/AIChatbot';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Campaigns from './pages/Campaigns';
import Events from './pages/Events';
import Volunteer from './pages/Volunteer';
import Donate from './pages/Donate';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// User Dashboard
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Profile from './pages/dashboard/Profile';
import MyEvents from './pages/dashboard/MyEvents';
import DonationHistory from './pages/dashboard/DonationHistory';
import Activities from './pages/dashboard/Activities';
import Certificates from './pages/dashboard/Certificates';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCampaigns from './pages/admin/AdminCampaigns';
import AdminEvents from './pages/admin/AdminEvents';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <AIChatbot />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Toaster
              position="top-right"
              toastOptions={{
                className: 'dark:bg-gray-800 dark:text-white dark:border-gray-700',
                style: { borderRadius: '12px', fontSize: '14px' },
                duration: 3000,
              }}
            />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/campaigns" element={<PublicLayout><Campaigns /></PublicLayout>} />
              <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
              <Route path="/volunteer" element={<PublicLayout><Volunteer /></PublicLayout>} />
              <Route path="/donate" element={<PublicLayout><Donate /></PublicLayout>} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* User Dashboard */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<Overview />} />
                <Route path="profile" element={<Profile />} />
                <Route path="events" element={<MyEvents />} />
                <Route path="donations" element={<DonationHistory />} />
                <Route path="activities" element={<Activities />} />
                <Route path="certificates" element={<Certificates />} />
              </Route>

              {/* Admin Dashboard */}
              <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="campaigns" element={<AdminCampaigns />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="volunteers" element={<AdminVolunteers />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                  <div className="text-center">
                    <div className="text-8xl font-bold gradient-text mb-4">404</div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page not found</h2>
                    <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
                    <a href="/" className="px-6 py-3 gradient-bg text-white rounded-xl font-medium hover:opacity-90 transition-opacity">Go Home</a>
                  </div>
                </div>
              } />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
