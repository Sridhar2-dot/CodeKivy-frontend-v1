import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/Logo.jpg';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Check if a link is active
  const isActive = (href) => location.pathname === href;

  const glowColor = "text-orange-500";

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
          
          * {
            font-family: 'Poppins', sans-serif !important;
          }
          
          .border-gradient-fade {
            border-bottom: 1px solid transparent;
            border-image: linear-gradient(
              to right, 
              transparent 0%, 
              rgba(249, 115, 22, 0.3) 50%,
              transparent 100%
            ) 1;
          }
          
          .nav-link-wrapper {
            position: relative;
            display: inline-block;
          }
          
          .nav-link-underline {
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #f97316, #fb923c, #f97316);
            transition: width 0.3s ease-in-out;
            box-shadow: 0 0 8px rgba(249, 115, 22, 0.6);
          }
          
          .nav-link-wrapper.active .nav-link-underline,
          .nav-link-wrapper:hover .nav-link-underline {
            width: 100%;
          }
          
          .nav-link-wrapper.active .nav-link-underline {
            animation: glow-pulse 2s ease-in-out infinite;
          }
          
          @keyframes glow-pulse {
            0%, 100% {
              box-shadow: 0 0 8px rgba(249, 115, 22, 0.6);
            }
            50% {
              box-shadow: 0 0 12px rgba(251, 146, 60, 0.8);
            }
          }

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

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-slide-down {
            animation: slideDown 0.5s ease-out;
          }

          .logo-glow {
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
            transition: box-shadow 0.3s ease;
          }

          .logo-glow:hover {
            box-shadow: 0 0 30px rgba(249, 115, 22, 0.5);
          }
        `}
      </style>
      
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-xl shadow-lg shadow-orange-500/5' 
            : 'bg-black/35 backdrop-blur-md'
        } border-gradient-fade`}
      >
        <nav className="flex w-full max-w-7xl mx-auto items-center justify-between px-6 py-4 lg:px-8 lg:py-5">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 -m-1.5 p-1.5 group animate-slide-down"
          >
            <img 
              src={Logo} 
              alt="Code Kivy Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl logo-glow transition-all duration-300 group-hover:scale-110"
            />
            <span className="text-xl sm:text-2xl font-bold text-white group-hover:text-orange-500 transition-colors duration-300">
              Code Kivy
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="relative -m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-50 hover:text-orange-500 hover:bg-orange-500/10 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex animate-slide-down" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-x-8 border border-white/20 rounded-full px-6 py-2 bg-black/20 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-300">
              {navLinks.map((link, index) => (
                <div 
                  key={link.name} 
                  className={`nav-link-wrapper ${isActive(link.href) ? 'active' : ''}`}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <Link
                    to={link.href}
                    className={`text-base font-medium leading-6 ${
                      isActive(link.href) ? glowColor : 'text-gray-50'
                    } hover:text-orange-500 transition-colors duration-200`}
                  >
                    {link.name}
                  </Link>
                  <div className="nav-link-underline"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex lg:items-center animate-slide-down" style={{ animationDelay: '0.5s' }}>
            <Link
              to="/contact"
              className="group relative px-6 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Start Now</span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gradient-to-br from-gray-900 to-black px-6 py-6 sm:max-w-sm border-l border-orange-500/20 animate-slide-down">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Link 
                to="/" 
                className="flex items-center gap-3 group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img 
                  src={Logo} 
                  alt="Code Kivy Logo" 
                  className="h-10 w-10 rounded-xl logo-glow transition-all duration-300 group-hover:scale-110"
                />
                <span className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors duration-300">
                  Code Kivy
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-lg p-2.5 text-gray-50 hover:text-orange-500 hover:bg-orange-500/10 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>
            
            {/* Mobile Nav Links */}
            <div className="mt-6 flow-root">
              <div className="space-y-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200 ${
                      isActive(link.href) 
                        ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/10 text-orange-500 border-l-4 border-orange-500' 
                        : 'text-gray-50 hover:bg-orange-500/10 hover:text-orange-500'
                    }`}
                    style={{
                      animation: `slideDown 0.4s ease-out ${0.1 + index * 0.1}s both`
                    }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      isActive(link.href) ? 'bg-orange-500' : 'bg-gray-600 group-hover:bg-orange-500'
                    }`}></span>
                    {link.name}
                  </Link>
                ))}
              </div>
              
              {/* Mobile CTA Button */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative flex items-center justify-center gap-2 w-full rounded-xl px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95"
                  style={{
                    animation: 'slideDown 0.4s ease-out 0.5s both'
                  }}
                >
                  <span className="relative z-10">Start Now</span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center" style={{ animation: 'fadeIn 0.6s ease-out 0.6s both' }}>
                <p className="text-sm text-gray-500">
                  Join 10,000+ students learning with us
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;