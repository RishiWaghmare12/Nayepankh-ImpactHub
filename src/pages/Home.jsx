import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Heart, Users, Award, TreePine, BookOpen, Utensils, Shield, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { campaigns, testimonials, impactStats, galleryImages } from '../data/sampleData';
import CampaignCard from '../components/ui/CampaignCard';
import StatCard from '../components/ui/StatCard';
import { useCounter } from '../hooks/useCounter';

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <motion.div animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div style={{ y }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Empowering 12,847+ Lives Across India
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Give Wings to{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dreams
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
              NayePankh Foundation empowers underprivileged communities through education, nutrition, and sustainable development.
              Join us in creating a better tomorrow.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4">
              <Link to="/donate"
                className="flex items-center gap-2 px-6 py-3.5 gradient-bg text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-xl shadow-indigo-500/30">
                Donate Now <ArrowRight size={18} />
              </Link>
              <Link to="/volunteer"
                className="flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                <Play size={16} className="fill-white" /> Become a Volunteer
              </Link>
            </motion.div>

            {/* Mini stats */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              {[
                { value: '12K+', label: 'Lives Impacted' },
                { value: '1.2K+', label: 'Volunteers' },
                { value: '87', label: 'Campaigns Done' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 gradient-bg rounded-3xl blur-2xl opacity-30" />
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format"
                alt="NayePankh Impact"
                className="relative rounded-3xl w-full h-[500px] object-cover border border-white/10"
              />
              {/* Floating cards */}
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -left-6 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Heart size={18} className="text-green-600 fill-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Total Donations</div>
                    <div className="font-bold text-gray-900">₹24.5L+</div>
                  </div>
                </div>
              </motion.div>
              <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Users size={18} className="text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Active Volunteers</div>
                    <div className="font-bold text-gray-900">1,240+</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs">Scroll to explore</span>
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">Our Impact</span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Numbers That Matter</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Every number represents a life touched, a dream fulfilled, and hope rekindled.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<BookOpen size={22} />} label="Students Helped" value={impactStats.studentsHelped} color="from-blue-500 to-indigo-600" delay={0} />
          <StatCard icon={<Utensils size={22} />} label="Meals Distributed" value={impactStats.mealsDistributed} color="from-green-500 to-emerald-600" delay={0.1} />
          <StatCard icon={<Users size={22} />} label="Active Volunteers" value={impactStats.volunteersActive} color="from-purple-500 to-pink-600" delay={0.2} />
          <StatCard icon={<TreePine size={22} />} label="Trees Planted" value={impactStats.treesPlanted} color="from-emerald-500 to-teal-600" delay={0.3} />
        </div>
      </div>
    </section>
  );
}

function ImpactTracker() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm font-medium mb-4">Live Tracker</span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Impact Tracker</h2>
          <p className="text-gray-500 dark:text-gray-400">Real-time data on our collective impact</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { emoji: '🍽️', label: 'Meals Distributed', value: impactStats.mealsDistributed, color: 'from-orange-400 to-red-500' },
            { emoji: '🎓', label: 'Students Helped', value: impactStats.studentsHelped, color: 'from-blue-400 to-indigo-500' },
            { emoji: '👕', label: 'Clothes Donated', value: impactStats.clothesDonated, color: 'from-purple-400 to-pink-500' },
            { emoji: '🌳', label: 'Trees Planted', value: impactStats.treesPlanted, color: 'from-green-400 to-emerald-500' },
          ].map((item, i) => (
            <motion.div key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl p-6 text-white"
              style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`} />
              <div className="relative text-center">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <div className="text-3xl font-bold mb-1">
                  {item.value >= 1000 ? (item.value / 1000).toFixed(1) + 'K+' : item.value + '+'}
                </div>
                <div className="text-white/80 text-sm">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">Active Campaigns</span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Support a Cause</h2>
          </div>
          <Link to="/campaigns" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:gap-3 transition-all">
            View All <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.slice(0, 3).map((campaign, i) => (
            <CampaignCard key={campaign.id} campaign={campaign} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium mb-4">Testimonials</span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Stories of Change</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const galleryFallbacks = [
  'https://picsum.photos/seed/ngo1/400/300',
  'https://picsum.photos/seed/ngo2/400/300',
  'https://picsum.photos/seed/ngo3/400/300',
  'https://picsum.photos/seed/ngo4/400/300',
  'https://picsum.photos/seed/ngo5/400/300',
  'https://picsum.photos/seed/ngo6/400/300',
  'https://picsum.photos/seed/ngo7/400/300',
  'https://picsum.photos/seed/ngo8/400/300',
];

function GallerySection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">Gallery</span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Impact in Pictures</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 ${i === 0 || i === 5 ? 'md:row-span-2' : ''}`}
              style={{ minHeight: i === 0 || i === 5 ? '320px' : '155px' }}>
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = galleryFallbacks[i]; }}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                style={{ minHeight: 'inherit' }}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of changemakers who are transforming lives every day. Your contribution, big or small, creates ripples of change.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/donate" className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-gray-50 transition-colors shadow-xl">
              Donate Now
            </Link>
            <Link to="/volunteer" className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
              Volunteer With Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ImpactSection />
      <CampaignsSection />
      <ImpactTracker />
      <TestimonialsSection />
      <GallerySection />
      <CTASection />
    </div>
  );
}
