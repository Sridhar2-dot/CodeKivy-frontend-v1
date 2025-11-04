import React, { useState, useEffect, useRef, useCallback } from 'react'; // Added useCallback
import {
  MapPin, Users, GraduationCap, BookOpen, TrendingUp, Award, Target, Sparkles,
  BadgeCheck, Calendar, ChevronLeft, ChevronRight, Star,
  Play, Pause, Volume2, VolumeX // MODIFIED: Added Pause
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Added motion, AnimatePresence
import image1 from '../assets/AP.png';
import image2 from '../assets/KN.png';
import image3 from '../assets/TG1.png';
import image4 from '../assets/TM.png';
import msmeImage from '../assets/MSME.png';
import founderImage from '../assets/founder.jpg';
import rajastan from '../assets/3.JPG';
import nuz from '../assets/2.JPG';
import webi from '../assets/1.jpg';
import indus from '../assets/5.jpg';
import sarada from '../assets/4.jpg';

// --- IMPORT YOUR VIDEO HERE ---
// Make sure this path is correct
import aboutvideo from '../assets/aboutvideo.MP4';

// --- Helper component for Star Ratings ---
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}`}
          fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [counters, setCounters] = useState({
    students: 0,
    institutes: 0,
    states: 0
  });

  // --- Video Player State and Refs ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // 1. Mute state starts true
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false); // <-- NEW: State for dragging
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const videoContainerRef = useRef(null); // Ref for the video section

  // Events data with placeholder images
  const events = [
    {
      title: 'Rajasthan IT Day Hackathon 2k23',
      college: 'University Of Rajasthan',
      date: 'Aug 14, 2023',
      attendees: '3500+',
      image: rajastan,
      description: 'Advanced AI Hackathon'
    },
    {
      title: 'Free Python Classes',
      college: 'IIIT Nuzvid',
      date: 'Jun-Aug, 2024',
      attendees: '180+',
      image: nuz,
      description: 'Python Programming and ML Fundamentals'
    },
    {
      title: 'Machine Learning Workshop',
      college: 'Saradha Degree College, Nuzvid',
      date: 'Dec 20, 2023',
      attendees: '100+',
      image: sarada,
      description: 'ML Fundamentals and Applications'
    },
    {
      title: 'Python Webinar',
      college: 'NTR Degree College, Addanki',
      date: 'Aug 8, 2023',
      attendees: '200+',
      image: webi,
      description: 'Python Basics and Hands-on Projects'
    },
    {
      title: 'AIML Workshop',
      college: 'Indus Valley College, Bangalore',
      date: 'Feb 20, 2025',
      attendees: '300+',
      image: indus,
      description: '24-hour coding challenge with prizes'
    }
  ];

  // --- Student Feedback Data ---
  const studentFeedback = [
    { name: 'Swathi M.', rating: 5, review: 'Amazing course! The project-based learning is top-notch.' },
    { name: 'Rahul K.', rating: 4, review: 'Learned so much. The KivyBot assistant was surprisingly helpful.' },
    { name: 'Rohan P.', rating: 5, review: 'Great career support. I landed an internship right after.' },
    { name: 'Priya K.', rating: 5, review: 'Highly recommend Code Kivy for anyone serious about Python.' },
    { name: 'Hari B.', rating: 4, review: 'Challenging but very rewarding. The instructors are great.' },
    { name: 'Pavan HS.', rating: 5, review: 'Best Python course I\'ve ever taken. Clear, concise, and practical.' },
    { name: 'Ayesha S.', rating: 5, review: 'The AI/ML modules were fantastic and very up-to-date.' },
  ];

  // Duplicate feedback for seamless loop
  const duplicatedFeedback = [...studentFeedback, ...studentFeedback];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [events.length]);

  // Animate counters on mount
  useEffect(() => {
    setIsVisible(true);

    const duration = 2000;
    const steps = 60;
    const increment = {
      students: 800 / steps,
      institutes: 25 / steps,
      states: 4 / steps
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        students: Math.min(Math.floor(increment.students * currentStep), 800),
        institutes: Math.min(Math.floor(increment.institutes * currentStep), 25),
        states: Math.min(Math.floor(increment.states * currentStep), 4)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // --- MODIFIED: Video Player Logic ---

  // 1. This effect syncs the `isMuted` state with the video element
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.muted = isMuted;
  }, [isMuted]);

  // 2. Function for the big Play button
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setIsMuted(false); // <-- Unmutes the video on play
    }
  };

  // 3. Function for the small Pause button
  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 4. Function for the Mute/Unmute button
  const toggleMute = () => {
    // This just toggles the state, the useEffect handles the rest
    setIsMuted((prev) => !prev);
  };

  // 5. --- MODIFIED: Function to update progress bar ---
  const handleTimeUpdate = () => {
    // Only update progress if the user is NOT actively dragging the bar
    if (videoRef.current && !isSeeking) {
      const { currentTime, duration } = videoRef.current;
      if (duration) { // Avoid division by zero
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  // 6. --- NEW: Function to handle seeking (both click and drag) ---
  const handleSeek = useCallback((e) => {
    if (!videoRef.current || !progressBarRef.current || !videoRef.current.duration) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    let clickX = e.clientX - rect.left;
    const barWidth = rect.width;

    // Clamp clickX to be within the bar's bounds
    if (clickX < 0) clickX = 0;
    if (clickX > barWidth) clickX = barWidth;

    const seekPercentage = clickX / barWidth;
    const { duration } = videoRef.current;

    videoRef.current.currentTime = duration * seekPercentage;
    setProgress(seekPercentage * 100); // Update visual progress immediately
  }, []); // Empty dependency array, refs are stable

  // 7. --- NEW: MouseDown handler to start seeking ---
  const handleSeekMouseDown = useCallback((e) => {
    setIsSeeking(true);
    handleSeek(e); // Seek on the initial click
  }, [handleSeek]);

  // 8. --- NEW: MouseMove handler (will be attached to window) ---
  const handleSeekMouseMove = useCallback((e) => {
    handleSeek(e); // Continuously seek while dragging
  }, [handleSeek]);

  // 9. --- NEW: MouseUp handler (will be attached to window) ---
  const handleSeekMouseUp = useCallback(() => {
    setIsSeeking(false);
  }, []);

  // 10. --- NEW: Effect to attach global listeners for dragging ---
  useEffect(() => {
    // Define functions to pass to listeners
    const handleMove = (e) => {
      if (isSeeking) {
        handleSeekMouseMove(e);
      }
    };
    const handleUp = (e) => {
      if (isSeeking) {
        handleSeekMouseUp(e);
      }
    };

    // Add listeners when seeking starts
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);

    // Cleanup listeners
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [isSeeking, handleSeekMouseMove, handleSeekMouseUp]); // Re-run when these change

  // --- End of Video Logic ---

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: `${counters.students}+`,
      label: 'Students Enrolled',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      value: `${counters.institutes}+`,
      label: 'Partner Institutes',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      value: `${counters.states}`,
      label: 'States Covered',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: '100%',
      label: 'Success Rate',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const states = [
    { name: 'Andhra Pradesh', color: 'bg-orange-500' },
    { name: 'Telangana', color: 'bg-orange-600' },
    { name: 'Karnataka', color: 'bg-orange-700' },
    { name: 'Tamil Nadu', color: 'bg-orange-800' }
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Python and AI-Focused Curriculum',
      description: 'Comprehensive learning path designed for real-world applications'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Project-Based Learning',
      description: 'Hands-on projects that build your portfolio and skills'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Career Support',
      description: 'Guidance and mentorship to launch your tech career'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI-Powered Assistant',
      description: '24/7 support with our intelligent KivyBot assistant'
    }
  ];

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className={`relative text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-6 py-2 mb-6 overflow-hidden">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-300">Leading EdTech Platform</span>
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent animate-[fadeInUp_1s_ease-out]">
              About Code Kivy
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-[fadeInUp_1s_ease-out_0.2s_both]">
              Empowering South India’s next generation of developers with
              <span className="text-orange-500 font-semibold"> Python and AI excellence.</span> across South India
            </p>
          </div>

          {/* Stats Grid with enhanced animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`relative group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4 transform group-hover:rotate-6 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MSME Certification Section */}
      <section className="py-12 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-orange-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden hover:border-orange-500/60 transition-all duration-500 group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-600/5 rounded-full blur-3xl group-hover:bg-orange-600/10 transition-all duration-500"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1.5 mb-3 animate-[pulse_2s_ease-in-out_infinite]">
                    <BadgeCheck className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-medium text-green-300">Officially Recognized</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                    MSME Certified Organization
                  </h2>

                  <p className="text-base text-gray-400 mb-4 max-w-2xl">
                    Proud to be recognized and certified by the Ministry of Micro, Small and Medium Enterprises,
                    Government of India. This certification validates our commitment to quality education and
                    sustainable business practices.
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <div className="flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 hover:border-green-500/50 transition-all duration-300">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-300">Government Approved</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 hover:border-orange-500/50 transition-all duration-300">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-300">Quality Assured</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1.5 hover:border-blue-500/50 transition-all duration-300">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-300">Trusted Partner</span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative bg-white rounded-xl p-3 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={msmeImage}
                        alt="MSME Certification"
                        className="w-48 h-48 object-contain rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-[fadeInUp_1s_ease-out]">
              Our Mission
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-[fadeInUp_1s_ease-out_0.2s_both]">
              To democratize quality programming education and create a thriving community
              of Python and AI developers across South India
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black border-2 border-gray-800 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 group hover:scale-105 hover:-translate-y-2 animate-[fadeInUp_0.8s_ease-out] relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400 group-hover:bg-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Carousel Section */}
      <section className="py-20 px-6 bg-black relative overflow-hidden">
        {/* Decorative Background Blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-4">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Past Events</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Events
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Bringing tech education to campuses across South India
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Main Carousel */}
            {/* Decreased height for small screens (h-[350px] sm:h-[500px]) */}
            <div className="relative h-[350px] sm:h-[500px] rounded-3xl overflow-hidden">
              {events.map((event, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentEventIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                >
                  <div className="relative h-full rounded-3xl overflow-hidden group">
                    {/* Event Image */}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                    {/* Event Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                      {/* Event Details Badge */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-2 bg-orange-500/20 backdrop-blur-md border border-orange-500/30 rounded-full px-4 py-2">
                          <Calendar className="w-4 h-4 text-orange-400" />
                          <span className="text-sm text-orange-300 font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-purple-500/20 backdrop-blur-md border border-purple-500/30 rounded-full px-4 py-2">
                          <Users className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-purple-300 font-medium">{event.attendees} Attendees</span>
                        </div>
                      </div>

                      {/* Event Title & Description */}
                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-3">
                        {event.title}
                      </h3>
                      <p className="text-lg text-gray-300 mb-6 max-w-2xl">
                        {event.description}
                      </p>

                      {/* College Name Highlight */}
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full px-6 py-3 w-fit">
                        <MapPin className="w-5 h-5 text-white" />
                        <span className="text-white font-bold text-lg">{event.college}</span>
                      </div>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/30 to-transparent rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-tr-full"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Combined Navigation and Indicators at the Bottom */}
            <div className="flex justify-center items-center gap-4 mt-8">
              {/* Previous Button */}
              <button
                onClick={prevEvent}
                className="hover:bg-white/20 rounded-full p-2 cursor-pointer transition-all duration-300 hover:scale-110 z-20"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEventIndex(index)}
                    className={`transition-all duration-300 rounded-full ${index === currentEventIndex
                      ? 'w-12 bg-orange-500'
                      : 'w-3 bg-gray-600 hover:bg-gray-500'
                      } h-3`}
                    aria-label={`Go to event ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextEvent}
                className="hover:bg-white/20 rounded-full p-2 transition-all cursor-pointer duration-300 hover:scale-110 z-20"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Student Feedback Section --- */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Feedback from the talented developers in our community.
          </p>
        </div>
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          <div className="flex w-max animate-marquee">
            {duplicatedFeedback.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 mx-4 bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <StarRating rating={item.rating} />
                  <span className="ml-2 text-sm font-medium text-gray-300">{item.rating.toFixed(1)}</span>
                </div>
                <p className="text-gray-300 mb-4 text-base">&ldquo;{item.review}&rdquo;</p>
                <p className="text-white font-semibold text-right">- {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Reach Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-[fadeInUp_1s_ease-out]">
              Our Geographic Reach
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 animate-[fadeInUp_1s_ease-out_0.2s_both]">
              Serving students across 4 major states in South India
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {states.map((state, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-900 border border-orange-500/30 rounded-full px-6 py-3 hover:border-orange-500 hover:scale-105 hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.8s_ease-out]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-3 h-3 ${state.color} rounded-full animate-pulse`}></div>
                  <span className="text-white font-medium">{state.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="animate-bounce">
                <div className="relative">
                  <MapPin
                    className="w-16 h-16 text-orange-500 drop-shadow-2xl filter"
                    fill="#231e19ff" // This adds a light orange fill
                  />
                  <div className="absolute inset-0 w-16 h-16 bg-orange-500/30 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[image1, image2, image3, image4].map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-2xl border-2 border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 animate-[fadeInUp_0.8s_ease-out]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={image}
                    alt={`Map of region ${index + 1}`}
                    className="w-full h-64 object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-600/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* --- MODIFIED: Video Section --- */}
      <section
        className="py-20 px-6 bg-black"
      // ref={videoContainerRef} // Removed ref to prevent scroll-based play
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              See Code Kivy in Action
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Watch how we're transforming education across South India
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-4 border-orange-500/30 aspect-video bg-gradient-to-br from-gray-900 to-black hover:border-orange-500/60 transition-all duration-500 group">

            {/* The Video Element */}
            <video
              ref={videoRef}
              src={aboutvideo}
              loop
              playsInline
              controls={false} // Hide default controls
              className="absolute inset-0 w-full h-full object-cover z-0"
              onTimeUpdate={handleTimeUpdate} // <-- MODIFIED: Attach time update handler
              onLoadedMetadata={handleTimeUpdate}
            />

            {/* Animated Play Button Overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 cursor-pointer"
                  onClick={handlePlay} // MODIFIED: Calls handlePlay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center">
                    <div className="inline-flex p-6 bg-orange-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Play
                        className="w-16 h-16 text-orange-500"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Controls (Pause & Mute) */}
            <AnimatePresence>
              {isPlaying && (
                <>
                  {/* --- MODIFIED: Progress Bar --- */}
                  <motion.div
                    className="absolute z-20 bottom-4 left-4 right-24" // Positioned at bottom, leaves space for controls
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      ref={progressBarRef}
                      onMouseDown={handleSeekMouseDown} // <-- CHANGED from onClick
                      className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer group-hover:h-2 transition-all duration-200 backdrop-blur-sm"
                    >
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </motion.div>

                  {/* --- EXISTING: Custom Controls (Pause & Mute) --- */}
                  <motion.div
                    className="absolute z-20 bottom-4 right-4 flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    {/* Pause Button */}
                    <button
                      onClick={handlePause}
                      className="bg-black/30 backdrop-blur-md text-white p-2 rounded-full transition-all hover:bg-black/50"
                      title="Pause"
                    >
                      <Pause className="w-5 h-5" fill="currentColor" />
                    </button>

                    {/* Mute/Unmute Button */}
                    <button
                      onClick={toggleMute}
                      className="bg-black/30 backdrop-blur-md text-white p-2 rounded-full transition-all hover:bg-black/50"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* --- What Our Founder & CEO Says Section --- */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white text-center">
            What Our Founder & CEO Says
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-gray-900 to-black border-1 border-gray-950 rounded-2xl p-8 md:p-12">

            {/* --- MODIFIED: Image on Left --- */}
            <div className="flex-shrink-0">
              {/* --- NEW: Wrapper for animation --- */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 animate-[pulse-shadow_3s_ease-in-out_infinite] rounded-full">
                <img
                  src={founderImage}
                  alt="Pavan Kumar Nekkanti, Founder & CEO"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-800"
                />
              </div>
            </div>

            {/* Text Content on Right */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Pavan Kumar Nekkanti
              </h3>
              <p className="text-lg text-orange-400 font-semibold mb-4">
                AI Engineer @NYX
              </p>
              <p className="flex items-center text-lg text-orange-400 font-semibold mb-4">
                <img
                  width="20"
                  height="25"
                  src="https://img.icons8.com/color/48/marker--v1.png"
                  alt="Location marker icon"
                />
                <span className="ml-2">Bangalore</span>
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                "Our mission is to empower every student with the skills and confidence to build their future in AI, while making quality tech education accessible across South India."              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }

        {/* --- NEW: Marquee Animation --- */}
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        {/* --- NEW: Founder Image Pulse Animation --- */}
        @keyframes pulse-shadow {
          0%, 100% {
            box-shadow: 0 0 20px 0px rgba(249, 115, 22, 0.3); /* orange-500 at 30% */
          }
          50% {
            box-shadow: 0 0 30px 8px rgba(249, 115, 22, 0.5); /* orange-500 at 50% */
          }
        }
      `}</style>
    </div>
  );
};

export default About;
