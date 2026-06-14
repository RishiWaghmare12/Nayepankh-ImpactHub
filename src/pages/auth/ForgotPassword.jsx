import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success('Reset email sent!');
    } catch (err) {
      setError(err.code === 'auth/user-not-found' ? 'No account found with this email.' : 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-indigo-950 px-4">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 text-center">
          {sent ? (
            <>
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={30} className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Sent!</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Check your inbox for password reset instructions.</p>
              <Link to="/login" className="px-6 py-2.5 gradient-bg text-white rounded-xl text-sm font-medium">Back to Login</Link>
            </>
          ) : (
            <>
              <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail size={22} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Enter your email and we'll send you a reset link.</p>
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl mb-4 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                  placeholder="your@email.com" />
                <button type="submit" disabled={loading}
                  className="w-full py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</> : 'Send Reset Link'}
                </button>
              </form>
              <Link to="/login" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-4 inline-block">Back to Login</Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
