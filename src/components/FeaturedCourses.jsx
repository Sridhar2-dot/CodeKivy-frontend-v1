import React, { useState } from 'react';
import { Clock, BarChart3, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

// Import the OR image
import orImage from '../assets/or.png';

// Course images - Using high-quality placeholder images
const courseImages = {
  pythonBasics: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80',
  advancedPython: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
  machineLearning: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80'
};

// Updated courses data
const courses = [
  {
    id: 1,
    title: 'Python Basic',
    level: 'Beginner',
    duration: '20 Days',
    href: '#',
    image: courseImages.pythonBasics,
    description: 'Start your coding journey with Python. Learn fundamental concepts, syntax, and build your first programs with hands-on projects.',
    students: '2.5k+',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Python Advance',
    level: 'Intermediate',
    duration: '40 Days',
    href: '#',
    image: courseImages.advancedPython,
    description: 'Master advanced Python concepts including OOP, decorators, generators, and asynchronous programming for professional development.',
    students: '1.8k+',
    rating: 4.9,
  },
  {
    id: 3,
    title: 'Machine Learning Internship',
    level: 'Advanced',
    duration: '60 Days',
    href: '#',
    image: courseImages.machineLearning,
    description: 'Dive deep into ML algorithms, neural networks, and real-world projects. Build predictive models and deploy AI solutions.',
    students: '3.2k+',
    rating: 5.0,
  },
];

const FeaturedCourses = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="relative py-16 sm:py-20 md:py-24 bg-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5 animate-pulse" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }}></div>

      {/* OR IMAGE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] z-10 pointer-events-none opacity-90">
        <img
          src={orImage}
          alt="Or separator"
          className="w-full h-auto animate-[fadeIn_1s_ease-out]"
        />
      </div>

      {/* Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center lg:text-center pt-16 sm:pt-20 md:pt-24 animate-[slideUp_0.8s_ease-out_both]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 mb-4 animate-[slideDown_0.6s_ease-out]">
            <Sparkles className="w-4 h-4 text-orange-500 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-semibold text-orange-500">Start Your Journey</span>
          </div>
          
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Our Most{' '}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-transparent bg-clip-text animate-gradient">
              Popular Courses
            </span>
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Choose from our carefully curated courses designed to take you from beginner to expert
          </p>
        </div>

        {/* Courses Grid */}
        <div className="mx-auto mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => {
            const isHovered = hoveredCard === course.id;
            
            return (
              <article
                key={course.id}
                className="group relative animate-[slideUp_0.8s_ease-out_both]"
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                onMouseEnter={() => setHoveredCard(course.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glowing Background Effect */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 blur-xl transition-opacity duration-500 -z-10"
                  style={{
                    opacity: isHovered ? 0.3 : 0,
                  }}
                ></div>

                {/* Card Container */}
                <div
                  className="relative flex flex-col h-full rounded-2xl bg-gradient-to-br from-gray-950 to-gray-900 border overflow-hidden transition-all duration-500"
                  style={{
                    borderColor: isHovered ? 'rgba(249, 115, 22, 0.5)' : 'rgba(31, 41, 55, 1)',
                    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: isHovered ? '0 20px 40px -10px rgba(249, 115, 22, 0.3)' : 'none',
                  }}
                >
                  {/* Animated Particles */}
                  {isHovered && (
                    <>
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-orange-500 rounded-full animate-[float_2s_ease-in-out_infinite]"
                          style={{
                            left: `${15 + i * 20}%`,
                            top: `${20 + (i % 2) * 60}%`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        ></div>
                      ))}
                    </>
                  )}

                  {/* Course Image */}
                  <div className="relative w-full overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden bg-gray-900">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover transition-all duration-700"
                        style={{
                          transform: isHovered ? 'scale(1.15) rotate(2deg)' : 'scale(1) rotate(0deg)',
                        }}
                      />
                      {/* Dynamic Gradient Overlay */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent transition-opacity duration-500"
                        style={{ opacity: isHovered ? 0.8 : 0.6 }}
                      ></div>
                    </div>
                    
                    {/* Level Badge with Animation */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <span 
                        className="inline-flex items-center gap-x-1.5 rounded-full bg-orange-500/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-all duration-300"
                        style={{
                          transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
                        }}
                      >
                        <BarChart3 className="h-3.5 w-3.5" />
                        {course.level}
                      </span>
                    </div>

                    {/* Top Badge - Students Count */}
                    <div 
                      className="absolute top-3 left-3 sm:top-4 sm:left-4 transition-all duration-500"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateX(0)' : 'translateX(-20px)',
                      }}
                    >
                      <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                        <TrendingUp className="h-3.5 w-3.5 text-orange-500" />
                        {course.students} Students
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    {/* Duration & Rating */}
                    <div className="flex items-center justify-between gap-x-2 text-xs mb-3">
                      <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-400">
                        <Clock className="h-3.5 w-3.5 text-orange-500" />
                        {course.duration}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-orange-500">★</span>
                        <span className="text-white font-semibold">{course.rating}</span>
                      </div>
                    </div>

                    {/* Course Title & Description */}
                    <div className="relative flex-1">
                      <h3 
                        className="text-base sm:text-lg font-bold leading-6 text-white transition-colors duration-300 mb-2"
                        style={{
                          color: isHovered ? 'rgb(249, 115, 22)' : 'white',
                        }}
                      >
                        <a href={course.href}>
                          <span className="absolute inset-0" />
                          {course.title}
                        </a>
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-gray-400 line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {/* Button */}
                    <div className="mt-4 w-full">
                      <a
                        href={course.href}
                        className="group/btn relative flex items-center justify-center gap-2 w-full rounded-lg bg-orange-500/10 px-4 py-2.5 text-sm font-semibold text-orange-500 shadow-sm shadow-orange-500/5 border border-orange-500/20 overflow-hidden transition-all duration-300"
                        style={{
                          backgroundColor: isHovered ? 'rgb(249, 115, 22)' : 'rgba(249, 115, 22, 0.1)',
                          color: isHovered ? 'white' : 'rgb(249, 115, 22)',
                          borderColor: isHovered ? 'rgb(249, 115, 22)' : 'rgba(249, 115, 22, 0.2)',
                          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                          boxShadow: isHovered ? '0 10px 20px -5px rgba(249, 115, 22, 0.4)' : 'none',
                        }}
                      >
                        <span className="relative z-10">View Details</span>
                        <ArrowRight 
                          className="h-4 w-4 relative z-10 transition-transform duration-300"
                          style={{
                            transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                          }}
                        />
                        {/* Shine effect */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000"
                          style={{
                            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                          }}
                        ></div>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Courses Button */}
        <div className="mt-12 sm:mt-16 text-center animate-[fadeIn_1s_ease-out_1.2s_both]">
          <a
            href="/courses"
            className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 active:scale-95 text-sm sm:text-base overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
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

export default FeaturedCourses;