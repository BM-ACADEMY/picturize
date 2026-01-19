import React, { useEffect, useRef, forwardRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// --- Assets ---
import Banner2 from "@/assets/banner2.png"; 
import PopArtSwirl from "@/assets/banner.png"; // Keeping your import
import Pdf from "@/assets/portfolio.pdf"

// --- Icons ---
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaSpinner, FaPaperPlane, FaLightbulb, FaFingerprint, FaEye, FaVrCardboard, FaArrowRight } from 'react-icons/fa';
import { BsStars } from "react-icons/bs"; 
import { PiCubeTransparentBold } from "react-icons/pi"; 

gsap.registerPlugin(ScrollTrigger);

const StackedCards = forwardRef((props, ref) => {
  const componentRef = useRef(null);
  const secondSectionRef = useRef(null);
  
  // --- Refs for Form Animation ---
  const formContainerRef = useRef(null);
  const successContainerRef = useRef(null);
  const buttonRef = useRef(null);

  // --- Form State ---
  const [formState, setFormState] = useState('idle');

  const scrollToNext = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState !== 'idle') return;

    setFormState('submitting');

    gsap.to(buttonRef.current, { 
        width: '60px', 
        borderRadius: '50%',
        duration: 0.4,
        ease: 'power2.inOut'
    });

    setTimeout(() => {
        setFormState('success');
        const tl = gsap.timeline();
        tl.to(formContainerRef.current, { 
            opacity: 0, 
            y: -20, 
            duration: 0.4, 
            display: 'none',
            ease: "power2.in"
        })
        .fromTo(successContainerRef.current,
            { display: 'none', opacity: 0, scale: 0.8 },
            { display: 'flex', opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
    }, 2000);
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
  
  // Data for the Green Section
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
      {/* CSS to hide scrollbar but keep functionality */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Custom Text Stroke Utility */
        .text-stroke-black {
            -webkit-text-stroke: 2px black;
            color: transparent;
        }
        .text-stroke-white {
            -webkit-text-stroke: 2px white;
            color: transparent;
        }
      `}</style>

      <div ref={componentRef}>
        
        {/* ================= STACKED SECTION 1 (Video & VFX) - Z-10 ================= */}
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

        {/* ================= STACKED SECTION 2 - Graphics (Yellow) - Z-20 ================= */}
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

        {/* ================= STACKED SECTION 4 (Contact) - Red - Z-40 ================= */}
        <section 
            className="stack-card h-screen w-full sticky top-0 z-40 bg-[#F50537] text-white overflow-hidden"
            data-header-color="white"
        >
             <div className="absolute -right-20 top-0 h-full w-full md:w-1/2 pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    {[...Array(20)].map((_, i) => (
                        <rect key={i} x={50 - (i * 2)} y={50 - (i * 2)} width={i * 5} height={i * 5} fill="none" stroke="white" strokeWidth="0.2" transform={`rotate(${i * 5} 50 50)`} />
                    ))}
                </svg>
            </div>

            <div className="inner-content w-full h-full relative overflow-y-auto no-scrollbar pb-32">
                <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* Left Column: About & Contact Info */}
                    <div className="space-y-8 md:space-y-12 relative z-10">
                        <div>
                             <div className="flex items-center gap-3 text-[#ffdb4d] uppercase tracking-[0.2em] text-xs font-bold mb-4 lg:mb-6">
                                <span className="w-6 h-[2px] bg-[#ffdb4d]"></span>
                                04. Step Four
                            </div>
                             <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-6 tracking-tighter">About</h2>
                            <p className="text-lg md:text-xl font-medium leading-relaxed opacity-90 mb-6">
                                Picturize, we specialize in crafting compelling brand stories that elevate your products and businesses. From ideation and design to seamless production, we handle every step of the content creation journey with precision and passion.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed opacity-80">
                                Our team is backed by deep expertise across various industries, delivering exceptional results. Whether it's creating stunning visual effects for a movie, video editing for renowned brands, or designing and producing innovative content, we excel in every aspect of 360-degree content production.
                            </p>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-white/20">
                            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-3 bg-white/10 rounded-full group-hover:bg-white group-hover:text-[#F50537] transition-colors"><FaPhoneAlt size={18} /></div>
                                <span className="text-lg">+1 012 3456 789</span>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-3 bg-white/10 rounded-full group-hover:bg-white group-hover:text-[#F50537] transition-colors"><FaEnvelope size={18} /></div>
                                <span className="text-lg">info@picturize.com</span>
                            </div>
                             <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-3 bg-white/10 rounded-full group-hover:bg-white group-hover:text-[#F50537] transition-colors"><FaMapMarkerAlt size={18} /></div>
                                <span className="text-lg">Maharastra | Tamilnadu</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interactive Form */}
                    <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/20 shadow-2xl min-h-[500px] flex items-center justify-center w-full">
                        <div ref={formContainerRef} className="w-full">
                            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold opacity-70">First Name</label>
                                        <input type="text" required className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-2 transition-colors placeholder:text-white/30 text-white" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold opacity-70">Last Name</label>
                                        <input type="text" className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-2 transition-colors placeholder:text-white/30 text-white" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold opacity-70">Email</label>
                                        <input type="email" required className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-2 transition-colors placeholder:text-white/30 text-white" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold opacity-70">Phone Number</label>
                                        <input type="tel" className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-2 transition-colors placeholder:text-white/30 text-white" placeholder="+1 012 3456 789" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs uppercase tracking-widest font-bold opacity-70">Select Subject?</label>
                                    <div className="flex flex-wrap gap-4">
                                        {['General Inquiry', 'Content services', 'Vendor'].map((subject, i) => (
                                            <label key={i} className="flex items-center gap-2 cursor-pointer group">
                                                <input type="radio" name="subject" className="accent-white w-4 h-4" defaultChecked={i===0}/>
                                                <span className="text-sm group-hover:opacity-100 opacity-80 transition-opacity">{subject}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold opacity-70">Message</label>
                                    <textarea rows="3" className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-2 transition-colors placeholder:text-white/30 text-white resize-none" placeholder="Write your message.."></textarea>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button 
                                            ref={buttonRef}
                                            disabled={formState !== 'idle'}
                                            type="submit"
                                            className={`
                                                relative h-14 bg-black text-white rounded-lg font-bold uppercase tracking-wider 
                                                hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-lg
                                                flex items-center justify-center overflow-hidden
                                                ${formState === 'idle' ? 'px-8 w-auto' : 'w-14 px-0 cursor-default bg-black/80 hover:bg-black/80 hover:scale-100'}
                                            `}
                                    >
                                            {formState === 'idle' && (
                                                <span className="flex items-center gap-2">Send Message <FaPaperPlane className="text-xs"/></span>
                                            )}
                                            {formState === 'submitting' && (
                                                <FaSpinner className="animate-spin text-white text-xl" />
                                            )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div ref={successContainerRef} className="hidden flex-col items-center justify-center text-center space-y-6 w-full h-full absolute inset-0 p-10">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <FaCheckCircle className="text-[#2a880e] text-5xl" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black uppercase tracking-tight mb-2">Message Sent!</h3>
                                <p className="opacity-80 max-w-xs mx-auto">Thank you for contacting Picturize. We will get back to you shortly.</p>
                            </div>
                            <button 
                                onClick={() => {
                                    gsap.to(successContainerRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
                                            setFormState('idle');
                                            gsap.set(successContainerRef.current, { display: 'none' });
                                            gsap.set(formContainerRef.current, { display: 'block', y: 0, opacity: 1 });
                                            gsap.set(buttonRef.current, { width: 'auto', borderRadius: '0.5rem' }); 
                                    }});
                                }}
                                className="mt-4 text-xs font-bold uppercase tracking-widest border-b border-white/50 hover:border-white hover:opacity-100 opacity-70 transition-all"
                            >
                                Send Another
                            </button>
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