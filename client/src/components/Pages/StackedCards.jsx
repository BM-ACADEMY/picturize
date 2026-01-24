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

import { HiOutlineVideoCamera } from "react-icons/hi";
import { 
  MdOutlineMovieFilter, 
  MdOutlineArchitecture, 
  MdOutlineSettingsInputComponent, 
  MdAutoFixHigh,
  MdOutlineAnimation,
  MdFlashOn
} from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { MdOutlineSocialDistance, MdOutlineDashboardCustomize, MdOutlineLocalPostOffice } from "react-icons/md";
import { BiCartAlt, BiPackage } from "react-icons/bi";
import { AiOutlineLayout } from "react-icons/ai";


import Logo from "@/assets/logowhite.png";
import Logo2 from "@/assets/logo.png";

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

 const graphicServicesWithIcons = [
  { title: "Social Media Design", icon: <MdOutlineSocialDistance /> },
  { title: "E Commerce Product Design", icon: <BiCartAlt /> },
  { title: "LED & Billboards", icon: <MdOutlineDashboardCustomize /> },
  { title: "Banner & Web Creative Content", icon: <AiOutlineLayout /> },
  { title: "Package Design", icon: <BiPackage /> },
  { title: "Poster / Magazines Flyers", icon: <MdOutlineLocalPostOffice /> }
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
            className="stack-card h-screen w-full sticky top-0 z-10 bg-black text-white overflow-hidden border-t border-white/10"
            data-header-color="white" 
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.11] pointer-events-none">
                <svg className="w-full h-full" width="100%" height="100%">
                    <pattern id="grid-white" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-white)" />
                </svg>
            </div>

            <div className="inner-content w-full h-full relative overflow-y-auto no-scrollbar z-10 flex flex-col">
                
                {/* TOP HEADER AREA */}
                <div className="container mx-auto px-6 pt-24 md:pt-20 pb-8 flex flex-row justify-between items-center md:items-end border-b border-white/40">
                    
                    <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
                        <img 
                            src={Logo}
                            alt="Logo" 
                            className="w-20 md:w-32 lg:w-40 h-auto object-contain hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                            Video, VFX & <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffdb4d] to-yellow-200">Animation</span>
                        </h2>
                    </div>
                    
                    {/* Circular Scroll Indicator */}
                    <div className="mb-0 md:mb-4">
                        <a 
                            href={Pdf} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block cursor-pointer hover:scale-105 transition-transform duration-300 group"
                        >
                            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-white/20 flex items-center justify-center animate-[spin_12s_linear_infinite] group-hover:border-[#ffdb4d]/50 relative">
                            <svg viewBox="0 0 100 100" className="w-full h-full p-1 md:p-2">
                                <path id="textPath1" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                                <text>
                                <textPath href="#textPath1" className="text-[12px] md:text-[10px] font-bold uppercase tracking-[0.2em] fill-white group-hover:fill-[#ffdb4d] transition-colors">
                                     Portfolio here • Portfolio here •
                                </textPath>
                                </text>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm md:text-xl group-hover:text-[#ffdb4d] transition-colors">↗</span>
                            </div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* SERVICES GRID AREA */}
                <div className="container mx-auto px-6 py-12 flex-grow flex items-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 w-full">
                        {[
                            { title: "Video Production", icon: <HiOutlineVideoCamera /> },
                            { title: "Motion Graphics", icon: <MdOutlineAnimation /> },
                            { title: "Explainer Videos", icon: <MdOutlineMovieFilter /> },
                            { title: "video Post-Production", icon: <MdOutlineSettingsInputComponent /> },
                            { title: "Architectural Visualisation", icon: <MdOutlineArchitecture /> },
                            { title: "Advertisements", icon: <RiAdvertisementFill /> },
                            { title: "VFX Compositing", icon: <MdFlashOn /> }, 
                            { title: "Roto / Paint", icon: <MdAutoFixHigh /> },
                        ].map((item, index) => (
                            <div key={index} className="group relative flex flex-col items-center justify-center text-center cursor-pointer">
                                <div className="relative mb-4 md:mb-6">
                                    <div className="absolute inset-0 bg-[#ffdb4d]/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 blur-md"></div>
                                    <div className="relative z-10 text-3xl md:text-5xl text-white group-hover:text-[#ffdb4d] group-hover:-translate-y-3 transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <div className="w-8 h-1 bg-white/20 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2 blur-[2px] group-hover:scale-75 group-hover:opacity-50 transition-all duration-300"></div>
                                </div>
                                <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest max-w-[140px] leading-tight group-hover:text-[#ffdb4d] transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <div className="w-0 group-hover:w-8 h-[1px] bg-[#ffdb4d] mt-3 transition-all duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 2: Graphics */}
        <section 
          ref={secondSectionRef}
          className="stack-card h-screen w-full sticky top-0 z-20 bg-[#FFF500] text-black overflow-hidden"
          data-header-color="black"
        >
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg className="w-full h-full" width="100%" height="100%">
              <pattern id="grid-yellow" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-yellow)" />
            </svg>
          </div>

          <div className="inner-content w-full h-full relative overflow-y-auto no-scrollbar z-10 flex flex-col">
            <div className="container mx-auto px-6 pt-16 md:pt-20 pb-8 flex flex-row justify-between items-center md:items-end border-b border-black/10">
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
                <img 
                    src={Logo2}
                    alt="Logo" 
                    className="w-20 md:w-32 lg:w-40 h-auto object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                  Graphics, Print & <br/> Photography
                </h2>
              </div>
              
              {/* Portfolio Link Indicator */}
              <div className="mb-0 md:mb-4">
                <a 
                  href={Pdf}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block cursor-pointer hover:scale-105 transition-transform duration-300 group"
                >
                  <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-black/20 flex items-center justify-center animate-[spin_12s_linear_infinite] group-hover:border-black/50 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full p-1 md:p-2">
                      <path id="textPathYellow" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                      <text>
                        <textPath href="#textPathYellow" className="text-[12px] md:text-[10px] font-bold uppercase tracking-[0.2em] fill-black transition-colors">
                           Portfolio here • Portfolio here •
                        </textPath>
                      </text>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm md:text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="container mx-auto px-6 py-12 flex-grow flex items-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6 w-full">
                {graphicServicesWithIcons.map((item, index) => (
                  <div key={index} className="group relative flex flex-col items-center justify-center text-center cursor-pointer">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-black/5 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 blur-md"></div>
                      <div className="relative z-10 text-4xl md:text-5xl text-black group-hover:-translate-y-3 transition-transform duration-300 ease-back-out">
                        {item.icon}
                      </div>
                      <div className="w-8 h-1 bg-black/10 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2 blur-[2px] group-hover:scale-75 group-hover:opacity-50 transition-all duration-300"></div>
                    </div>
                    <h3 className="text-xs md:text-lg font-bold uppercase tracking-wider max-w-[150px] leading-tight group-hover:scale-105 transition-transform duration-300">
                      {item.title}
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

        {/* SECTION 3: Brand Innovation */}
        <section 
            className="stack-card h-screen w-full sticky top-0 z-30 bg-black text-white overflow-hidden border-t border-white/10"
            data-header-color="white"
        >
            <div className="absolute inset-0 opacity-[0.11] pointer-events-none">
                <svg className="w-full h-full" width="100%" height="100%">
                    <pattern id="grid-white-3" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-white-3)" />
                </svg>
            </div>

            <div className="inner-content w-full h-full relative overflow-y-auto no-scrollbar z-10 flex flex-col">
                <div className="container mx-auto px-6 pt-24 md:pt-20 pb-8 flex flex-row justify-between items-center md:items-end border-b border-white/40">
                <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
                        <img 
                            src={Logo}
                            alt="Logo" 
                            className="w-20 md:w-32 lg:w-40 h-auto object-contain hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                            Brand <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffdb4d] to-yellow-200">Innovation</span>
                        </h2>
                    </div>
                    
                    {/* Portfolio Link Indicator */}
                    <div className="mb-0 md:mb-4">
                        <a 
                            href={Pdf}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block cursor-pointer hover:scale-105 transition-transform duration-300 group"
                        >
                            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-white/20 flex items-center justify-center animate-[spin_12s_linear_infinite] group-hover:border-[#ffdb4d]/50 relative">
                                <svg viewBox="0 0 100 100" className="w-full h-full p-1 md:p-2">
                                    <path id="textPathBlack3" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                                    <text>
                                        <textPath href="#textPathBlack3" className="text-[12px] md:text-[10px] font-bold uppercase tracking-[0.2em] fill-white group-hover:fill-[#ffdb4d] transition-colors">
                                             Portfolio here • Portfolio here •
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                     <span className="text-sm md:text-xl group-hover:text-[#ffdb4d] transition-colors">↗</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-12 flex-grow flex items-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6 w-full">
                         {brandingServices.map((item, index) => (
                            <div key={index} className="group relative flex flex-col items-center justify-center text-center cursor-pointer">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-[#ffdb4d]/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 blur-md"></div>
                                    <div className="relative z-10 text-4xl md:text-5xl text-white group-hover:text-[#ffdb4d] group-hover:-translate-y-3 transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <div className="w-8 h-[2px] bg-white/20 absolute -bottom-2 left-1/2 -translate-x-1/2 group-hover:bg-[#ffdb4d] group-hover:w-12 transition-all duration-300"></div>
                                </div>
                                
                                <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest max-w-[140px] leading-tight group-hover:text-[#ffdb4d] transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <div className="w-0 group-hover:w-8 h-[1px] bg-[#ffdb4d] mt-3 transition-all duration-300"></div>
                            </div>
                         ))}
                    </div>
                </div>

            </div>
        </section>

        {/* SECTION 4: About */}
        <section className="stack-card h-screen w-full sticky top-0 z-40 bg-[#FFF500] text-[#3e3c00] overflow-hidden" data-header-color="white">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg className="w-full h-full" width="100%" height="100%">
            <pattern id="grid-yellow" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-yellow)" />
            </svg>
        </div>
        
        

        <div className="inner-content w-full h-full relative overflow-y-auto no-scrollbar z-10 flex flex-col">
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
                        <img 
                            src={Logo2}
                            alt="Logo" 
                            className="w-20 md:w-32 lg:w-40 h-auto object-contain hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    
            <div className="container mx-auto px-6 py-12 md:py-20 flex-grow flex flex-col justify-center">
            <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
                <div>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase mb-4 md:mb-8 tracking-tighter leading-none">
                    About
                </h2>
                
                <p className="text-lg sm:text-xl md:text-2xl font-medium leading-tight mb-4 md:mb-8 text-[#3e3c00]">
                    Picturize, we specialize in crafting compelling brand stories that elevate your products and businesses. From ideation and design to seamless production, we handle every step of the content creation journey with precision and passion.
                </p>
                
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#3e3c00] opacity-90">
                    Our team is backed by deep expertise across various industries, delivering exceptional results. Whether it's creating stunning visual effects for a movie, video editing for renowned brands, or designing and producing innovative content, we excel in every aspect of 360-degree content production.
                </p>
                </div>

                <div className="pt-8 md:pt-12 border-t border-red/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-3 md:p-4 bg-[#3e3c00]/20 bg-[#3e3c00]/20 rounded-full shrink-0">
                    <FaPhoneAlt className="text-sm md:text-base" />
                    </div>
                    <div>
                    <p className="text-[10px] md:text-xs uppercase font-bold opacity-80">Call Us</p>
                    <p className="text-sm md:text-lg font-bold leading-tight">9487509935, 72080 97980</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4 sm:col-span-2 md:col-span-1">
                    <div className="p-3 md:p-4 bg-[#3e3c00]/20 bg-[#3e3c00]/20 rounded-full shrink-0">
                    <FaMapMarkerAlt className="text-sm md:text-base" />
                    </div>
                    <div>
                    <p className="text-[10px] md:text-xs uppercase font-bold opacity-80">Location</p>
                    <p className="text-sm md:text-lg font-bold">Mumbai | Chennai</p>
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