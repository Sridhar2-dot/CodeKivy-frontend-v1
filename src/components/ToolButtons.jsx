import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ToolModal } from './ToolModal';

// Import tool images
import tool1 from '../assets/tool_interviewer_img.png';
import tool2 from '../assets/tool_reviewer_img.png';
import tool3 from '../assets/AIstorygenerator.png';

const ToolButtons = () => {
  const [hoveredTool, setHoveredTool] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);

  const topTools = [
    {
      id: 1,
      image: tool1,
      link: 'https://aiinterviewer-codekivy.netlify.app/',
      name: 'AI Interviewer',
      description: 'Practice interviews with AI'
    },
    {
      id: 2,
      image: tool3,
      link: 'https://aistory-codekivy.netlify.app/',
      name: 'AI Story Generator',
      description: 'Generate creative stories with AI'
    },
    {
      id: 3,
      image: tool2,
      link: 'https://aicodereview-codekivy.netlify.app/',
      name: 'Code Reviewer',
      description: 'Get AI-powered code reviews'
    }
  ];

  const gameTools = [
    {
      id: 4,
      image: null,
      link: '',
      name: 'Code Runner',
      description: 'Run and solve coding challenges'
    },
    {
      id: 5,
      image: null,
      link: '',
      name: 'Coming Soon',
      description: ''
    },
    {
      id: 6,
      image: null,
      link: '',
      name: 'Coming Soon',
      description: ''
    }
  ];

  const renderTools = (tools, startIndex = 0) => (
    <div className="mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-6xl">
      {tools.map((tool, index) => {
        const isHovered = hoveredTool === tool.id;

        return (
          <div
            key={tool.id}
            className="group relative animate-[slideUp_0.8s_ease-out_both] cursor-pointer block"
            style={{ animationDelay: `${0.2 + (startIndex + index) * 0.15}s` }}
            onMouseEnter={() => setHoveredTool(tool.id)}
            onMouseLeave={() => setHoveredTool(null)}
            onClick={() => setSelectedTool(tool)}
          >
            <div
              className="relative animate-[float_gentle_3s_ease-in-out_infinite]"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 blur-2xl transition-opacity duration-500 -z-10"
                style={{ opacity: isHovered ? 0.4 : 0.15 }}
              ></div>

              <div
                className="relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-gray-950 to-gray-900 border overflow-hidden transition-all duration-500 aspect-square"
                style={{
                  borderColor: isHovered ? 'rgba(249, 115, 22, 0.6)' : 'rgba(249, 115, 22, 0.3)',
                  transform: isHovered ? 'translateY(-12px) scale(1.05)' : 'translateY(0) scale(1)',
                  boxShadow: isHovered
                    ? '0 25px 50px -12px rgba(249, 115, 22, 0.5)'
                    : '0 10px 25px -5px rgba(249, 115, 22, 0.2)',
                }}
              >
                {/* Image / Fallback */}
                <div className="relative w-full h-3/4 flex items-center justify-center p-6 z-10">
                  {tool.image ? (
                    <img
                      src={tool.image}
                      alt={tool.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 text-lg font-semibold">
                      {tool.name}
                    </div>
                  )}
                </div>

                {/* Button */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="flex items-center justify-center gap-2 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white bg-orange-500">
                    {tool.link ? 'Explore Tool' : 'Coming Soon'}
                    {tool.link ? (
                      <ExternalLink className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </div>
                </div>

                {/* Name Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-orange-400/30">
                    <span className="text-xs font-semibold text-orange-400">
                      {tool.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="relative py-16 bg-black overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 relative z-20">

        {/* TOP TOOLS */}
        {renderTools(topTools)}

        {/* HEADING */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-orange-500">Testing</h2>
          <p className="text-gray-400 mt-2">Upcoming Game Experiences</p>
        </div>

        {/* GAME TOOLS */}
        {renderTools(gameTools, 3)}

      </div>

      {/* Modal */}
      {selectedTool && (
        <ToolModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </div>
  );
};

export default ToolButtons;
