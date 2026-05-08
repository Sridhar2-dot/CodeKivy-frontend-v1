import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Gamepad2 } from 'lucide-react';
import { ToolModal } from './ToolModal';

// Import game images
import game1 from '../assets/game1.png';
import game2 from '../assets/game_img2.png';
import game3 from '../assets/game_img3.png';

const GameCards = () => {
  const [hoveredGame, setHoveredGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 1,
      image: game1,
      link: 'https://code-runner-game.netlify.app',
      name: 'Code-Runner',
      description: 'Classic arcade games reimagined',
      comingSoon: false
    },
    {
      id: 2,
      image: game2,
      link: '#',
      name: 'Game-2',
      description: 'Console gaming experience',
      comingSoon: true
    },
    {
      id: 3,
      image: game3,
      link: '#',
      name: 'Game-3',
      description: 'PC gaming at its finest',
      comingSoon: true
    }
  ];

  return (
    <div className="relative py-16 sm:py-20 md:py-24 bg-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5 animate-pulse" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }}></div>

      {/* Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-[slideUp_0.8s_ease-out_both]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-6">
            <Gamepad2 className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-300">Interactive Fun</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              Need a break?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Take a break and explore our curated collection of games
          </p>
        </div>

        {/* Games Grid */}
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-6xl">
          {games.map((game, index) => {
            const isHovered = hoveredGame === game.id;

            return (
              <div
                key={game.id}
                className="group relative animate-[slideUp_0.8s_ease-out_both] cursor-pointer block"
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                onMouseEnter={() => !game.comingSoon && setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
                onClick={() => !game.comingSoon && setSelectedGame(game)}
              >
                {/* Floating Animation Wrapper */}
                <div
                  className="relative animate-[float_gentle_3s_ease-in-out_infinite]"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {/* Glowing Background Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 blur-2xl transition-opacity duration-500 -z-10"
                    style={{
                      opacity: isHovered ? 0.4 : 0.15,
                    }}
                  ></div>

                  {/* Game Card Container - Square Aspect Ratio */}
                  <div
                    className="relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-gray-950 to-gray-900 border overflow-hidden transition-all duration-500 aspect-square"
                    style={{
                      borderColor: isHovered ? 'rgba(249, 115, 22, 0.6)' : 'rgba(249, 115, 22, 0.3)',
                      borderWidth: '2px',
                      transform: isHovered ? 'translateY(-12px) scale(1.05)' : 'translateY(0) scale(1)',
                      boxShadow: isHovered
                        ? '0 25px 50px -12px rgba(249, 115, 22, 0.5), 0 0 0 1px rgba(249, 115, 22, 0.2)'
                        : '0 10px 25px -5px rgba(249, 115, 22, 0.2)',
                    }}
                  >
                    {/* Animated Gradient Border on Hover */}
                    {isHovered && (
                      <div className="absolute inset-0 rounded-2xl p-[2px] opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 animate-[spin_3s_linear_infinite]"></div>
                        <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-gray-950 to-gray-900"></div>
                      </div>
                    )}

                    {/* Animated Particles - Always visible but more on hover */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-orange-500 rounded-full animate-[float_2s_ease-in-out_infinite]"
                        style={{
                          left: `${10 + i * 15}%`,
                          top: `${15 + (i % 3) * 30}%`,
                          animationDelay: `${i * 0.4}s`,
                          opacity: isHovered ? 1 : 0.4,
                        }}
                      ></div>
                    ))}

                    {/* Game Image */}
                    <div className="relative w-full h-3/4 flex items-center justify-center p-4 sm:p-6 z-10">
                      {game.image ? (
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-full object-contain transition-all duration-700 drop-shadow-2xl"
                          style={{
                            transform: isHovered ? 'scale(1.15) rotate(2deg)' : 'scale(1) rotate(0deg)',
                            filter: game.comingSoon
                              ? 'blur(6px) brightness(0.5)'
                              : isHovered ? 'brightness(1.2) contrast(1.1)' : 'brightness(1) contrast(1)',
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.nextElementSibling;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      {/* Fallback if image doesn't exist */}
                      <div
                        className={`${game.image ? 'hidden' : 'flex'} items-center justify-center w-full h-full text-gray-500 text-lg font-semibold`}
                      >
                        {game.name}
                      </div>

                      {/* Coming Soon Overlay */}
                      {game.comingSoon && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="px-6 py-3 rounded-xl bg-black/60 backdrop-blur-sm border border-orange-500/40">
                            <span className="text-xl font-bold text-orange-400 tracking-wider">Coming Soon</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Click Button/CTA - Always visible */}
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <div
                        className="group/btn relative flex items-center justify-center gap-2 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 overflow-hidden"
                        style={{
                          backgroundColor: game.comingSoon
                            ? 'rgba(100, 100, 100, 0.6)'
                            : isHovered ? 'rgba(249, 115, 22, 0.95)' : 'rgba(249, 115, 22, 0.8)',
                          transform: isHovered && !game.comingSoon ? 'translateY(-2px)' : 'translateY(0)',
                          boxShadow: isHovered && !game.comingSoon
                            ? '0 10px 20px -5px rgba(249, 115, 22, 0.6)'
                            : '0 5px 15px -5px rgba(249, 115, 22, 0.4)',
                          cursor: game.comingSoon ? 'not-allowed' : 'pointer',
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {game.comingSoon
                            ? 'Coming Soon'
                            : isHovered ? 'Play Now' : 'Click to Play'}
                          {!game.comingSoon && (isHovered ? (
                            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          ) : (
                            <ArrowRight className="h-4 w-4 transition-transform duration-300" />
                          ))}
                        </span>
                        {/* Shine effect on button */}
                        {!game.comingSoon && (
                          <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000"
                            style={{
                              transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                            }}
                          ></div>
                        )}
                      </div>
                    </div>

                    {/* Game Name Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div
                        className="px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all duration-300"
                        style={{
                          backgroundColor: isHovered ? 'rgba(249, 115, 22, 0.2)' : 'rgba(0, 0, 0, 0.4)',
                          border: `1px solid ${isHovered ? 'rgba(249, 115, 22, 0.5)' : 'rgba(249, 115, 22, 0.3)'}`,
                        }}
                      >
                        <span className="text-xs font-semibold text-orange-400">{game.name}</span>
                      </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent transition-opacity duration-500 pointer-events-none"
                      style={{ opacity: isHovered ? 0.3 : 0.5 }}
                    ></div>

                    {/* Shine effect */}
                    {isHovered && (
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_ease-in-out_infinite] pointer-events-none"
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <ToolModal
          tool={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}

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

        @keyframes float_gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
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

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default GameCards;
