import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, X } from 'lucide-react';

const ContactForm = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('General Inquiry');
  const subjects = ['General Inquiry', 'Content services', 'Vendor', 'Support'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Semi-transparent backdrop
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            // Added "relative" so the close button anchors to this box
            className="w-full max-w-2xl bg-[#ff0040] p-8 md:p-12 rounded-3xl relative shadow-2xl"
          >
            {/* --- CLOSE BUTTON (Now Inside) --- */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white hover:rotate-90 transition-all duration-300 p-2"
            >
              <X size={32} />
            </button>

            <form className="space-y-8 md:space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="First Name" placeholder="John" />
                <InputGroup label="Last Name" placeholder="Doe" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Email" type="email" placeholder="hello@example.com" />
                <InputGroup label="Phone Number" type="tel" placeholder="+1 012 3456 789" />
              </div>

              <div className="space-y-4 text-white">
                <p className="font-semibold text-lg">Select Subject?</p>
                <div className="flex flex-wrap gap-6">
                  {subjects.map((item) => (
                    <label key={item} className="flex items-center cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          name="subject"
                          className="sr-only"
                          checked={subject === item}
                          onChange={() => setSubject(item)}
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          subject === item ? 'bg-white border-white' : 'border-white/50'
                        }`}>
                          {subject === item && <Check size={12} className="text-[#ff0040]" strokeWidth={4} />}
                        </div>
                      </div>
                      <span className="ml-3 text-sm font-medium">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="relative group text-white">
                <label className="block text-sm font-medium mb-2 opacity-80">Message</label>
                <textarea 
                  placeholder="Write your message.."
                  className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white transition-colors resize-none placeholder:text-white/40"
                  rows={1}
                />
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-10 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-zinc-900 transition-colors shadow-xl"
                >
                  Send Message <Send size={18} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InputGroup = ({ label, type = "text", placeholder }) => (
  <div className="relative group w-full text-white">
    <label className="block text-sm font-medium mb-1 opacity-80">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
    />
    <motion.div className="absolute bottom-0 left-0 h-[2px] bg-white w-0 group-focus-within:w-full transition-all duration-300" />
  </div>
);

export default ContactForm;