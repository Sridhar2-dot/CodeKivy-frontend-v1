// src/App.jsx

import React, { useEffect } from 'react'; // <-- 1. IMPORT useEffect
import Lenis from '@studio-freight/lenis'; // <-- 1. IMPORT LENIS
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
// 2. IMPORT useLocation
import { Route, Routes, useLocation } from 'react-router-dom';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {

  // 3. GET THE CURRENT PAGE'S PATH
  const { pathname } = useLocation();

  // Lenis (smooth scroll) setup
  useEffect(() => {
    // 3. Create a new Lenis instance
    const lenis = new Lenis();

    // 4. Define a function to run on every animation frame
    function raf(time) {
      lenis.raf(time); // Update Lenis
      requestAnimationFrame(raf); // Keep the loop going
    }

    // 5. Start the animation loop
    requestAnimationFrame(raf);

    // 6. Cleanup function to run when the component unmounts
    return () => {
      lenis.destroy(); // Destroy the Lenis instance
    };
  }, []); // The empty array [] means this runs only once on mount

  // 4. ADD THIS EFFECT FOR SCROLL-TO-TOP
  // This will run every time the `pathname` changes
  useEffect(() => {
    // We use document.documentElement.scrollTo for broad compatibility,
    // including with smooth scroll libraries like Lenis.
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "instant" to snap to top, not smooth-scroll
    });
  }, [pathname]); // The key is this dependency array!

  // 7. Your existing JSX (no changes here)
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-950 text-white antialiased">
      <Navbar />

      <main className="flex-grow">
        {/* The Routes component wraps all your page routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;