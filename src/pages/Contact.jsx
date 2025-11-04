import React, { useState, useEffect } from 'react';
import { Mail, Phone, BookOpen, User, CheckCircle, Loader, Sparkles, ArrowRight, Star } from 'lucide-react';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    interestedCourse: ''
  });
  
  const [status, setStatus] = useState('idle');
  const [focusedField, setFocusedField] = useState(null);
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.interestedCourse) {
      alert('Please fill in all fields');
      return;
    }

    setStatus('loading');

    try {
      const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
      
      const formDataToSend = new FormData();
      formDataToSend.append('entry.1234567890', formData.fullName);
      formDataToSend.append('entry.0987654321', formData.email);
      formDataToSend.append('entry.1122334455', formData.mobile);
      formDataToSend.append('entry.5566778899', formData.interestedCourse);

      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend
      });

      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        interestedCourse: ''
      });

      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const courses = [
    'Python Basic',
    'Python Advance',
    'Machine Learning Internship'
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center py-16 px-4">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5"></div>
      </div>

      {/* Large Animated Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] animate-pulse" 
           style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-orange-600/15 rounded-full blur-[120px] animate-pulse" 
           style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-[100px] animate-pulse" 
           style={{ animationDuration: '6s', animationDelay: '1s' }}></div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        ></div>
      ))}

      {/* Rotating Stars */}
      {[...Array(8)].map((_, i) => (
        <Star
          key={i}
          className="absolute text-orange-500/20 animate-spin"
          style={{
            top: `${15 + i * 10}%`,
            left: `${10 + i * 12}%`,
            width: `${16 + i * 2}px`,
            height: `${16 + i * 2}px`,
            animationDuration: `${20 + i * 5}s`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-2xl animate-[popUp_0.8s_ease-out_both]">
        
        {/* Header Section */}
        <div className="text-center mb-10 animate-[slideDown_0.8s_ease-out_both]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-orange-500 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-semibold text-orange-500">Join 800+ Students</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
        Express Your Interest          </h1>
          <p className="text-gray-400 text-lg">
            Start your learning journey with us. Transform your career today.
          </p>
        </div>

        {/* Main Card with Glass Effect */}
        <div className="relative group">
          {/* Glowing Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
            
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(249,115,22,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px] animate-shimmer"></div>
            </div>

            {/* Form Section */}
            <div className="relative p-6 md:p-10">
              <div className="space-y-6">
                
                {/* Full Name */}
                <div className="animate-[slideRight_0.6s_ease-out_0.1s_both]">
                  <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg transition-all duration-300 ${focusedField === 'fullName' ? 'bg-orange-500/20 ring-2 ring-orange-500/50' : 'bg-gray-800/50'}`}>
                      <User className="h-4 w-4 text-orange-500" />
                    </div>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 bg-black/40 border border-gray-700 rounded-xl 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                             focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300
                             hover:border-gray-600 hover:bg-black/60 focus:scale-[1.02]"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Address */}
                <div className="animate-[slideRight_0.6s_ease-out_0.2s_both]">
                  <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg transition-all duration-300 ${focusedField === 'email' ? 'bg-orange-500/20 ring-2 ring-orange-500/50' : 'bg-gray-800/50'}`}>
                      <Mail className="h-4 w-4 text-orange-500" />
                    </div>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 bg-black/40 border border-gray-700 rounded-xl 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                             focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300
                             hover:border-gray-600 hover:bg-black/60 focus:scale-[1.02]"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Mobile Number */}
                <div className="animate-[slideRight_0.6s_ease-out_0.3s_both]">
                  <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg transition-all duration-300 ${focusedField === 'mobile' ? 'bg-orange-500/20 ring-2 ring-orange-500/50' : 'bg-gray-800/50'}`}>
                      <Phone className="h-4 w-4 text-orange-500" />
                    </div>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('mobile')}
                    onBlur={() => setFocusedField(null)}
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3.5 bg-black/40 border border-gray-700 rounded-xl 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                             focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300
                             hover:border-gray-600 hover:bg-black/60 focus:scale-[1.02]"
                    placeholder="10-digit mobile number"
                  />
                </div>

                {/* Interested Course */}
                <div className="animate-[slideRight_0.6s_ease-out_0.4s_both]">
                  <label className="block text-gray-300 text-sm font-semibold mb-2 flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg transition-all duration-300 ${focusedField === 'interestedCourse' ? 'bg-orange-500/20 ring-2 ring-orange-500/50' : 'bg-gray-800/50'}`}>
                      <BookOpen className="h-4 w-4 text-orange-500" />
                    </div>
                    Interested Course
                  </label>
                  <select
                    name="interestedCourse"
                    value={formData.interestedCourse}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('interestedCourse')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 bg-black/40 border border-gray-700 rounded-xl 
                             text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 
                             focus:border-orange-500 transition-all duration-300 cursor-pointer 
                             hover:border-gray-600 hover:bg-black/60 focus:scale-[1.02]"
                  >
                    <option value="" className="bg-gray-900">Select a course</option>
                    {courses.map((course) => (
                      <option key={course} value={course} className="bg-gray-900">
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="animate-[slideRight_0.6s_ease-out_0.5s_both]">
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className="group relative w-full mt-4 py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 
                             hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg
                             rounded-xl shadow-xl shadow-orange-500/30 transition-all duration-300
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center 
                             justify-center gap-2 hover:shadow-orange-500/50 hover:scale-[1.02]
                             active:scale-[0.98] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {status === 'loading' ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </div>

                {/* Success/Error Messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-3 p-4 bg-green-900/30 border border-green-500/50 
                                rounded-xl text-green-400 animate-[popUp_0.5s_ease-out_both] backdrop-blur-sm">
                    <CheckCircle className="h-6 w-6 flex-shrink-0" />
                    <p className="font-medium">Thank you for your interest! Our team will reach out to you shortly.</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-500/50 
                                rounded-xl text-red-400 animate-[popUp_0.5s_ease-out_both] backdrop-blur-sm">
                    <p className="font-medium">Something went wrong. Please try again or contact us directly.</p>
                  </div>
                )}

              </div>
            </div>

            {/* Contact Info Footer */}
            <div className="relative bg-gradient-to-r from-orange-500/5 to-orange-600/5 backdrop-blur-sm px-6 py-5 border-t border-gray-800/50">
              <p className="text-gray-400 text-center text-sm flex flex-wrap items-center justify-center gap-2">
                <span>Need help?</span>
                <a href="mailto:ceocodekivy@gmail.com" 
                   className="text-orange-500 hover:text-orange-400 transition-colors font-semibold inline-flex items-center gap-1 group">
                  <Mail className="h-4 w-4" />
                  ceocodekivy@gmail.com
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
                <span>or</span>
                <a href="tel:+91 9390584021" 
                   className="text-orange-500 hover:text-orange-400 transition-colors font-semibold inline-flex items-center gap-1 group">
                  <Phone className="h-4 w-4" />
                  +91 9390584021
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm animate-[fadeIn_1s_ease-out_0.8s_both]">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>100% Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Instant Confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.7;
          }
        }

        @keyframes popUp {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes shimmer {
          0% {
            background-position: -250px 0;
          }
          100% {
            background-position: 250px 0;
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}</style>
    </div>
  );
}

export default ContactPage;
