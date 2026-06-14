import { motion } from 'framer-motion';
import { Heart, Eye, Target, Shield, Users, Award, BookOpen, Leaf } from 'lucide-react';

const timeline = [
  { year: '2018', title: 'Foundation Established', desc: 'NayePankh was founded by a group of passionate young professionals committed to social change in Delhi.', color: 'bg-indigo-500' },
  { year: '2019', title: 'First 1000 Students', desc: 'Reached our first milestone — 1,000 students enrolled in our education support program across 5 schools.', color: 'bg-purple-500' },
  { year: '2020', title: 'COVID Relief Drive', desc: 'Distributed 50,000+ food packets during the pandemic. Expanded to 8 cities across India.', color: 'bg-pink-500' },
  { year: '2021', title: 'Women Empowerment Launch', desc: 'Launched our flagship women empowerment program, training 500+ women in vocational skills.', color: 'bg-rose-500' },
  { year: '2022', title: 'Green Initiative', desc: 'Planted 10,000 trees and launched environmental awareness programs in 15 schools.', color: 'bg-green-500' },
  { year: '2023', title: 'Digital India Drive', desc: 'Opened 12 digital literacy centers providing computer education to 2000+ youth.', color: 'bg-blue-500' },
  { year: '2024', title: 'National Recognition', desc: 'Received the "Best NGO of the Year" award from the Ministry of Social Justice and Empowerment.', color: 'bg-amber-500' },
  { year: '2025', title: 'ImpactHub Launch', desc: 'Launched NayePankh ImpactHub — our digital platform to connect volunteers, donors, and communities.', color: 'bg-indigo-500' },
];

const coreValues = [
  { icon: Heart, title: 'Compassion', desc: 'We approach every individual with empathy, dignity, and unconditional care.', color: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
  { icon: Shield, title: 'Integrity', desc: 'Complete transparency in operations, finances, and impact reporting.', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { icon: Users, title: 'Community', desc: 'Building strong, self-reliant communities through collective action.', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
  { icon: Award, title: 'Excellence', desc: 'Delivering the highest quality programs and measurable outcomes.', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  { icon: Leaf, title: 'Sustainability', desc: 'Creating lasting change that outlives our interventions.', color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  { icon: BookOpen, title: 'Education', desc: 'Knowledge as the cornerstone of all empowerment.', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' },
];

const team = [
  { name: 'Dr. Ananya Kapoor', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format' },
  { name: 'Rohan Malhotra', role: 'Co-Founder & COO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format' },
  { name: 'Sunita Joshi', role: 'Director - Programs', img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=200&auto=format' },
  { name: 'Amit Chaudhary', role: 'Head - Technology', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format' },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-white/20 border border-white/30 rounded-full text-white text-sm font-medium mb-6">
            About NayePankh Foundation
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl font-bold text-white mb-6">
            Our Story of Hope
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/80 text-lg leading-relaxed">
            Since 2018, we have been on a mission to give new wings to those who deserve to fly. NayePankh — meaning "New Wings" — was born from a simple belief: every child deserves an equal chance at life.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-800">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Eye size={26} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                A world where every individual, regardless of background, has equal access to education, nutrition, healthcare, and opportunities for self-actualization. We envision an India where no child goes to bed hungry or uneducated.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-3xl p-8 border border-pink-100 dark:border-pink-800">
              <div className="w-14 h-14 bg-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Target size={26} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To empower underprivileged communities through sustainable programs in education, nutrition, healthcare, and skill development — creating dignified, self-sufficient lives while fostering community ownership and environmental stewardship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">Our Journey</span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Timeline of Impact</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 pl-4">
                  <div className={`relative flex-shrink-0 w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg mt-1`}>
                    <div className="absolute -inset-1 rounded-full border-2 border-current opacity-30" />
                    {i + 1}
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 flex-1 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded-full">{item.year}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white mt-2 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">Our Principles</span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Core Values</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 card-hover">
                <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                  <v.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-4">Leadership</span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Meet the Team</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-800 card-hover">
                <img src={member.img} alt={member.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
