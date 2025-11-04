import React, { useState } from 'react';
import { Github, Twitter, Linkedin, Mail, ArrowRight, Sparkles } from 'lucide-react';
import Logo from '../assets/Logo.jpg';

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);


  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
      
      {/* Top Border with Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-8 animate-[slideUp_0.8s_ease-out_both]">
            {/* Logo & Description */}
            <div className="space-y-4">
              <a href="#" className="inline-flex items-center gap-3 group">
                <div className="relative">
                  <img 
                    src={Logo} 
                    alt="KivyLogo" 
                    className="w-12 h-12 rounded-xl ring-2 ring-orange-500/20 group-hover:ring-orange-500/40 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-orange-500/0 group-hover:bg-orange-500/10 blur-lg transition-all duration-300"></div>
                </div>
                <span className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors duration-300">
                  Code Kivy
                </span>
              </a>
              
              <p className="text-base leading-relaxed text-gray-400 max-w-md">
                Master in-demand coding skills with expert-led courses. 
                Transform from beginner to job-ready professional, one lesson at a time.
              </p>
            </div>

            

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: '#', name: 'GitHub', color: 'from-gray-600 to-gray-700' },
                { icon: Linkedin, href: '#', name: 'LinkedIn', color: 'from-blue-600 to-blue-700' },
              ].map((social, index) => {
                const Icon = social.icon;
                const isHovered = hoveredSocial === social.name;
                
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="relative p-3 bg-gray-900/50 rounded-xl border border-gray-800 
                             hover:border-orange-500/50 transition-all duration-300 group"
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    aria-label={social.name}
                    style={{
                      transform: isHovered ? 'translateY(-4px) scale(1.1)' : 'translateY(0) scale(1)',
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <Icon 
                      className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" 
                    />
                    {isHovered && (
                      <div className="absolute inset-0 rounded-xl bg-orange-500/10 blur-lg"></div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Columns: Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 animate-[slideUp_0.8s_ease-out_0.2s_both]">
            
            {/* Platform Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                Platform
              </h3>
              <ul className="space-y-3">
                {['Courses', 'Community', 'Pricing', 'Resources'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group inline-flex items-center text-sm text-gray-400 hover:text-orange-500 transition-all duration-300"
                    >
                      <span className="relative">
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      <ArrowRight className="w-0 h-3.5 text-orange-500 opacity-0 group-hover:w-3.5 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                Company
              </h3>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Contact', 'Partners'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group inline-flex items-center text-sm text-gray-400 hover:text-orange-500 transition-all duration-300"
                    >
                      <span className="relative">
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      <ArrowRight className="w-0 h-3.5 text-orange-500 opacity-0 group-hover:w-3.5 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                Legal
              </h3>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Licensing'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group inline-flex items-center text-sm text-gray-400 hover:text-orange-500 transition-all duration-300"
                    >
                      <span className="relative">
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      <ArrowRight className="w-0 h-3.5 text-orange-500 opacity-0 group-hover:w-3.5 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800/50 animate-[fadeIn_1s_ease-out_0.4s_both]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Code Kivy, Inc. All rights reserved.
            </p>

            {/* Additional Info */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                All systems operational
              </span>
              <span>Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </footer>
  );
};

export default Footer;
