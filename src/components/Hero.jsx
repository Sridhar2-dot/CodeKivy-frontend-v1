import React, { useState } from 'react';
import { ChevronRight, Play, Sparkles, Mic } from 'lucide-react';
import bgVideo from '../assets/bg_orange.mp4';
import { Link } from 'react-router-dom';
import { VoiceAgentOverlay } from './VoiceAgentOverlay';

const Hero = () => {

  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="object-cover w-full h-full"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        {/* Orange glow tint overlay */}
        <div className="absolute inset-0 bg-orange-500/20 mix-blend-overlay"></div>
        
        {/* Enhanced Gradient Overlays for seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black"></div>
        
        {/* Curved bottom fade for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/95 to-transparent"></div>
        
        {/* Side vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

        {/* Noise texture for premium feel (optional) */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge/Tag with shimmer effect */}
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-700 overflow-hidden">
            <Sparkles className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-300">AI-Powered Learning Platform</span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
            <span className="block text-white mb-2">Master the</span>
            <span className="block bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
            Future with AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
            Transform your career with cutting-edge courses in Python, Machine Learning and AI.
            Learn from industry experts and build real-world projects.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-top-10 duration-700 delay-300">
            <Link
              to="/courses"
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 
                       text-white font-semibold rounded-full overflow-hidden
                       shadow-lg shadow-orange-500/25 hover:shadow-2xl hover:shadow-orange-500/50
                       transition-all duration-300 hover:scale-105 active:scale-95
                       flex items-center gap-2 w-full sm:w-auto justify-center
                       before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-400 before:to-orange-500 
                       before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
            >
              <span className="relative z-10">Start Learning Now</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full blur-xl bg-orange-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </Link>

            <button
              onClick={() => setIsVoiceAgentOpen(true)}
              className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm
                       text-white font-semibold rounded-full overflow-hidden
                       transition-all duration-300 hover:scale-105 active:scale-95
                       flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-full p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-[spin_3s_linear_infinite]"></div>
                <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-sm"></div>
              </div>
              
              {/* Static border for non-hover state */}
              <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-transparent transition-colors duration-500"></div>
              
              <Mic className="h-5 w-5 relative z-10" />
              <span className="relative z-10">KivyBot</span>
            </button>
          </div>

          {/* Stats/Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">800+</div>
              <div className="text-sm text-gray-400">Active Students</div>
            </div>
            <div className="text-center border-x border-gray-700">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">5+</div>
              <div className="text-sm text-gray-400">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">4+</div>
              <div className="text-sm text-gray-400">States</div>
            </div>
          </div>
        </div>
      </div>

      {isVoiceAgentOpen && <VoiceAgentOverlay onClose={() => setIsVoiceAgentOpen(false)} />}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>

    </div>
  );
};

export default Hero;
