import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; // For entrance animations
import gsap from 'gsap'; // For magnetic hover effects

// --- Helper Component: Magnetic Link (GSAP) ---
const MagneticLink = ({ children, href }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.5); // Move factor (0.5 means it moves half as much as the mouse)
      yTo(y * 0.5);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a 
      ref={ref} 
      href={href} 
      className="inline-block text-gray-400 hover:text-white transition-colors duration-300 py-1"
    >
      {children}
    </a>
  );
};

// --- Main Footer Component ---
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4 mb-20">
          
          {/* Left Side: Logo & Content (Span 6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo Placeholder */}
              <div className="text-3xl font-bold mb-6 tracking-tighter">
                AGENCY<span className="text-blue-500">.</span>
              </div>
              <p className="text-gray-400 max-w-sm text-lg leading-relaxed">
                We craft digital experiences that merge art, code, and human interaction. Let's build something meaningful together.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Columns for Links (Span 6 cols total) */}
          <div className="md:col-span-6 flex flex-col md:flex-row gap-10 md:gap-20 md:justify-end">
            
            {/* Work Section */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="flex flex-col gap-4"
            >
              <h3 className="uppercase text-sm font-semibold tracking-wider text-gray-500 mb-2">Work</h3>
              <MagneticLink href="/portfolio">Portfolio</MagneticLink>
              <MagneticLink href="/case-studies">Case Studies</MagneticLink>
              <MagneticLink href="/services">Services</MagneticLink>
            </motion.div>

            {/* Social Media Section */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="flex flex-col gap-4"
            >
              <h3 className="uppercase text-sm font-semibold tracking-wider text-gray-500 mb-2">Socials</h3>
              <MagneticLink href="https://twitter.com">Twitter / X</MagneticLink>
              <MagneticLink href="https://instagram.com">Instagram</MagneticLink>
              <MagneticLink href="https://linkedin.com">LinkedIn</MagneticLink>
              <MagneticLink href="https://github.com">GitHub</MagneticLink>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Big Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-end"
        >
           <span className="text-gray-600 text-sm">
             © {new Date().getFullYear()} Agency Inc. All rights reserved.
           </span>
           
           {/* Optional: Big Typographic Element */}
           <h1 className="text-[12vw] leading-none font-bold text-gray-900 select-none pointer-events-none mt-10 md:mt-0">
             CREATIVE
           </h1>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;