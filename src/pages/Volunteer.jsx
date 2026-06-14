import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, Clock, Users, Award, BookOpen, Heart, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { volunteers } from '../data/sampleData';

const interests = [
  { id: 'education', label: 'Education', icon: BookOpen },
  { id: 'healthcare', label: 'Healthcare', icon: Heart },
  { id: 'environment', label: 'Environment', icon: Leaf },
  { id: 'nutrition', label: 'Food & Nutrition', icon: '🍱' },
  { id: 'women', label: 'Women Empowerment', icon: Users },
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'arts', label: 'Arts & Culture', icon: '🎨' },
  { id: 'sports', label: 'Sports', icon: '🏃' },
];

export default function Volunteer() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    age: '',
    education: '',
    experience: '',
    availability: '',
    selectedInterests: [],
    message: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleInterest = (id) => {
    setFormData(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(id)
        ? prev.selectedInterests.filter(i => i !== id)
        : [...prev.selectedInterests, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to apply as a volunteer');
      navigate('/login');
      return;
    }
    if (formData.selectedInterests.length === 0) {
      toast.error('Please select at least one area of interest');
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success('Application submitted successfully! 🎉');
  };

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/30">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Application Submitted!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Thank you for your interest in volunteering with NayePankh. Our team will review your application and get back to you within 2-3 business days.
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 text-left mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">What happens next?</h3>
            <div className="space-y-2">
              {[
                'Application review by our team',
                'Background verification',
                'Orientation call',
                'Onboarding & training',
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">{i + 1}</div>
                  {step}
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => navigate('/')} className="px-8 py-3 gradient-bg text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-white mb-4">
            Volunteer With Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto">
            Be the change you wish to see. Join our growing community of changemakers.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: '1,240+', label: 'Active Volunteers', icon: Users },
              { value: '342', label: 'Events Organized', icon: Award },
              { value: '45,000+', label: 'Hours Contributed', icon: Clock },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Application Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Volunteer Application</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                  <input required value={formData.fullName} onChange={e => setFormData(p => ({ ...p, fullName: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                    placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                    placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone *</label>
                  <input required value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                    placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">City *</label>
                  <input required value={formData.city} onChange={e => setFormData(p => ({ ...p, city: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                    placeholder="New Delhi" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Age</label>
                  <input type="number" value={formData.age} onChange={e => setFormData(p => ({ ...p, age: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                    placeholder="25" min="16" max="80" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Availability</label>
                  <select value={formData.availability} onChange={e => setFormData(p => ({ ...p, availability: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200">
                    <option value="">Select availability</option>
                    <option value="weekends">Weekends only</option>
                    <option value="weekdays">Weekdays only</option>
                    <option value="flexible">Flexible</option>
                    <option value="fulltime">Full-time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Education Background</label>
                <input value={formData.education} onChange={e => setFormData(p => ({ ...p, education: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                  placeholder="B.Tech Computer Science, Delhi University" />
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Areas of Interest *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {interests.map(interest => (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleInterest(interest.id)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        formData.selectedInterests.includes(interest.id)
                          ? 'gradient-bg text-white border-transparent shadow-sm'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300'
                      }`}
                    >
                      {interest.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Upload Resume (Optional)</label>
                <label className="flex items-center justify-center gap-3 w-full py-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-indigo-400 transition-colors bg-gray-50 dark:bg-gray-800">
                  <Upload size={20} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{resumeFile ? resumeFile.name : 'Click to upload PDF/DOC (max 5MB)'}</span>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={e => setResumeFile(e.target.files[0])} />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Why do you want to volunteer?</label>
                <textarea rows={4} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200 resize-none"
                  placeholder="Tell us about your motivation and what you hope to contribute..." />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                ) : 'Submit Application'}
              </button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Award size={18} className="text-amber-500" /> Top Volunteers
              </h3>
              <div className="space-y-3">
                {volunteers.slice(0, 5).map((v, i) => (
                  <div key={v.id} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                      i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>{i + 1}</div>
                    <img src={v.avatar} alt={v.name} className="w-8 h-8 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{v.name}</div>
                      <div className="text-xs text-gray-500">{v.hours}h • {v.events} events</div>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{v.points}pts</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl p-6 border border-indigo-100 dark:border-indigo-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Volunteer Benefits</h3>
              <ul className="space-y-2.5">
                {[
                  '📜 Official certificates',
                  '🏆 Achievement badges',
                  '🌟 Recognition on leaderboard',
                  '💼 LinkedIn recommendations',
                  '🎓 Skill development',
                  '🤝 Network with changemakers',
                ].map(benefit => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
