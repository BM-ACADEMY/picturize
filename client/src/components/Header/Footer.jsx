import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Send, Check, Loader2, PartyPopper, AlertCircle, X } from 'lucide-react';
// Added react-icons import
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'; 
import axios from 'axios';
import Logo from "@/assets/logowhite.png";

const API_URL = import.meta.env.VITE_API_URL;

// --- Compact Multi-Purpose Toast Component ---
const Toast = ({ show, onClose, type = "success", message }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className={`fixed bottom-6 right-6 z-[100] p-3 rounded-xl shadow-2xl flex items-center gap-3 border max-w-[280px] ${
          type === "success" 
            ? "bg-white text-black border-zinc-200" 
            : "bg-red-600 text-white border-red-500"
        }`}
      >
        <div className={`${type === "success" ? "bg-green-100 text-green-600" : "bg-white/20 text-white"} p-1.5 rounded-full`}>
          {type === "success" ? <PartyPopper size={18} /> : <AlertCircle size={18} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[12px] leading-tight">
            {type === "success" ? "Success!" : "Error"}
          </p>
          <p className={`text-[11px] leading-snug truncate-2-lines ${type === "success" ? "text-gray-500" : "text-white/90"}`}>
            {message}
          </p>
        </div>
        <button onClick={onClose} className="opacity-40 hover:opacity-100 transition-opacity">
          <X size={14} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

const FooterInput = ({ label, type = "text", placeholder, name, pattern, maxLength, required = true }) => (
  <div className="relative group w-full text-white">
    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">{label}</label>
    <input 
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      pattern={pattern}
      maxLength={maxLength}
      className="w-full bg-transparent border-b border-gray-800 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700 text-lg"
      onChange={(e) => {
        if (type === 'tel') e.target.value = e.target.value.replace(/[^0-9]/g, '');
      }}
    />
    <motion.div className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-focus-within:w-full transition-all duration-300" />
  </div>
);

const Footer = () => {
  const [subject, setSubject] = useState('General Inquiry');
  const [isSending, setIsSending] = useState(false);
  const [toastConfig, setToastConfig] = useState({ show: false, type: 'success', message: '' });
  const btnRef = useRef(null);
  
  const subjects = ['General Inquiry', 'Content services', 'Vendor', 'Support'];

  const triggerToast = (type, message) => {
    setToastConfig({ show: true, type, message });
    setTimeout(() => setToastConfig(prev => ({ ...prev, show: false })), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const btn = btnRef.current;
    gsap.to(btn, { width: 160, duration: 0.4 });

    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: subject,
      message: formData.get('message'),
    };

    try {
      const res = await axios.post(`${API_URL}/picturize/contact`, data);

      if (res.status === 200 || res.status === 201) {
        triggerToast("success", "Your message has been sent successfully.");
        e.target.reset();
        setSubject('General Inquiry');
      }
    } catch (err) {
      console.error("Submission Error:", err);
      const errorMsg = err.response 
        ? err.response.data.message 
        : "Server is unreachable. Please check if the backend is running.";
      triggerToast("error", errorMsg);
    } finally {
      setIsSending(false);
      gsap.to(btn, { width: "auto", duration: 0.4 });
    }
  };

  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 overflow-hidden">
      <Toast 
        show={toastConfig.show} 
        type={toastConfig.type} 
        message={toastConfig.message} 
        onClose={() => setToastConfig(prev => ({ ...prev, show: false }))} 
      />
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* --- LEFT COLUMN (Updated Content) --- */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="mb-12">
                <img src={Logo} alt='logo' className="w-64 h-auto" />
              </div>

              {/* Contact Information Blocks */}
              <div className="space-y-8">
                {/* Phone Block */}
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/10 rounded-full shrink-0 text-white">
                    <FaPhoneAlt className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-500 mb-1 tracking-wider">Call Us</p>
                    <p className="text-lg font-bold leading-tight">8591127699 | 9487509935</p>
                  </div>
                </div>

                {/* Location Block */}
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/10 rounded-full shrink-0 text-white">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-500 mb-1 tracking-wider">Location</p>
                    <p className="text-lg font-bold">Mumbai | Chennai</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

          {/* --- RIGHT COLUMN (Form) --- */}
          <div className="lg:col-span-7">
            <form className="space-y-10 w-full" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FooterInput name="firstName" label="First Name" placeholder="John" />
                <FooterInput name="lastName" label="Last Name" placeholder="Doe" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FooterInput name="email" label="Email Address" type="email" placeholder="hello@example.com" />
                <FooterInput name="phone" label="Phone (10 Digits)" type="tel" placeholder="9876543210" pattern="[0-9]{10}" maxLength={10} />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Subject</p>
                <div className="flex flex-wrap gap-6">
                  {subjects.map((item) => (
                    <label key={item} className="flex items-center cursor-pointer">
                      <input type="radio" name="subject_radio" className="sr-only" checked={subject === item} onChange={() => setSubject(item)} />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${subject === item ? 'bg-white border-white' : 'border-gray-600'}`}>
                        {subject === item && <Check size={10} className="text-black" strokeWidth={4} />}
                      </div>
                      <span className={`ml-3 text-sm ${subject === item ? 'text-white' : 'text-gray-500'}`}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">Message</label>
                <textarea name="message" required placeholder="Project details..." className="w-full bg-transparent border-b border-gray-800 py-3 focus:outline-none focus:border-white transition-colors resize-none text-lg" rows={1} />
              </div>

              <div className="flex justify-end pt-4">
               <motion.button
                  ref={btnRef}
                  disabled={isSending}
                  type="submit"
                  className="relative group overflow-hidden px-10 py-4 rounded-full font-bold flex items-center justify-center gap-3 transition-all duration-500 disabled:cursor-not-allowed min-w-[180px]
                    bg-white/10 
                    backdrop-blur-xl 
                    border border-white/20 
                    shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
                    hover:bg-white/20 
                    hover:border-white/40
                    text-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                  
                  <AnimatePresence mode="wait">
                    {isSending ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Loader2 className="animate-spin" size={20} />
                      </motion.div>
                    ) : (
                      <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 relative z-10">
                        Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Typographic Footer */}
        <div className="border-t border-gray-900 pt-10 flex flex-col items-center">
          <h1 className="text-[12vw] leading-none font-medium text-zinc-800 select-none mt-6">picturize</h1>
          <p className="text-gray-400 pt-4 text-sm">© {new Date().getFullYear()} <span className='text-white'><a href="https://bmtechx.in" target='_blank' rel="noreferrer">BMTechx.in </a></span>.All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;