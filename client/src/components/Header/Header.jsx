import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HiMenuAlt4 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import ContactForm from "@/components/Pages/ContactForm"; 

// Assets
import Logo from "@/assets/logo.png";
import Pdf from "@/assets/portfolio.pdf";

const navLinks = [
  { 
    title: "Portfolio", 
    href: Pdf, 
    isPdf: true,
    isModal: false
  },
  { 
    title: "Enquiry", 
    href: "#", 
    isPdf: false,
    isModal: true 
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const tlRef = useRef(null);
  const menuOverlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );

      tlRef.current = gsap.timeline({ paused: true });

      tlRef.current
        .to(menuOverlayRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "power4.inOut",
        })
        .to(
          ".menu-link-item",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .to(
          ".menu-footer",
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Control Menu playback via state
  useEffect(() => {
    if (tlRef.current) {
      if (menuOpen) {
        tlRef.current.play();
        document.body.style.overflow = "hidden";
      } else {
        tlRef.current.reverse();
        if (!showEnquiry) document.body.style.overflow = "auto";
      }
    }
  }, [menuOpen, showEnquiry]);

  // UPDATED HANDLER: Closes menu first, THEN opens modal
  const handleLinkClick = async (e, link) => {
    if (link.isModal) {
      e.preventDefault();
      
      // 1. Close the menu state
      setMenuOpen(false); 
      
      // 2. Wait for the GSAP reverse animation to finish completely
      if (tlRef.current) {
        await tlRef.current.reverse(); 
      }
      
      // 3. Open the enquiry modal
      setShowEnquiry(true);
      document.body.style.overflow = "hidden"; // Ensure scroll stays locked
    } else {
      if (!link.isPdf) setMenuOpen(false);
    }
  };

  return (
    <div ref={containerRef}>
      {/* --- NAVBAR --- */}
      <nav
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[60] px-6 md:px-12 py-6 flex justify-between items-center text-white"
      >
        <div className="z-[70]">
           <img src={Logo} alt='logo' className="w-40 md:w-56 h-auto object-contain" />
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="group relative flex items-center justify-center p-2 z-[70] rounded-full hover:bg-white/10 transition-all duration-300"
        >
          <div className="text-3xl">
            {menuOpen ? (
              <span className="block text-white">
                <MdClose />
              </span>
            ) : (
              <span className="block group-hover:rotate-180 transition-transform duration-500 text-black">
                <HiMenuAlt4 />
              </span>
            )}
          </div>
        </button>
      </nav>

      {/* --- FULL SCREEN MENU OVERLAY --- */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col justify-center items-center text-white"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {navLinks.map((link, index) => (
            <div key={index} className="overflow-hidden px-4 py-1">
              <a
                href={link.href}
                target={link.isPdf ? "_blank" : "_self"}
                rel={link.isPdf ? "noopener noreferrer" : ""}
                onClick={(e) => handleLinkClick(e, link)}
                className="menu-link-item block text-5xl md:text-8xl font-black text-white uppercase tracking-tighter hover:text-[#ffdb4d] transition-all duration-300 cursor-pointer opacity-0 translate-y-[150px]"
              >
                {link.title}
              </a>
            </div>
          ))}
        </div>

        <div className="menu-footer absolute bottom-10 w-full flex justify-between px-6 md:px-12 text-xs md:text-sm text-gray-400 uppercase tracking-widest opacity-0 translate-y-5">
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
          </div>
          <div>© 2026 Picturize Agency</div>
        </div>
      </div>

      {/* --- ENQUIRY MODAL --- */}
      <ContactForm 
        isOpen={showEnquiry} 
        onClose={() => setShowEnquiry(false)} 
      />
    </div>
  );
};

export default Header;