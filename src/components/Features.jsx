import React, { useState, useEffect } from 'react';
import {
  Video, DollarSign, Code, Briefcase, FileText, MessageCircle,
  ChevronLeft, ChevronRight // 1. ADDED ICONS
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OrangeGlowImage from '../assets/OrangeGlow.png';

// === Updated Features with Darker Overlay ===
const features = [
  {
    name: 'Live Online Classes',
    description:
      'Engage in interactive, real-time sessions with expert instructors who guide you through every concept with personalized attention.',
    icon: Video,
    bgGradient: 'from-black/70 via-black/60 to-black/70', // 🔧 darker overlay
    iconBg: 'bg-gradient-to-br from-purple-500 to-blue-500',
    image: 'https://images.unsplash.com/photo-1606326608693-b0f8d7f7e4b9?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Affordable Prices',
    description:
      'Premium quality education at unbeatable prices. Invest in your future without breaking the bank with our flexible payment plans.',
    icon: DollarSign,
    bgGradient: 'from-black/70 via-black/60 to-black/70',
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1556741533-f6acd6471e86?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Real-time Projects',
    description:
      'Build production-ready applications that mirror real industry scenarios. Gain practical experience that employers actively seek.',
    icon: Code,
    bgGradient: 'from-black/70 via-black/60 to-black/70',
    iconBg: 'bg-gradient-to-br from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Job-Ready Curriculum',
    description:
      'Master in-demand skills with our industry-aligned syllabus. Every lesson is designed to make you immediately employable.',
    icon: Briefcase,
    bgGradient: 'from-black/7img/70 via-black/60 to-black/70',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Weekly Assignments',
    description:
      'Reinforce your learning with carefully crafted weekly challenges. Track your progress and build a strong portfolio simultaneously.',
    icon: FileText,
    bgGradient: 'from-black/70 via-black/60 to-black/70',
    iconBg: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Doubt Clear Sessions',
    description:
      'Never stay stuck. Get instant clarification from mentors in dedicated doubt-solving sessions designed for your success.',
    icon: MessageCircle,
    bgGradient: 'from-black/70 via-black/60 to-black/70',
    iconBg: 'bg-gradient-to-br from-pink-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  },
];

const Features = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [centerIndex, setCenterIndex] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // 2. ADDED MANUAL NAVIGATION HANDLERS
  const nextCard = () => {
    setCenterIndex((prev) => (prev + 1) % features.length);
  };

  const prevCard = () => {
    setCenterIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const getCardStyle = (index) => {
    const total = features.length;
    const relative = (index - centerIndex + total) % total;
    let normalized = relative;
    if (normalized > total / 2) normalized -= total;

    const isCenter = normalized === 0;
    const isLeft = normalized === -1 || normalized === total - 1;
    const isRight = normalized === 1;
    const isVisible = Math.abs(normalized) <= 1;

    return { isCenter, isLeft, isRight, isVisible };
  };

  return (
    <motion.div
      className="relative z-10 pt-64 sm:pt-72 pb-24 sm:pb-32 overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Orange Glow */}
      <img
        src={OrangeGlowImage}
        alt="Orange Glow"
        className="absolute top-0 left-1/2 z-0 max-w-full h-auto opacity-70 -translate-x-1/2 pointer-events-none"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl lg:text-center relative z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-base font-semibold leading-7 text-orange-500">
            Why Choose Code Kivy?
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to master your craft
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Experience world-class learning with interactive sessions, hands-on projects,
            and continuous support designed to make you industry-ready.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative z-10 mt-16 sm:mt-20 lg:mt-24">
          <div
            // 3. RESPONSIVE HEIGHT
            className="relative h-[450px] sm:h-[500px] flex items-center justify-center"
            // --- HANDLERS REMOVED FROM HERE ---
          >
            <AnimatePresence mode="sync">
              {features.map((feature, i) => {
                const { isCenter, isLeft, isRight, isVisible } = getCardStyle(i);
                if (!isVisible) return null;

                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    // --- HANDLERS ADDED HERE ---
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    // ---
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      // 3. RESPONSIVE X-POSITION
                      x: isCenter ? 0 : isLeft ? '-80%' : '80%',
                      scale: isCenter ? 1 : 0.7,
                      opacity: isCenter ? 1 : 0.5,
                      zIndex: isCenter ? 30 : isLeft ? 10 : 20,
                      rotateY: isCenter ? 0 : isLeft ? 15 : -15,
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.7 }}
                    style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  >
                    <motion.div
                      // 3. RESPONSIVE CARD SIZE
                      className={`relative rounded-3xl overflow-hidden ${
                        isCenter
                          ? 'w-[320px] h-[400px] sm:w-[400px] sm:h-[450px]' // smaller on mobile
                          : 'w-[240px] h-[300px] sm:w-[280px] sm:h-[350px]' // smaller on mobile
                      } transition-all duration-700`}
                      whileHover={!isCenter ? { scale: 0.75 } : {}}
                      onClick={() => !isCenter && setCenterIndex(i)}
                    >
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                        style={{
                          backgroundImage: `url(${feature.image})`,
                        }}
                      />

                      {/* 🔧 Darker Gradient Overlay for Readability */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-b ${feature.bgGradient} opacity-90`}
                      />

                      {/* Card Content */}
                      <div
                        className={`relative h-full backdrop-blur-[2px] border-2 transition-all duration-500 ${
                          isCenter
                            ? 'border-orange-500/50 shadow-2xl shadow-orange-500/20'
                            : 'border-gray-700/50'
                        } rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-white`} // 3. RESPONSIVE PADDING
                      >
                        {/* Icon */}
                        <motion.div
                          // 3. RESPONSIVE ICON BG
                          className={`flex items-center justify-center rounded-2xl ${feature.iconBg} h-12 w-12 sm:h-16 sm:w-16`}
                          animate={
                            isCenter
                              ? { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }
                              : {}
                          }
                          transition={{
                            duration: 2,
                            repeat: isCenter ? Infinity : 0,
                            ease: 'easeInOut',
                          }}
                        >
                          {/* 3. RESPONSIVE ICON SIZE */}
                          <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        </motion.div>

                        {/* Text */}
                        <div className="flex-1 mt-6">
                          <h3
                            // 3. RESPONSIVE TEXT
                            className={`font-bold leading-tight ${
                              isCenter ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                            }`}
                          >
                            {feature.name}
                          </h3>
                          <motion.p
                            // 3. RESPONSIVE TEXT
                            className={`mt-4 text-gray-100 ${
                              isCenter ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                            }`}
                            animate={isCenter ? { opacity: 1 } : { opacity: 0.8 }}
                          >
                            {feature.description}
                          </motion.p>
                        </div>

                        {/* Bottom Accent */}
                        {isCenter && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.5 }}
                            className="h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-6"
                          />
                        )}
                      </div>

                      {/* Shine Effect */}
                      {isCenter && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* 4. MODIFIED: Navigation Dots + Arrows */}
          <div className="flex justify-center items-center gap-4 mt-12">
            
            {/* Left Arrow */}
            <motion.button
              onClick={prevCard}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full"
              whileHover={{ scale: 1.2, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex justify-center gap-2">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCenterIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    centerIndex === index ? 'w-8 bg-orange-500' : 'w-2 bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <motion.button
              onClick={nextCard}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full"
              whileHover={{ scale: 1.2, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Features;
