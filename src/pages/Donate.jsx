import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Download, Share2 } from 'lucide-react';
import { donationTiers } from '../data/sampleData';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const purposes = [
  'Education Support',
  'Food & Nutrition',
  'Healthcare',
  'Women Empowerment',
  'Environmental Drive',
  'General Fund',
];

export default function Donate() {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', purpose: '', message: '', anonymous: false });
  const [step, setStep] = useState(1); // 1: details, 2: payment, 3: success
  const [loading, setLoading] = useState(false);
  const [receiptId, setReceiptId] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const finalAmount = customAmount ? parseInt(customAmount) : parseInt(amount);

  const getImpactMessage = (amt) => {
    if (!amt) return null;
    if (amt >= 10000) return { icon: '🏆', text: 'Full scholarship for a student for 1 year' };
    if (amt >= 5000) return { icon: '⭐', text: 'Sponsor a child\'s education for 6 months' };
    if (amt >= 2500) return { icon: '🏥', text: 'Medical checkup for 5 children' };
    if (amt >= 1000) return { icon: '🎓', text: '1 month of full education support' };
    if (amt >= 500) return { icon: '🍱', text: 'Nutritious food kit for a family' };
    if (amt >= 100) return { icon: '📚', text: 'Books and stationery for 1 student' };
    return { icon: '💖', text: 'Every rupee counts and makes a difference!' };
  };

  const impact = getImpactMessage(finalAmount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 10) {
      toast.error('Minimum donation amount is ₹10');
      return;
    }
    if (!user) {
      toast.error('Please login to donate');
      navigate('/login');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    const id = 'NP' + Date.now().toString().slice(-8).toUpperCase();
    setReceiptId(id);
    setLoading(false);
    setStep(3);
    toast.success('Donation successful! Thank you 🙏');
  };

  if (step === 3) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-gray-800 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Donation Successful! 🎉</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Thank you for your generous donation. You're making a real difference!
          </p>

          {/* Receipt */}
          <div id="receipt" className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-left mb-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-gray-900 dark:text-white">NayePankh Foundation</div>
              <div className="text-xs text-gray-500">Receipt</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Receipt ID:</span> <span className="font-mono font-semibold text-gray-900 dark:text-white">{receiptId}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Amount:</span> <span className="font-bold text-green-600">₹{finalAmount?.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Purpose:</span> <span className="text-gray-900 dark:text-white">{form.purpose || 'General Fund'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Donor:</span> <span className="text-gray-900 dark:text-white">{form.anonymous ? 'Anonymous' : form.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date:</span> <span className="text-gray-900 dark:text-white">{new Date().toLocaleDateString('en-IN')}</span></div>
            </div>
            {impact && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-500 mb-1">Your Impact</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{impact.icon} {impact.text}</div>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-400">This donation is eligible for tax exemption under Section 80G of the Income Tax Act.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Download size={15} /> Download
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 gradient-bg text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              <Share2 size={15} /> Share
            </button>
          </div>
          <button onClick={() => navigate('/')} className="w-full mt-3 py-3 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
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
            Make a Donation
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-white/80 text-lg">Your generosity transforms lives. Every rupee counts.</motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Donation Details</h2>

              {/* Quick amount selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Amount</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                  {[100, 500, 1000, 2500, 5000, 10000].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setAmount(amt.toString()); setCustomAmount(''); }}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                        amount === amt.toString() && !customAmount
                          ? 'gradient-bg text-white border-transparent shadow-md'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-400'
                      }`}
                    >
                      ₹{amt >= 1000 ? (amt / 1000) + 'K' : amt}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); setAmount(''); }}
                    placeholder="Or enter custom amount"
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                    min="10"
                  />
                </div>
              </div>

              {/* Impact message */}
              <AnimatePresence>
                {impact && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                    <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      {impact.icon} With ₹{finalAmount?.toLocaleString()}, you can: <span className="font-bold">{impact.text}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                    <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                      placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                    <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                      placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Purpose</label>
                    <select value={form.purpose} onChange={e => setForm(p => ({ ...p, purpose: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200">
                      <option value="">Select purpose</option>
                      {purposes.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message (Optional)</label>
                  <textarea rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200 resize-none"
                    placeholder="Leave a message of hope..." />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.anonymous} onChange={e => setForm(p => ({ ...p, anonymous: e.target.checked }))}
                    className="w-4 h-4 rounded accent-indigo-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Donate anonymously</span>
                </label>

                <button type="submit" disabled={loading || !finalAmount}
                  className="w-full py-4 gradient-bg text-white font-bold rounded-xl text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                  ) : (
                    <>Donate {finalAmount ? `₹${finalAmount.toLocaleString()}` : 'Now'} →</>
                  )}
                </button>
                <p className="text-xs text-center text-gray-400">🔒 Secure payment | 80G tax benefit | All amounts in INR</p>
              </form>
            </motion.div>
          </div>

          {/* Impact tiers sidebar */}
          <div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 sticky top-20">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Your Impact</h3>
              <div className="space-y-3">
                {donationTiers.map(tier => (
                  <div
                    key={tier.amount}
                    onClick={() => { setAmount(tier.amount.toString()); setCustomAmount(''); }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      (amount === tier.amount.toString() && !customAmount) || finalAmount === tier.amount
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-100 dark:border-gray-800 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tier.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">₹{tier.amount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{tier.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800">
                <p className="text-xs text-green-700 dark:text-green-400 font-medium">✅ Tax Exemption under Section 80G</p>
                <p className="text-xs text-green-600 dark:text-green-500 mt-1">All donations are eligible for tax deduction</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
