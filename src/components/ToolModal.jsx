import React, { useEffect, useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

export const ToolModal = ({ tool, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Prevent body scroll when modal is open and handle Escape key
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Timeout fallback if iframe doesn't load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setLoadError(true);
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      style={{
        animation: 'fadeIn 0.3s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col relative border border-orange-500/20"
        style={{
          animation: 'zoomIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">{tool.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Open in New Tab Button */}
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-medium transition-all duration-200 hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Open in New Tab</span>
            </a>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
              aria-label="Close tool"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 relative overflow-hidden rounded-b-2xl">
          <iframe
            src={tool.link}
            className="w-full h-full border-0"
            title={tool.name}
            allow="camera; microphone; geolocation; encrypted-media; autoplay"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation allow-presentation"
            onLoad={handleIframeLoad}
          />

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="text-center">
                <div className="loader mx-auto mb-4"></div>
                <p className="text-gray-400 text-sm">Loading {tool.name}...</p>
                {loadError && (
                  <p className="text-orange-400 text-xs mt-2">Taking longer than expected...</p>
                )}
              </div>
            </div>
          )}

          {/* Error Message */}
          {loadError && !isLoading && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-10">
              <div className="text-center p-6 max-w-md">
                <p className="text-gray-300 mb-4">
                  The tool may not load properly in this view due to security restrictions.
                </p>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-200 hover:scale-105"
                >
                  <ExternalLink className="h-5 w-5" />
                  Open in New Tab
                </a>
                <button
                  onClick={onClose}
                  className="block mt-4 text-gray-400 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-3 sm:p-4 border-t border-gray-800/50 bg-black/50">
          <p className="text-xs text-gray-500 text-center">
            Tip: If the tool doesn't load properly, click "Open in New Tab" for the best experience
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Custom Loader Animation */
        .loader {
          width: 50px;
          aspect-ratio: 1;
          display: grid;
          animation: l14 4s infinite;
        }
        .loader::before,
        .loader::after {    
          content: "";
          grid-area: 1/1;
          border: 8px solid;
          border-radius: 50%;
          border-color: #f97316 #f97316 #0000 #0000; /* Orange color */
          mix-blend-mode: darken;
          animation: l14 1s infinite linear;
        }
        .loader::after {
          border-color: #0000 #0000 #ffffff #ffffff; /* White color */
          animation-direction: reverse;
        }
        @keyframes l14{ 
          100%{transform: rotate(1turn)}
        }
      `}</style>
    </div>
  );
};

