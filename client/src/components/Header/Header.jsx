import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HiMenuAlt4 } from "react-icons/hi";
import { MdClose } from "react-icons/md";

const navLinks = [
  { title: "Home", href: "#" },
  { title: "Work", href: "#" },
  { title: "Services", href: "#" },
  { title: "About", href: "#" },
  { title: "Contact", href: "#" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const tlRef = useRef(null);
  const menuOverlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Navbar Entrance
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );

      // 2. Main Menu Animation Timeline
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
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .to(
          ".menu-footer",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tlRef.current) {
      if (menuOpen) {
        tlRef.current.play();
        document.body.style.overflow = "hidden";
      } else {
        tlRef.current.reverse();
        document.body.style.overflow = "auto";
      }
    }
  }, [menuOpen]);

  return (
    <div ref={containerRef}>
      {/* --- NAVBAR --- */}
      <nav
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference text-white"
      >
        <div className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase cursor-pointer z-50">
          Picturize
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="group relative flex items-center justify-center p-2 z-50 rounded-full hover:bg-white/10 transition-all duration-300"
        >
          <div className="text-3xl">
            {menuOpen ? (
              <span className="block animate-spin-slow">
                <MdClose />
              </span>
            ) : (
              <span className="block group-hover:rotate-180 transition-transform duration-500">
                <HiMenuAlt4 />
              </span>
            )}
          </div>
        </button>
      </nav>

      {/* --- FULL SCREEN MENU OVERLAY --- */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center items-center text-white"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {navLinks.map((link, index) => (
            /* FIX APPLIED HERE:
               Added 'px-4' (padding-x) to give the text horizontal room to slant
               Added 'py-1' (padding-y) to ensure descenders aren't clipped
            */
            <div key={index} className="overflow-hidden px-4 py-1">
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="menu-link-item block text-5xl md:text-8xl font-black text-white uppercase tracking-tighter hover:text-[#ffdb4d]  transition-all duration-300 cursor-pointer opacity-0 translate-y-[150px]"
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
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
          </div>
          <div>© 2024 Picturize Agency</div>
        </div>
      </div>
    </div>
  );
};

export default Header;