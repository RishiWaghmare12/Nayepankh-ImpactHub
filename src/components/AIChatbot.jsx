import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader } from 'lucide-react';

const SYSTEM_CONTEXT = `You are NayePankh AI Assistant, a helpful chatbot for NayePankh Foundation - an NGO dedicated to empowering underprivileged communities in India through education, nutrition, healthcare, and sustainable development.

Key information:
- Founded to help underprivileged communities across India
- Programs: Education Support, Nutrition Program, Healthcare Initiative, Women Empowerment, Environmental Drive, Digital Literacy
- Volunteers: 1,240+ active volunteers
- Impact: 12,847 students helped, 95,420 meals distributed, 28,500 trees planted
- Contact: contact@nayepankh.org | +91 98765 43210
- Location: New Delhi, India
- Donation options: ₹100 (books), ₹500 (food kit), ₹1000 (education support), ₹5000 (sponsor a child)
- How to volunteer: Apply on the website, upload resume, select interests
- Current campaigns: Education for All, Hunger-Free Community, Green Earth Initiative, Medical Care for Children, Women Empowerment Program
- Upcoming events: Annual Charity Run (Feb 15), Education Workshop (Feb 22), Tree Plantation (Mar 8), Gala Dinner (Mar 20)

Be warm, helpful, concise and encouraging. Focus on NGO-related queries. For unrelated topics, politely redirect to NGO matters.`;

const quickReplies = [
  'How can I volunteer?',
  'How to donate?',
  'Current campaigns',
  'Upcoming events',
  'About NayePankh',
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! 👋 I\'m the NayePankh AI Assistant. I can help you with information about our campaigns, volunteer opportunities, donation process, and upcoming events. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const userMsg = { id: Date.now().toString(), role: 'user', content: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        // Demo response without API
        await new Promise(r => setTimeout(r, 800));
        const demoResponses = {
          volunteer: 'To volunteer with NayePankh:\n1. Visit our Volunteer page\n2. Fill out the application form\n3. Upload your resume\n4. Select your areas of interest\n5. Wait for approval (usually 2-3 days)\n\nWe welcome volunteers for education, healthcare, environment, and more! 🌟',
          donate: 'Donating is easy!\n\n💰 **Impact of your donation:**\n• ₹100 = 1 Book for a student\n• ₹500 = Food kit for a family\n• ₹1,000 = 1 month Education Support\n• ₹5,000 = Sponsor a child for a year\n\nVisit our Donate page to make a secure contribution. All donations are tax-exempt! 🙏',
          campaign: 'Our active campaigns:\n\n📚 **Education for All** - 68% funded\n🍱 **Hunger-Free Community** - 63% funded\n🌳 **Green Earth Initiative** - 78% funded\n🏥 **Medical Care for Children** - 56% funded\n👩 **Women Empowerment** - 72% funded\n\nVisit Campaigns page to support any cause! ❤️',
          event: 'Upcoming events:\n\n🏃 **Charity Run** - Feb 15, Lodhi Garden, Delhi\n📖 **Education Workshop** - Feb 22, India Habitat Centre\n🌳 **Tree Plantation** - Mar 8, Gurugram\n🎉 **Gala Dinner** - Mar 20, Taj Palace\n\nAll are FREE except Gala Dinner. Register on the Events page!',
          default: 'Thank you for your question! NayePankh Foundation is dedicated to empowering underprivileged communities across India. We work in education, nutrition, healthcare, women empowerment, and environmental initiatives.\n\nHow can I specifically help you today? You can ask about volunteering, donating, campaigns, or events! 😊',
        };

        const lowerText = userText.toLowerCase();
        let response = demoResponses.default;
        if (lowerText.includes('volunteer')) response = demoResponses.volunteer;
        else if (lowerText.includes('donat') || lowerText.includes('money') || lowerText.includes('rupee')) response = demoResponses.donate;
        else if (lowerText.includes('campaign')) response = demoResponses.campaign;
        else if (lowerText.includes('event')) response = demoResponses.event;

        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: response }]);
        return;
      }

      // Real Gemini API call
      const conversationHistory = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));
      conversationHistory.push({ role: 'user', parts: [{ text: userText }] });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
            contents: conversationHistory,
            generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
          }),
        }
      );
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process your request. Please try again.';
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: aiText }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I apologize, I\'m having trouble connecting right now. Please try again or contact us at contact@nayepankh.org 🙏',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30 pulse-glow ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI Chatbot"
      >
        <Sparkles size={22} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[540px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-bg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">NayePankh AI</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-white/80 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center text-white ${msg.role === 'user' ? 'gradient-bg' : 'bg-indigo-100 dark:bg-indigo-900/30'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-indigo-600 dark:text-indigo-400" />}
                  </div>
                  <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'gradient-bg text-white rounded-tr-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-xl flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Bot size={14} className="text-indigo-600" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} className="w-2 h-2 bg-indigo-400 rounded-full"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors border border-indigo-200 dark:border-indigo-800"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className={`p-1.5 rounded-lg transition-all ${input.trim() && !loading ? 'gradient-bg text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
