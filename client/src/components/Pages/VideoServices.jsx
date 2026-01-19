import React, { useEffect, useRef, forwardRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Banner2 from "@/assets/banner2.png"; 
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaSpinner, FaPaperPlane, FaArrowRight, FaBezierCurve, FaLayerGroup, FaMagic, FaFilm } from 'react-icons/fa';

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
            if (color) gsap.to(headerSelector, { color: color, duration: 0.3, overwrite: true });
          },
          onEnterBack: () => {
            const color = card.dataset.headerColor;
            if (color) gsap.to(headerSelector, { color: color, duration: 0.3, overwrite: true });
          }
        });

        if (i < cards.length - 1) { 
            gsap.to(card.querySelector('.inner-content'), {
                scale: 0.95, 
                opacity: 0.5,
                filter: "blur(5px)",
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
    { title: "Video Production", icon: <FaFilm /> },
    { title: "Motion Graphics", icon: <FaBezierCurve /> },
    { title: "VFX Compositing", icon: <FaMagic /> },
    { title: "Architectural Viz", icon: <FaLayerGroup /> },
    { title: "Explainer Videos", icon: <FaFilm /> },
    { title: "Post-Production", icon: <FaMagic /> },
  ];

  const graphicServices = [
    "Social Media Design", "Product Retouching", "LED & Billboards",
    "Web Creative Content", "Package Design", "Magazines & Flyers"
  ];

  return (
    <div ref={ref} className="w-full relative bg-black font-sans selection:bg-white selection:text-black">
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .text-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.2); color: transparent; transition: 0.3s; }
        .group:hover .text-outline { -webkit-text-stroke: 1px #ffdb4d; color: #ffdb4d; }
      `}</style>
      
      {/* Cinematic Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
         <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)'/></svg>
      </div>

      <div ref={componentRef}>
        
        {/* ================= SECTION 1: VIDEO & VFX (Teal - Unchanged) ================= */}
        <section 
            className="stack-card h-screen w-full sticky top-0 z-10 bg-[#1A6E66] text-white overflow-hidden"
            data-header-color="white" 
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50"></div>
            <img 
                src={Banner2} 
                alt="Decoration"
                className="absolute -bottom-[20%] -left-[10%] w-[60vw] opacity-10 mix-blend-soft-light animate-[pulse_8s_infinite] pointer-events-none"
            />

            <div className="inner-content w-full h-full flex flex-col relative z-10">
                <div className="container mx-auto px-6 h-full grid grid-cols-1 lg:grid-cols-12 gap-12 pt-24 pb-12">
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 text-[#ffdb4d] text-xs font-bold tracking-[0.3em] uppercase mb-8">
                                <span className="w-8 h-[1px] bg-[#ffdb4d]"></span> 01. Capabilities
                            </div>
                            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                                Visual <br/>
                                <span className="text-[#ffdb4d]">Impact</span>
                            </h2>
                            <p className="text-white/60 text-lg max-w-sm leading-relaxed border-l border-white/20 pl-6">
                                We engineer spatial experiences. From high-end commercials to complex architectural visualization, we bridge the gap between imagination and reality.
                            </p>
                        </div>
                        <div className="hidden lg:block">
                            <button onClick={scrollToNext} className="group flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
                                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-[#ffdb4d] group-hover:text-[#ffdb4d] transition-all">
                                    <FaArrowRight className="rotate-90" />
                                </div>
                                Scroll Down
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="space-y-2">
                            {services.map((item, index) => (
                                <div key={index} className="group relative flex items-center justify-between py-5 border-b border-white/10 hover:border-[#ffdb4d] transition-all duration-300 cursor-pointer hover:pl-8">
                                    <div className="flex items-baseline gap-6">
                                        <span className="text-xs font-mono text-[#ffdb4d]/50 group-hover:text-[#ffdb4d]">0{index + 1}</span>
                                        <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white/40 group-hover:text-white transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ffdb4d] text-2xl">
                                        <FaArrowRight className="-rotate-45" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ================= SECTION 2: ABOUT & CONTACT (Red - Unchanged) ================= */}
        <section 
            ref={secondSectionRef}
            className="stack-card h-screen w-full sticky top-0 z-20 bg-[#D9042B] text-white overflow-hidden"
            data-header-color="white"
        >
             <div className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="white" strokeWidth="0.5" />
                    <path d="M0 100 C 30 10 60 10 100 100 Z" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5"/>
                    <path d="M0 100 C 40 20 70 20 100 100 Z" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                </svg>
            </div>

            <div className="inner-content w-full h-full relative overflow-y-auto no-scrollbar">
                <div className="container mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    <div className="relative z-10 pt-10">
                        <div className="flex items-center gap-4 text-black/40 text-xs font-bold tracking-[0.3em] uppercase mb-8">
                            <span className="w-8 h-[1px] bg-black/40"></span> 02. The Studio
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase mb-10 tracking-tighter leading-none">
                            We Create <br/> <span className="text-black/20">Stories.</span>
                        </h2>
                        <div className="space-y-6 text-lg md:text-xl font-medium leading-relaxed max-w-md opacity-90">
                            <p>Picturize specializes in crafting compelling brand stories. From ideation to production, we handle the journey with precision.</p>
                        </div>
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <a href="#" className="flex items-center gap-4 p-4 border border-white/20 rounded-xl hover:bg-white hover:text-[#D9042B] transition-all group">
                                <div className="p-2 bg-white/10 rounded-full group-hover:bg-[#D9042B]/10 group-hover:text-[#D9042B]"><FaPhoneAlt /></div>
                                <span className="font-bold">+1 012 3456 789</span>
                            </a>
                            <a href="#" className="flex items-center gap-4 p-4 border border-white/20 rounded-xl hover:bg-white hover:text-[#D9042B] transition-all group">
                                <div className="p-2 bg-white/10 rounded-full group-hover:bg-[#D9042B]/10 group-hover:text-[#D9042B]"><FaEnvelope /></div>
                                <span className="font-bold">info@picturize.com</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative z-10 w-full">
                        <div ref={formContainerRef} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
                            <h3 className="text-2xl font-bold uppercase mb-8 tracking-wide">Start a Project</h3>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="group">
                                        <input type="text" required placeholder=" " className="peer w-full bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white transition-colors" />
                                        <label className="absolute left-0 -top-3 text-xs uppercase font-bold text-white/50 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/30 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white transition-all pointer-events-none">First Name</label>
                                    </div>
                                    <div className="relative">
                                        <input type="text" placeholder=" " className="peer w-full bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white transition-colors" />
                                        <label className="absolute left-0 -top-3 text-xs uppercase font-bold text-white/50 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/30 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white transition-all pointer-events-none">Last Name</label>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input type="email" required placeholder=" " className="peer w-full bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white transition-colors" />
                                    <label className="absolute left-0 -top-3 text-xs uppercase font-bold text-white/50 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/30 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white transition-all pointer-events-none">Email Address</label>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-bold text-white/50 mb-4">I'm interested in...</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Production', 'Services', 'Partnership'].map((tag) => (
                                            <label key={tag} className="cursor-pointer">
                                                <input type="radio" name="interest" className="peer hidden" />
                                                <span className="px-4 py-2 border border-white/20 rounded-full text-sm hover:bg-white/10 peer-checked:bg-white peer-checked:text-[#D9042B] transition-all">{tag}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative pt-4">
                                     <button 
                                        ref={buttonRef}
                                        disabled={formState !== 'idle'}
                                        type="submit"
                                        className={`
                                            relative h-16 bg-white text-[#D9042B] rounded-full font-black uppercase tracking-wider 
                                            hover:scale-[1.02] transition-all duration-300 shadow-xl
                                            flex items-center justify-center overflow-hidden
                                            ${formState === 'idle' ? 'w-full' : 'w-16 mx-auto cursor-default'}
                                        `}
                                    >
                                        {formState === 'idle' && <span className="flex items-center gap-3">Send Message <FaArrowRight /></span>}
                                        {formState === 'submitting' && <FaSpinner className="animate-spin text-xl" />}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div ref={successContainerRef} className="hidden absolute inset-0 bg-[#D9042B] border border-white/10 rounded-3xl flex-col items-center justify-center text-center z-20">
                            <FaCheckCircle className="text-white text-6xl mb-6 animate-bounce" />
                            <h3 className="text-4xl font-black uppercase mb-2">Received</h3>
                            <p className="opacity-80 mb-8">We'll be in touch shortly.</p>
                            <button onClick={() => {
                                    gsap.to(successContainerRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
                                        setFormState('idle');
                                        gsap.set(successContainerRef.current, { display: 'none' });
                                        gsap.set(formContainerRef.current, { display: 'block', y: 0, opacity: 1 });
                                        gsap.set(buttonRef.current, { width: '100%', borderRadius: '9999px' }); 
                                    }});
                                }} className="text-sm font-bold border-b border-white pb-1">Send Another</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ================= SECTION 3: GRAPHICS & PRINT (NEW DESIGN) ================= */}
        <section 
            className="stack-card h-screen w-full sticky top-0 z-30 bg-[#FFF500] text-black overflow-hidden"
            data-header-color="black"
        >
            {/* Background Map Effect */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                 <svg className="w-full h-full" width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="inner-content w-full h-full relative overflow-y-auto no-scrollbar z-10 flex flex-col">
                
                {/* Header Area */}
                <div className="container mx-auto px-6 pt-16 md:pt-20 pb-8 flex flex-col md:flex-row justify-between items-end border-b border-black/10">
                    <div>
                        <div className="flex items-center gap-3 text-black uppercase tracking-[0.3em] text-xs font-bold mb-4">
                            <span className="w-8 h-[2px] bg-black"></span>
                            03. Services
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                            Graphics <br/> & Print
                        </h2>
                    </div>
                    <div className="hidden md:block mb-4">
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
                    </div>
                </div>

                {/* "Pins" Grid Layout */}
                <div className="container mx-auto px-6 py-12 flex-grow flex items-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6 w-full">
                         {graphicServices.map((item, index) => (
                            <div key={index} className="group relative flex flex-col items-center justify-center text-center cursor-pointer">
                                
                                {/* Icon Container with Hover Animation */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-black/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 blur-md"></div>
                                    <div className="relative z-10 text-4xl md:text-5xl text-black group-hover:-translate-y-3 transition-transform duration-300 ease-back-out">
                                        <FaMapMarkerAlt />
                                    </div>
                                    {/* Shadow */}
                                    <div className="w-8 h-1 bg-black/20 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2 blur-[2px] group-hover:scale-75 group-hover:opacity-50 transition-all duration-300"></div>
                                </div>
                                
                                {/* Text */}
                                <h3 className="text-sm md:text-lg font-bold uppercase tracking-wider max-w-[150px] leading-tight group-hover:scale-105 transition-transform duration-300">
                                    {item}
                                </h3>
                                <div className="w-0 group-hover:w-8 h-[2px] bg-black mt-3 transition-all duration-300"></div>
                            </div>
                         ))}
                    </div>
                </div>

                {/* Scrolling Marquee Footer */}
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

      </div>
    </div>
  );
});

StackedCards.displayName = "StackedCards";
export default StackedCards;