import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import Banner from "@/assets/banner.png";

// Import components
import StackedCards from './StackedCards';
import Footer from '../Header/Footer';
import Homeimage from "@/assets/home.png"

const Home = () => {
  const heroRef = useRef(null);
  const stackSectionRef = useRef(null);

  // Framer Motion Parallax for the main card
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // 1. Heading Animation
      tl.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      })
      // 2. Subtext Animation (Added here)
      .from(".subtext-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
      }, "-=0.6") // Starts slightly before heading finishes
      // 3. Main Card Animation
      .from(".hero-card", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
      }, "-=0.4");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="w-full bg-[#f4f4f4] text-black relative overflow-hidden">
      
      {/* ================= HERO SECTION ================= */}
      {/* pt-16 for mobile, pt-5 for desktop to remove top gap */}
      <section className="min-h-screen w-full flex flex-col items-center pt-16 md:pt-5 px-4 relative z-10">
        
        {/* Banner Image */}
        <div className="absolute -top-28 -left-10 md:left-0 w-[50vw] md:w-[35vw] opacity-80 pointer-events-none mix-blend-multiply">
           <motion.img 
             src={Banner} 
             alt="Abstract"
             className="w-full h-auto object-contain"
           />
        </div>

        {/* --- MAIN HEADING --- */}
        <div className="flex flex-col items-center w-full max-w-6xl mb-8 relative">
          <div className="overflow-hidden w-full flex justify-center">
             <h1 className="hero-line text-[8vw] md:text-[5vw] leading-[0.9] font-black uppercase tracking-tighter">
                Visualize
             </h1>
          </div>
          
          <div className="overflow-hidden w-full flex justify-center">
             <h1 className="hero-line text-[8vw] md:text-[5vw] leading-[0.9] font-black uppercase tracking-tighter flex flex-wrap gap-3 justify-center">
               <span>Your</span>
               <span className="bg-[#ffdb4d] px-2 md:px-4 inline-block text-black">
                 Brand's
               </span>
             </h1>
          </div>

          <div className="overflow-hidden pt-1 w-full flex justify-center">
             <h1 className="hero-line text-[8vw] md:text-[5vw] leading-[0.9] font-black uppercase tracking-tighter">
               <span className="bg-[#ffdb4d] px-2 md:px-4 inline-block">
                 Story
               </span>
             </h1>
          </div>
        </div>

        {/* --- ANIMATED SUBTEXT --- */}
        <div className="hero-subtext flex flex-wrap justify-center gap-3 md:gap-6 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-10 opacity-80 text-center">
          <span className="subtext-item">Branding</span> 
          <span className="subtext-item opacity-40">|</span> 
          <span className="subtext-item">Videos</span> 
          <span className="subtext-item opacity-40">|</span> 
          <span className="subtext-item">Animation</span> 
          <span className="subtext-item opacity-40">|</span> 
          <span className="subtext-item">Graphics Design</span> 
          <span className="subtext-item opacity-40">|</span> 
          <span className="subtext-item">Visual Effects</span>
        </div>

        {/* Hero Card Image */}
        <motion.div 
            style={{ y }}
            className="hero-card relative w-full max-w-4xl h-[45vh] md:h-[55vh] rounded-3xl overflow-hidden shadow-2xl mb-24"
        >
            <img 
              src={Homeimage}
              alt="Brand Story" 
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-6 md:p-10">
                <div className="w-10 h-10 bg-[#e8fc7e] rounded-full flex items-center justify-center">
                   <div className="w-3 h-3 bg-black rounded-full"></div>
                </div>
                
                <div className="flex justify-between items-end">
                    <h2 className="text-5xl md:text-6xl font-serif text-[#e8fc7e] leading-none">
                        Launch <br/> <i className="font-serif italic">day</i>
                    </h2>
                    {/* <button className="hidden md:block border border-[#e8fc7e] text-[#e8fc7e] px-5 py-2 rounded-full hover:bg-[#e8fc7e] hover:text-black transition-colors uppercase text-[10px] tracking-wider">
                        Learn More
                    </button> */}
                </div>
            </div>
        </motion.div>
      </section>

      {/* ================= STACKED SECTION ================= */}
      <StackedCards ref={stackSectionRef} />

      <div className="relative z-[100] bg-black w-full shadow-[0_-20px_50px_rgba(0,0,0,0.3)]"> 
         <Footer />
      </div>

    </div>
  );
};

export default Home;