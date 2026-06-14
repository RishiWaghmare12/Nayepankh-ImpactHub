import { motion } from 'framer-motion';
import { Download, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const mockCertificates = [
  { id: '1', title: 'Volunteer Completion Certificate', event: 'Annual Charity Run 2025', date: '2025-01-20', type: 'Participation' },
  { id: '2', title: 'Education Workshop Completion', event: 'Education Workshop Summit', date: '2024-12-15', type: 'Workshop' },
  { id: '3', title: 'Tree Plantation Drive', event: 'Green Earth Initiative', date: '2024-11-08', type: 'Service' },
];

export default function Certificates() {
  const { user } = useAuth();

  const downloadCertificate = (cert) => {
    toast.success(`Downloading certificate for ${cert.event}...`);
    // In production, this would generate a PDF
    const printContent = `
      NayePankh Foundation
      Certificate of ${cert.type}
      This is to certify that ${user?.displayName}
      has successfully participated in ${cert.event}
      Date: ${new Date(cert.date).toLocaleDateString('en-IN')}
    `;
    const blob = new Blob([printContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NayePankh_Certificate_${cert.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates</h1>
        <p className="text-sm text-gray-500 mt-1">Download your earned certificates</p>
      </div>

      <div className="grid gap-4">
        {mockCertificates.map((cert, i) => (
          <motion.div key={cert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                  <Award size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{cert.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{cert.event}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full">{cert.type}</span>
                    <span className="text-xs text-gray-400">{new Date(cert.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => downloadCertificate(cert)}
                className="flex items-center gap-2 px-4 py-2 gradient-bg text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0">
                <Download size={14} /> Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {mockCertificates.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🏅</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No certificates yet</h3>
          <p className="text-gray-500">Participate in events to earn certificates</p>
        </div>
      )}
    </div>
  );
}
