import { motion } from 'framer-motion';
import { Save, Bell, Shield, Globe, Database } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure platform settings</p>
      </div>

      {[
        { icon: Bell, title: 'Notifications', fields: [{ label: 'Email Notifications', type: 'toggle' }, { label: 'Donation Alerts', type: 'toggle' }, { label: 'New Volunteer Alerts', type: 'toggle' }] },
        { icon: Globe, title: 'General', fields: [{ label: 'Organization Name', type: 'text', val: 'NayePankh Foundation' }, { label: 'Contact Email', type: 'email', val: 'contact@nayepankh.org' }, { label: 'Website', type: 'url', val: 'https://nayepankh.org' }] },
        { icon: Shield, title: 'Security', fields: [{ label: 'Two-Factor Authentication', type: 'toggle' }, { label: 'Session Timeout (mins)', type: 'number', val: '30' }] },
      ].map((section, si) => (
        <motion.div key={section.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.1 }}
          className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center">
              <section.icon size={18} className="text-white" />
            </div>
            <h3 className="font-bold text-white">{section.title}</h3>
          </div>
          <div className="space-y-4">
            {section.fields.map(field => (
              <div key={field.label} className="flex items-center justify-between">
                <label className="text-sm text-gray-300">{field.label}</label>
                {field.type === 'toggle' ? (
                  <div className="w-10 h-6 bg-indigo-600 rounded-full cursor-pointer relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                ) : (
                  <input type={field.type} defaultValue={field.val}
                    className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-indigo-500 w-48" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <button onClick={() => toast.success('Settings saved!')}
        className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
        <Save size={16} /> Save Settings
      </button>
    </div>
  );
}
