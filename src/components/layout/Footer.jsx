import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const socialLinks = [
  { label: 'FB', href: '#', color: 'hover:bg-blue-600' },
  { label: 'TW', href: '#', color: 'hover:bg-sky-500' },
  { label: 'IG', href: '#', color: 'hover:bg-pink-600' },
  { label: 'LI', href: '#', color: 'hover:bg-blue-700' },
  { label: 'YT', href: '#', color: 'hover:bg-red-600' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold">NP</div>
              <div>
                <span className="font-bold text-white text-lg">NayePankh</span>
                <span className="text-xs block text-indigo-400 -mt-0.5">Foundation</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Empowering underprivileged communities through education, nutrition, and sustainable development across India.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  className={`w-8 h-8 rounded-lg bg-gray-800 ${color} flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 text-xs font-bold`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Campaigns', path: '/campaigns' },
                { label: 'Events', path: '/events' },
                { label: 'Volunteer', path: '/volunteer' },
                { label: 'Donate Now', path: '/donate' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-indigo-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Programs</h3>
            <ul className="space-y-2.5">
              {[
                'Education Support',
                'Nutrition Program',
                'Healthcare Initiative',
                'Women Empowerment',
                'Environmental Drive',
                'Digital Literacy',
              ].map(item => (
                <li key={item}>
                  <span className="text-sm hover:text-indigo-400 transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={15} className="mt-0.5 text-indigo-400 flex-shrink-0" />
                <span>123 Helping Hands Street, New Delhi, India - 110001</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={15} className="text-indigo-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={15} className="text-indigo-400 flex-shrink-0" />
                <span>contact@nayepankh.org</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-medium text-sm mb-3">Newsletter</h4>
              <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="px-4 py-2 gradient-bg text-white text-sm rounded-lg hover:opacity-90 transition-opacity">
                  →
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center sm:text-left">
            © 2025 NayePankh Foundation. Made with{' '}
            <Heart size={13} className="inline text-red-500 fill-red-500 mx-0.5" />
            for a better India.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Use</Link>
            <Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
