import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import Banner from "@/assets/banner.png"


// Import the new component
import StackedCards from './StackedCards';
import Footer from '../Header/Footer';

const Home = () => {
  const heroRef = useRef(null);
  
  // Ref to target the StackedCards component for scrolling
  const stackSectionRef = useRef(null);

  // Framer Motion Parallax
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Scroll Handler
  const scrollToStack = () => {
    stackSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only Hero Animations here
      const tl = gsap.timeline();
      
      tl.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      })
      .from(".hero-card", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
      }, "-=0.5");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="w-full bg-[#f4f4f4] text-black relative overflow-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen w-full flex flex-col items-center pt-32 px-4 relative z-10">
        
        {/* Banner Image with Rotate Animation */}
        <div className="absolute top-0 -left-10 md:left-0 w-[50vw] md:w-[35vw] opacity-80 pointer-events-none mix-blend-multiply">
           <motion.img 
             src={Banner} 
             alt="Abstract Colorful Halftone"
             className="w-full h-auto object-contain"
           />
        </div>

        {/* --- MAIN HEADING (CENTERED) --- */}
        {/* Changed 'items-start' to 'items-center' to center the container */}
        <div className="flex flex-col items-center w-full max-w-6xl mb-12 relative">
          
          {/* Line 1: Visualize */}
          {/* Added 'w-full flex justify-center' to center the text content */}
          <div className="overflow-hidden w-full flex justify-center">
             <h1 className="hero-line text-[10vw] md:text-[6vw] leading-[0.9] font-black uppercase tracking-tighter">
               Visualize
             </h1>
          </div>
          
          {/* Line 2: Your Brand's */}
          {/* Removed 'md:' prefix from justify-center so it centers on mobile too */}
          <div className="overflow-hidden w-full flex justify-center">
             <h1 className="hero-line text-[10vw] md:text-[6vw] leading-[0.9] font-black uppercase tracking-tighter flex flex-wrap gap-4 justify-center">
               <span>Your</span>
               <span className="bg-[#ffdb4d] px-2 md:px-6 inline-block text-black">
                 Brand's
               </span>
             </h1>
          </div>

          {/* Line 3: Story */}
          {/* Removed 'md:' prefix from justify-center */}
          <div className="overflow-hidden pt-2 w-full flex justify-center">
             <h1 className="hero-line text-[10vw] md:text-[6vw] leading-[0.9] font-black uppercase tracking-tighter">
               <span className="bg-[#ffdb4d] px-2 md:px-6 inline-block">
                 Story
               </span>
             </h1>
          </div>
        </div>

        {/* Subtext / Services */}
        <div className="hero-subtext flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm font-bold tracking-widest uppercase mb-12 opacity-80 text-center">
          <span>Branding</span> | 
          <span>Videos</span> | 
          <span>Animation</span> | 
          <span>Graphics Design</span> | 
          <span>Visual Effects</span>
        </div>

        {/* Hero Card Image */}
        <motion.div 
            style={{ y }}
            className="hero-card relative w-full max-w-4xl h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl mb-24"
        >
            <img 
              src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2669&auto=format&fit=crop" 
              alt="Brand Story" 
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-8 md:p-12">
                <div className="w-12 h-12 bg-[#e8fc7e] rounded-full flex items-center justify-center">
                   <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                
                <div className="flex justify-between items-end">
                    <h2 className="text-6xl md:text-7xl font-serif text-[#e8fc7e] leading-none">
                        Launch <br/> <i className="font-serif italic">day</i>
                    </h2>
                    <button className="hidden md:block border border-[#e8fc7e] text-[#e8fc7e] px-6 py-2 rounded-full hover:bg-[#e8fc7e] hover:text-black transition-colors uppercase text-xs tracking-wider">
                        Learn More
                    </button>
                </div>
            </div>
        </motion.div>
      </section>

      {/* ================= IMPORTED STACKED SECTION ================= */}
      <StackedCards ref={stackSectionRef} />
<div className="relative z-[100] bg-black w-full shadow-[0_-20px_50px_rgba(0,0,0,0.3)]"> 
   <Footer />
</div>

    </div>
  );
};

export default Home;