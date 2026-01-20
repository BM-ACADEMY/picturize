import React, { useEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// --- Assets ---
import Banner2 from "@/assets/banner2.png"; 
import PopArtSwirl from "@/assets/banner.png"; 
import Pdf from "@/assets/portfolio.pdf"

// --- Icons ---
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaLightbulb, FaFingerprint, FaVrCardboard, FaArrowRight } from 'react-icons/fa';
import { BsStars } from "react-icons/bs"; 
import { PiCubeTransparentBold } from "react-icons/pi"; 

gsap.registerPlugin(ScrollTrigger);

const StackedCards = forwardRef((props, ref) => {
  const componentRef = useRef(null);
  const secondSectionRef = useRef(null);

  const scrollToNext = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".stack-card");
      const headerSelector = "header, .navbar"; 

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top", 
          end: "bottom top", 
          pin: true, 
          pinSpacing: false, 
          scrub: true,
          onEnter: () => {
            const color = card.dataset.headerColor;
            if (color) {
                gsap.to(headerSelector, { color: color, duration: 0.3, overwrite: true });
            }
          },
          onEnterBack: () => {
            const color = card.dataset.headerColor;
            if (color) {
                gsap.to(headerSelector, { color: color, duration: 0.3, overwrite: true });
            }
          }
        });

        if (i < cards.length - 1) { 
            gsap.to(card.querySelector('.inner-content'), {
                scale: 0.95, 
                opacity: 0.5,
                ease: "none",
                scrollTrigger: {
                    trigger: cards[i + 1], 
                    start: "top bottom", 
                    end: "top top",      
                    scrub: true,
                }
            });
        }
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  const services = [
    "Video Production", "Motion Graphics", "Explainer Videos", "Video Post-Production",
    "Architectural Visualization", "Advertisements", "VFX Compositing", "Roto / Paint"
  ];

  const graphicServices = [
    "Social Media Design", "E Commerce Product Design", "LED & Billboards",
    "Banner & Web Creative Content", "Package Design", "Poster / Magazines Flyers"
  ];
  
  const brandingServices = [
    { title: "Projection Mapping", icon: <FaVrCardboard /> },
    { title: "Brand Consultancy", icon: <FaLightbulb /> },
    { title: "Creative Ads", icon: <BsStars /> },
    { title: "Infographics", icon: <FaFingerprint /> },
    { title: "AR / VR", icon: <PiCubeTransparentBold /> }, 
    { title: "Storyboarding", icon: <FaCheckCircle /> }
  ];

  return (
    <div ref={ref} className="w-full relative bg-black">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .text-stroke-black { -webkit-text-stroke: 2px black; color: transparent; }
        .text-stroke-white { -webkit-text-stroke: 2px white; color: transparent; }
      `}</style>

      <div ref={componentRef}>
        
        {/* SECTION 1: Video & VFX */}
       <section 
            className="stack-card h-screen w-full sticky top-0 z-10 bg-[#2A8F85] text-white overflow-hidden border-t border-white/5"
            data-header-color="white" 
        >
            <img 
                src={Banner2} 
                alt="Abstract Dotted Swirl"
                className="absolute top-1/2 -right-[20%] md:-right-[10%] lg:right-0 -translate-y-1/2 w-[800px] h-[800px] object-contain pointer-events-none opacity-20 mix-blend-screen animate-[spin_60s_linear_infinite] z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-0"></div>

            <div className="inner-content w-full h-full flex items-center justify-center relative z-10 overflow-y-auto no-scrollbar">
                <div className="container mx-auto px-6 h-auto py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-5 flex flex-col justify-center lg:justify-between h-auto lg:h-full relative z-10">
                        <div>
                            <div className="flex items-center gap-3 text-[#ffdb4d] uppercase tracking-[0.2em] text-xs font-bold mb-4 lg:mb-6">
                                <span className="w-6 h-[2px] bg-[#ffdb4d]"></span>
                                01. Step One
                            </div>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-4 lg:mb-8">
                                Video, VFX &<br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffdb4d] to-yellow-200">Animation</span>
                            </h2>
                            <p className="text-white/70 text-sm md:text-base lg:text-lg max-w-sm leading-relaxed border-l-2 border-[#ffdb4d]/30 pl-4 lg:pl-6 hidden md:block">
                                Transform flat ideas into spatial experiences. We handle everything from high-end commercials to complex architectural visualization.
                            </p>
                        </div>
                        <div className="hidden lg:block mt-8">
                             <button 
                                onClick={scrollToNext}
                                className="group flex items-center gap-4 text-white"
                            >
                                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#ffdb4d] group-hover:border-[#ffdb4d] group-hover:scale-110 transition-all duration-300">
                                    <span className="group-hover:text-black transition-colors text-xl">↓</span>
                                </div>
                                <span className="uppercase tracking-widest text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity">Scroll for More</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-7 flex flex-col justify-start lg:justify-center h-auto pb-20 lg:pb-0 relative z-20">
                        <div className="w-full space-y-0">
                            {services.map((service, index) => (
                                <div key={index} className="group relative flex items-center justify-between py-3 md:py-4 lg:py-6 border-b border-white/10 hover:border-[#ffdb4d] transition-colors duration-300 cursor-pointer">
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 -mx-4 px-4 rounded-lg"></div>
                                    <div className="flex items-center gap-4 lg:gap-6 relative z-10">
                                        <span className="text-[#ffdb4d] font-mono text-xs lg:text-sm opacity-50 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                                        <h3 className="text-lg md:text-2xl lg:text-3xl font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">{service}</h3>
                                    </div>
                                    <div className="relative z-10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-[#ffdb4d]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 lg:w-6 lg:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
<section 
            ref={secondSectionRef}
            className="stack-card h-screen w-full sticky top-0 z-20 bg-[#FFF500] text-black overflow-hidden"
            data-header-color="black"
        >
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                  <svg className="w-full h-full" width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="inner-content w-full h-full relative overflow-y-auto no-scrollbar z-10 flex flex-col">
                <div className="container mx-auto px-6 pt-16 md:pt-20 pb-8 flex flex-col md:flex-row justify-between items-end border-b border-black/10">
                    <div>
                        <div className="flex items-center gap-3 text-black uppercase tracking-[0.3em] text-xs font-bold mb-4">
                            <span className="w-8 h-[2px] bg-black"></span>
                            02. Services
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                           Graphics, Print & Photography
                        </h2>
                    </div>
                    
                    <div className="hidden md:block mb-4">
                        <a 
                            href={Pdf}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block cursor-pointer hover:scale-105 transition-transform duration-300"
                        >
                            <div className="w-32 h-32 rounded-full border border-black/10 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                                    <path id="textPath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                                    <text>
                                        <textPath href="#textPath" className="text-[11px] font-bold uppercase tracking-[0.15em]">
                                            Explore Our Portfolio • Explore Our Portfolio •
                                        </textPath>
                                    </text>
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-12 flex-grow flex items-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6 w-full">
                         {graphicServices.map((item, index) => (
                            <div key={index} className="group relative flex flex-col items-center justify-center text-center cursor-pointer">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-black/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 blur-md"></div>
                                    <div className="relative z-10 text-4xl md:text-5xl text-black group-hover:-translate-y-3 transition-transform duration-300 ease-back-out">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="w-8 h-1 bg-black/20 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2 blur-[2px] group-hover:scale-75 group-hover:opacity-50 transition-all duration-300"></div>
                                </div>
                                <h3 className="text-sm md:text-lg font-bold uppercase tracking-wider max-w-[150px] leading-tight group-hover:scale-105 transition-transform duration-300">
                                    {item}
                                </h3>
                                <div className="w-0 group-hover:w-8 h-[2px] bg-black mt-3 transition-all duration-300"></div>
                            </div>
                         ))}
                    </div>
                </div>

                <div className="w-full bg-black py-3 overflow-hidden whitespace-nowrap">
                    <div className="animate-[marquee_20s_linear_infinite] inline-block">
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-[#FFF500] font-black uppercase tracking-widest text-lg mx-8">
                                • Portfolio • View Projects • Brand Identity • Print Design
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* ================= STACKED SECTION 3 - BRANDING & INNOVATION (Green) - Z-30 ================= */}
        {/* REDESIGNED: CENTERED LAYOUT, NO PARAGRAPH, CARDS BELOW */}
    <section 
            className="stack-card h-screen w-full sticky top-0 z-30 bg-[#39FF14] text-black overflow-hidden"
            data-header-color="black"
        >
            {/* --- CENTERED BACKGROUND VECTOR --- */}
            {/* FIX: Removed mix-blend-multiply, Increased Opacity to 0.6 or 1 */}
           {/* --- BACKGROUND VECTOR (LEFT SIDE ONLY) --- */}
<div className="absolute -left-[40%] md:-left-[25%] top-1/2 -translate-y-1/2 w-[90%] h-[90%] pointer-events-none z-0">
    <img 
        src={PopArtSwirl} 
        alt="Halftone Pop Art" 
        className="w-full h-full object-contain opacity-60 "
    />
</div>

            <div className="inner-content w-full h-full relative overflow-y-auto no-scrollbar z-10 flex flex-col justify-center">
                <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center h-full">
                    
                    {/* CENTERED HEADING */}
                    <div className="text-center relative z-20 mb-10 md:mb-16">
                        <div className="inline-block border-b-2 border-black pb-1 mb-4">
                            <span className="uppercase tracking-[0.4em] text-xs font-bold">03. Future Ready</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black uppercase leading-[0.85] tracking-tighter">
                            <span className="block text-stroke-black">Brand</span>
                            <span className="block text-black">Innovation</span>
                        </h2>
                    </div>

                    {/* GRID OF CARDS (Below Heading) */}
                    <div className="w-full max-w-6xl relative z-20">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                            {brandingServices.map((item, index) => (
                                <div key={index} className="group relative cursor-pointer">
                                    {/* Card Container */}
                                    <div className="
                                        bg-white
                                        border-[3px] border-black rounded-lg
                                        p-6 md:p-8
                                        flex flex-col items-center justify-center gap-4
                                        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                                        transition-all duration-200 ease-out
                                        hover:-translate-y-1 hover:translate-x-1
                                        hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
                                        hover:bg-black group-hover:text-white
                                        h-40 md:h-48
                                        text-center
                                    ">
                                        {/* Icon */}
                                        <div className="text-3xl md:text-4xl text-black group-hover:text-[#39FF14] transition-colors duration-200 group-hover:scale-110">
                                            {item.icon}
                                        </div>
                                        
                                        {/* Text */}
                                        <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-black group-hover:text-white transition-colors duration-200">
                                            {item.title}
                                        </h3>

                                        {/* Tiny corner arrow */}
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#39FF14] text-xs">
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
        {/* SECTION 4: About (Content Only) */}
        {/* SECTION 4: About (Optimized for sm/md) */}
<section className="stack-card h-screen w-full sticky top-0 z-40 bg-[#F50537] text-white overflow-hidden" data-header-color="white">
  {/* Background Pattern - Lower opacity on mobile for better text legibility */}
  <div className="absolute -right-[40%] md:-right-[25%] top-1/2 -translate-y-1/2 w-[90%] h-[90%] pointer-events-none z-0">
    <img 
      src={Banner2} 
      alt="Halftone Pop Art" 
      className="w-full h-full object-contain opacity-40 md:opacity-80"
    />
  </div>

  {/* Added flex-col and justify-between to handle vertical spacing on small screens */}
  <div className="inner-content w-full h-full relative overflow-y-auto no-scrollbar z-10 flex flex-col">
    <div className="container mx-auto px-6 py-12 md:py-20 flex-grow flex flex-col justify-center">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        <div>
          <div className="flex items-center gap-3 text-[#ffdb4d] uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold mb-4 md:mb-6">
            <span className="w-6 h-[2px] bg-[#ffdb4d]"></span> 04. Our Story
          </div>
          
          {/* Decreased font sizes: 4xl for mobile, 6xl for tablet, 8xl for desktop */}
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase mb-4 md:mb-8 tracking-tighter leading-none">
            About
          </h2>
          
          {/* Responsive body text scaling */}
          <p className="text-lg sm:text-xl md:text-2xl font-medium leading-tight mb-4 md:mb-8 text-white">
            Picturize, we specialize in crafting compelling brand stories that elevate your products and businesses. From ideation and design to seamless production, we handle every step of the content creation journey with precision and passion.
          </p>
          
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 opacity-90">
            Our team is backed by deep expertise across various industries, delivering exceptional results. Whether it's creating stunning visual effects for a movie, video editing for renowned brands, or designing and producing innovative content, we excel in every aspect of 360-degree content production.
          </p>
        </div>

        {/* Contact Info Footer - Refined grid for sm (2 cols) and md (3 cols) */}
        <div className="pt-8 md:pt-12 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Call Us */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-3 md:p-4 bg-white/20 md:bg-white/50 rounded-full shrink-0">
              <FaPhoneAlt className="text-sm md:text-base" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs uppercase font-bold opacity-80">Call Us</p>
              <p className="text-sm md:text-lg font-bold leading-tight">9487509935</p>
              <p className="text-sm md:text-lg font-bold leading-tight">72080 97980</p>
            </div>
          </div>

          {/* Email Us */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-3 md:p-4 bg-white/20 md:bg-white/50 rounded-full shrink-0">
              <FaEnvelope className="text-sm md:text-base" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] md:text-xs uppercase font-bold opacity-80">Email Us</p>
              <p className="text-xs sm:text-sm md:text-lg font-bold truncate">swatigore@picturize.co.in</p>
              <p className="text-xs sm:text-sm md:text-lg font-bold truncate">godwin@picturize.co.in</p>
            </div>
          </div>

          {/* Location - Full width on small mobile, part of grid on larger */}
          <div className="flex items-center gap-3 md:gap-4 sm:col-span-2 md:col-span-1">
            <div className="p-3 md:p-4 bg-white/20 md:bg-white/50 rounded-full shrink-0">
              <FaMapMarkerAlt className="text-sm md:text-base" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs uppercase font-bold opacity-80">Location</p>
              <p className="text-sm md:text-lg font-bold">Maharashtra | Tamil Nadu</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</section>

      </div>
    </div>
  );
});

StackedCards.displayName = "StackedCards";
export default StackedCards;