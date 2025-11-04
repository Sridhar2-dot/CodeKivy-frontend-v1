import React, { useState } from 'react';
import { Search, PlayCircle, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  {
    id: 1,
    name: 'Find Your Course',
    description: 'Browse our catalog of expert-led courses on every topic.',
    icon: Search,
    color: 'from-orange-500 to-orange-600',
    glow: 'shadow-orange-500/50',
    particles: 3,
  },
  {
    id: 2,
    name: 'Learn By Doing',
    description: 'Watch lessons, complete projects, and get instant feedback.',
    icon: PlayCircle,
    color: 'from-orange-400 to-orange-600',
    glow: 'shadow-orange-500/50',
    particles: 4,
  },
  {
    id: 3,
    name: 'Get Certified',
    description: 'Receive your certificate and showcase your new skills.',
    icon: GraduationCap,
    color: 'from-orange-500 to-orange-700',
    glow: 'shadow-orange-500/50',
    particles: 5,
  },
];

const HowItWorks = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden py-24 sm:py-32">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-transparent to-blue-500/5 animate-pulse" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header with Stagger Animation */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 mb-4 animate-[slideDown_0.6s_ease-out]">
            <Sparkles className="w-4 h-4 text-orange-500 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-semibold text-orange-500">A Clear Path to Success</span>
          </div>
          
          <h2 className="mt-2 text-5xl md:text-6xl font-bold tracking-tight text-white animate-[slideUp_0.8s_ease-out_0.2s_both]">
            How It{' '}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-transparent bg-clip-text animate-gradient">
              Works
            </span>
          </h2>
          
          <p className="mt-6 text-lg text-gray-400 animate-[fadeIn_1s_ease-out_0.4s_both]">
            Three simple steps to transform your learning journey
          </p>
        </div>

        {/* Steps Grid with Advanced Animations */}
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredCard === step.id;
            const isActive = activeStep === step.id;
            
            return (
              <div
                key={step.id}
                className="relative group animate-[slideUp_0.8s_ease-out_both]"
                style={{ animationDelay: `${0.6 + index * 0.2}s` }}
                onMouseEnter={() => setHoveredCard(step.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              >
                {/* Connection Line (for desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-8 h-0.5 bg-gradient-to-r from-gray-700 to-transparent z-0">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-purple-500 origin-left transition-transform duration-1000"
                      style={{ 
                        transform: hoveredCard >= step.id ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    ></div>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`relative flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-gray-950 to-gray-900 border transition-all duration-500 cursor-pointer overflow-hidden ${
                    isHovered || isActive
                      ? 'border-orange-500/60 shadow-2xl shadow-orange-500/20 -translate-y-2'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                  style={{
                    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-500 ${
                      isHovered || isActive ? 'opacity-10' : ''
                    }`}
                  ></div>

                  {/* Particles */}
                  {(isHovered || isActive) && (
                    <>
                      {[...Array(step.particles)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-orange-500 rounded-full animate-[float_2s_ease-in-out_infinite]"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 40}%`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        ></div>
                      ))}
                    </>
                  )}

                 

                  {/* Icon Container */}
                  <div className="relative">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} p-0.5 transition-all duration-500 ${
                        isHovered || isActive ? `shadow-2xl ${step.glow} scale-110 rotate-6` : 'scale-100 rotate-0'
                      }`}
                      style={{
                        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-950">
                        <Icon
                          className="h-10 w-10 text-white transition-all duration-500"
                          style={{
                            transform: isHovered || isActive ? 'scale(1.2) rotate(-6deg)' : 'scale(1) rotate(0deg)',
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Pulsing Ring */}
                    {(isHovered || isActive) && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-orange-500 animate-ping opacity-75"></div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="relative mt-8 text-xl font-bold text-white transition-colors duration-300">
                    {step.name}
                  </h3>
                  
                  <p className="relative mt-3 text-base text-gray-400 leading-relaxed transition-colors duration-300">
                    {step.description}
                  </p>



                  {/* Bottom Glow */}
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r ${step.color} blur-xl transition-opacity duration-500 ${
                      isHovered || isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-[fadeIn_1s_ease-out_1.4s_both]">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideRight {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;