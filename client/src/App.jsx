import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
// import Header from './components/Header/Header';
import Home from '@/components/Pages/Home';

const App = () => {
  
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="font-sans antialiased">
      {/* <Header /> */}
      <main>
        <Home />
      </main>
    </div>
  );
};

export default App;