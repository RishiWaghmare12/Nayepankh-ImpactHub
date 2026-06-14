import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, userProfile, fetchUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    phone: userProfile?.phone || '',
    location: userProfile?.location || '',
    bio: userProfile?.bio || '',
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: form.displayName,
        phone: form.phone,
        location: form.location,
        bio: form.bio,
      });
      await fetchUserProfile(user.uid);
      setEditing(false);
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your personal information</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-white text-3xl font-bold">
              {user?.displayName?.[0]?.toUpperCase() || 'U'}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
              <Camera size={13} className="text-gray-500" />
            </button>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">{user?.displayName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-full capitalize">
              {userProfile?.role || 'volunteer'}
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {[
            { label: 'Full Name', key: 'displayName', icon: User, type: 'text', placeholder: 'Your full name' },
            { label: 'Phone', key: 'phone', icon: Phone, type: 'tel', placeholder: '+91 98765 43210' },
            { label: 'Location', key: 'location', icon: MapPin, type: 'text', placeholder: 'New Delhi, India' },
          ].map(field => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{field.label}</label>
              <div className="relative">
                <field.icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                  disabled={!editing}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder={field.placeholder}
                />
              </div>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
            <div className="relative">
              <FileText size={15} className="absolute left-3.5 top-3 text-gray-400" />
              <textarea
                rows={3}
                value={form.bio}
                onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                disabled={!editing}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200 disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                placeholder="Write a brief bio..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {editing ? (
              <>
                <button onClick={() => setEditing(false)} className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 gradient-bg text-white text-sm font-medium rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity">
                  <Save size={15} /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="px-4 py-2 gradient-bg text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Email info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Account Info</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail size={15} className="text-gray-400" /> Email
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <User size={15} className="text-gray-400" /> Account Type
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{userProfile?.role || 'volunteer'}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">Member Since</div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'N/A'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
