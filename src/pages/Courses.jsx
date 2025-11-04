import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, IndianRupee, FileText, CheckCircle, Sparkles, Award, Users } from 'lucide-react';
import course1 from '../assets/Generated Image November 05, 2025 - 1_41AM.png'
import course2 from '../assets/Generated Image November 05, 2025 - 1_48AM.png'
import course3 from '../assets/Generated Image November 05, 2025 - 1_50AM.png'
import { Link } from 'react-router-dom';

const Courses = () => {
  const [visibleCourses, setVisibleCourses] = useState([]);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const courseRefs = useRef([]);

  const courses = [
    {
      id: 1,
      title: 'Python Basic',
      duration: '20 Days',
      price: 499,
      image: course1,
      color: 'from-blue-500 to-cyan-500',
      level: 'Beginner',
      students: '200+',
      about: 'Master the fundamentals of Python programming. Learn variables, data types, loops, functions. Perfect for school students starting their coding journey.',
      pdfUrl: '/pdfs/python-basics.pdf',
      registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdMIr3sUbDapsx7FWP6f147prEefoU55VAWmWNh4wQ_baBeow/viewform'
    },
    {
      id: 2,
      title: 'Python Advance',
      duration: '40 Days',
      price: 999,
      image: course2,
      color: 'from-purple-500 to-pink-500',
      level: 'Beginner',
      students: '500+',
      about: 'Master Python programming Completely. Learn variables, data types, loops, functions and OOPs concepts. Perfect for beginners starting their coding journey.',
      pdfUrl: '/pdfs/advanced-python.pdf',
      registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScEiwTe9NLWH0FaVE5--sz6qP_BXMQfg2g7aLDq91ClCQsT6Q/viewform'
    },
    {
      id: 3,
      title: 'Machine Learning Internship',
      duration: '60 Days',
      price: 2999,
      image: course3,
      color: 'from-orange-500 to-red-500',
      level: 'Advanced',
      students: '120+',
      about: 'Become a Machine Learning expert. Learn algorithms, neural networks, deep learning, and AI applications. Work on real industry projects and build your ML portfolio.',
      pdfUrl: '/pdfs/machine-learning.pdf',
      registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdXTXnMbHC1vXqFSYIn0gSBlX3jx-R9kr8rZqiYTv8CAOfstA/viewform'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = courseRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCourses.includes(index)) {
              setTimeout(() => {
                setVisibleCourses((prev) => [...prev, index]);
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    courseRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleCourses]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-300 font-medium">Premium Learning Experience</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Our Courses
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Choose your path to AI mastery with industry-leading curriculum
            </p>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">800+</div>
                <div className="text-sm text-gray-500 mt-1">Active Students</div>
              </div>
              <div className="w-px bg-gray-800"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">100%</div>
                <div className="text-sm text-gray-500 mt-1">Success Rate</div>
              </div>
              <div className="w-px bg-gray-800"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">3</div>
                <div className="text-sm text-gray-500 mt-1">Expert Courses</div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto space-y-32">
            {courses.map((course, index) => (
              <div
                key={course.id}
                ref={(el) => (courseRefs.current[index] = el)}
                className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Decorative Line */}
                <div className={`hidden md:block absolute top-1/2 ${index % 2 === 0 ? 'left-1/2' : 'right-1/2'} w-1/4 h-px bg-gradient-to-r ${index % 2 === 0 ? 'from-orange-500/50 to-transparent' : 'from-transparent to-orange-500/50'}`}></div>

                {/* Image Side */}
                <div 
                  className={`relative group w-full md:w-5/12 transition-all duration-700 ${
                    visibleCourses.includes(index) 
                      ? 'opacity-100 translate-x-0' 
                      : index % 2 === 0 
                        ? 'opacity-0 -translate-x-20' 
                        : 'opacity-0 translate-x-20'
                  }`}
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`}></div>
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 group-hover:border-orange-500/50 transition-all duration-500">
                    {/* Image */}
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Level Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r ${course.color} rounded-full text-white font-semibold text-xs shadow-lg`}>
                      {course.level}
                    </div>

                    {/* Students Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full text-white font-semibold text-xs flex items-center gap-1.5 border border-orange-500/30">
                      <Users className="w-3 h-3 text-orange-400" />
                      {course.students}
                    </div>

                    {/* Bottom Info - Left for 1st & 3rd, Right for 2nd */}
                    {index === 1 ? (
                      // 2nd course - Right side
                      <div className="absolute bottom-0 right-0 p-3 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-l from-black to-transparent">
                        <div className="flex items-center gap-1.5 text-orange-400 text-xs whitespace-nowrap">
                          <Award className="w-3.5 h-3.5" />
                          <span>Certificate Included</span>
                        </div>
                      </div>
                    ) : (
                      // 1st & 3rd course - Left side
                      <div className="absolute bottom-0 left-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black to-transparent">
                        <div className="flex items-center gap-1.5 text-orange-400 text-xs">
                          <Award className="w-3.5 h-3.5" />
                          <span>Certificate Included</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Popup - Hidden on mobile */}
                  <div 
                    className={`hidden lg:block absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2 
                    ${index % 2 === 0 ? 'translate-x-[105%]' : '-translate-x-[105%]'} 
                    w-72 z-20 
                    opacity-0 pointer-events-none scale-95
                    group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto group-hover:scale-100
                    transition-all duration-500 ease-out`}
                  >
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-orange-500/50 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${course.color} shadow-lg`}>
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-base font-bold text-white">About Course</h4>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed mb-3">
                        {course.about}
                      </p>
                      <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Hover to view
                        </span>
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                      </div>
                    </div>
                    {/* Arrow indicator */}
                    <div className={`absolute top-1/2 ${index % 2 === 0 ? '-left-2' : '-right-2'} transform -translate-y-1/2 w-4 h-4 bg-orange-500 rotate-45 shadow-lg`}></div>
                  </div>
                </div>

                {/* Content Side */}
                <div 
                  className={`w-full md:w-6/12 transition-all duration-700 ${
                    visibleCourses.includes(index) 
                      ? 'opacity-100 translate-x-0' 
                      : index % 2 === 0 
                        ? 'opacity-0 translate-x-20' 
                        : 'opacity-0 -translate-x-20'
                  }`}
                  style={{ transitionDelay: '150ms' }}
                >
                  <div className="space-y-6">
                    {/* Course Number */}
                    <div className="text-6xl font-bold text-orange-500/20">
                      0{index + 1}
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                      {course.title}
                    </h2>

                    {/* Info Cards */}
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl px-4 py-2.5">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold text-white text-sm">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-500/30 rounded-xl px-4 py-2.5">
                        <IndianRupee className="w-5 h-5 text-orange-500" />
                        <span className="font-bold text-2xl text-white">{course.price}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-base leading-relaxed">
                      {course.about.split('.')[0]}.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      <a 
                        href={course.registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/btn flex items-center gap-2 bg-gradient-to-r ${course.color} text-white px-6 py-3.5 rounded-full font-semibold text-sm hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300`}
                      >
                        <span>Register Now</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                      
                      <button 
                        onClick={() => window.open(course.pdfUrl, '_blank')}
                        className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm border-2 border-gray-800 text-white px-6 py-3.5 rounded-full font-semibold text-sm hover:border-orange-500 hover:bg-gray-900 transition-all duration-300"
                      >
                        <FileText className="w-5 h-5" />
                        <span>View Syllabus</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 mt-20 relative">
          {/* Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-300 font-medium">Limited Time Offer</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Start Your Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Today</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              800+ students trusted Code Kivy to master Python and AI unlock your potential today.
            </p>
            
           
          </div>
        </section>
      </div>
    </div>
  );
};

export default Courses;
