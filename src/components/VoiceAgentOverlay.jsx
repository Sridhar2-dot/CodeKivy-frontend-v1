import React, { useState, useRef, useEffect } from 'react';
// 1. Mic and Square are now both used
import { X, Mic, Square, Loader2 } from 'lucide-react'; 
import { useReactMediaRecorder } from 'react-media-recorder';

import animation from '../assets/animation.mp4'
import voiceSound from '../assets/Voice.mp3';
import blob from '../assets/Blob.gif' // This is the main button graphic

// Helper to decode Base64 audio
const b64toBlob = (b64Data, contentType = 'audio/wav', sliceSize = 512) => {
  try {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  } catch (error) {
    console.error('Error decoding base64 audio:', error);
    return null;
  }
};

export const VoiceAgentOverlay = ({ onClose }) => {
  const [statusText, setStatusText] = useState('Press to speak');
  const [transcript, setTranscript] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [showGif, setShowGif] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);
  const voiceSoundRef = useRef(null);
  const hasPlayedVoice = useRef(false);

  // Environment variable for API URL
  // const API_URL = 'https://code-kivy-backend-v1.vercel.app';

    // Environment variable for API URL
  const API_URL = 'https://code-kivy-backend-v1.vercel.app';

  // Main voice processing function
  const handleVoiceStop = async (blobUrl, blob) => {
    console.log('🎤 Recording stopped, processing audio...');
    setStatusText('Processing...');
    setIsProcessing(true);
    setIsBotSpeaking(false);
    setError(null);

    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');

    try {
      console.log('📤 Sending audio to backend...');
      const response = await fetch(`${API_URL}/api/voice`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📥 Response received:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.transcript || !data.text_response || !data.audio_response_b64) {
        throw new Error('Incomplete response from server');
      }

      setTranscript(data.transcript);
      setBotResponse(data.text_response);
      setStatusText('Speaking...');
      setIsProcessing(false);

      console.log('🔊 Decoding audio response...');
      const audioBlob = b64toBlob(data.audio_response_b64, 'audio/wav');
      
      if (!audioBlob) {
        throw new Error('Failed to decode audio');
      }

      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        
        audioRef.current.onloadeddata = () => {
          console.log('✅ Audio loaded, playing...');
          audioRef.current.play().catch(err => {
            console.error('Error playing audio:', err);
            setError('Failed to play audio response');
            setIsBotSpeaking(false);
            setStatusText('Press to speak');
          });
        };

        audioRef.current.onplay = () => {
          console.log('▶️ Audio playing');
          setIsBotSpeaking(true);
        };

        audioRef.current.onended = () => {
          console.log('⏹️ Audio finished');
          setStatusText('Press to speak');
          setIsBotSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };

        audioRef.current.onerror = (e) => {
          console.error('Audio playback error:', e);
          setError('Failed to play audio response');
          setIsBotSpeaking(false);
          setStatusText('Press to speak');
          URL.revokeObjectURL(audioUrl);
        };
      }

    } catch (error) {
      console.error('❌ Error processing voice:', error);
      setStatusText('Error occurred');
      setError(error.message);
      setTranscript('');
      setBotResponse('');
      setIsProcessing(false);
      setIsBotSpeaking(false);
    }
  };

  const {
    status,
    startRecording,
    stopRecording,
  } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: { type: 'audio/webm' },
    onStop: handleVoiceStop,
    askPermissionOnMount: true,
  });

  const isRecording = status === 'recording';

  const handleMicButtonClick = () => {
    if (isRecording) {
      console.log('⏸️ Stopping recording...');
      stopRecording();
      setStatusText('Processing...');
    } else if (!isProcessing && !isBotSpeaking) {
      console.log('🎙️ Starting recording...');
      
      // Hide GIF and mark as started
      if (!hasStarted) {
        setHasStarted(true);
      }
      setShowGif(false);
      
      setTranscript('');
      setBotResponse('');
      setError(null);
      setStatusText('Listening...');
      startRecording();
    }
  };

  // 1. MODIFIED: This function now returns null to remove the background animations
  const getWaveAnimation = () => {
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-black backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center gap-4 relative border border-gray-700/50">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10 p-2 hover:bg-gray-800/50 rounded-full"
          aria-label="Close voice assistant"
        >
          <X size={20} />
        </button>

        {/* Main Content Area */}
        <div className="w-full flex flex-col items-center gap-6">
          
          {/* Hello GIF - Shows only before first interaction */}
          {showGif && (
            <div className="flex items-center justify-center mb-4 w-full">
              <video 
                src={animation} 
                autoPlay
                loop={false}
                playsInline
                onTimeUpdate={(e) => {
                  // Play voice sound at 4.5 seconds after video starts
                  if (e.target.currentTime >= 6 && !hasPlayedVoice.current) {
                    console.log('📹 Video reached 4.5s, playing voice sound...');
                    hasPlayedVoice.current = true;
                    if (voiceSoundRef.current) {
                      voiceSoundRef.current.play().catch(err => console.log('Sound playback error:', err));
                    }
                  }
                }}
                className="w-60 h-auto object-contain drop-shadow-2xl rounded-xl"
              />
            </div>
          )}

          {/* Voice Visualizer / Mic Button Container */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            
            {/* Wave Animations (This function now returns null) */}
            {getWaveAnimation()}

            {/* --- MODIFIED Main Mic Button --- */}
            {/* This button's content and style are now dynamic based on state */}
            <button
              onClick={handleMicButtonClick}
              disabled={isProcessing || isBotSpeaking}
              className={`
                relative z-10 transition-all duration-300
                flex items-center justify-center overflow-hidden shadow-2xl disabled:opacity-70
                
                ${
                  isRecording
                    ? 'w-32 h-32' // State: Recording. Larger, no bg, no rounded.
                    : 'w-24 h-24 rounded-full' // State: Idle, Processing, or Speaking.
                }
                
                ${
                  isProcessing || isBotSpeaking
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800 cursor-wait' // BG for loaders
                    : ''
                }
                
                ${
                  isRecording
                    ? 'scale-110' // Scale up the blob
                    : ''
                }
                
                ${
                  !isRecording && !isProcessing && !isBotSpeaking
                    ? 'bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]' // BG for Mic
                    : ''
                }
              `}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isProcessing ? (
                <Loader2 size={36} className="text-white animate-spin" />
              ) : isBotSpeaking ? (
                <Loader2 size={36} className="text-white animate-spin" />
              ) : isRecording ? (
                // 2. MODIFIED: Added a wrapper and an overlay for the stop button
                <>
                  <img 
                    src={blob} 
                    alt="Recording animation" 
                    className="w-full h-full object-cover" // Fills the new w-32 h-32
                  />
                  {/* This is the new "Stop" button visual */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs"
                    aria-hidden="true" // It's just a visual cue, parent button handles click
                  >
                    <Square size={32} className="text-white" fill="white" />
                  </div>
                </>
              ) : (
                <Mic size={32} className="text-white" />
              )}
            </button>
            {/* --- END MODIFICATION --- */}
          </div>

          {/* Status Text */}
          <h2 className="text-lg font-medium bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-center -mt-2">
            {statusText}
          </h2>

          {/* Transcript & Response */}
          {(transcript || botResponse || error) && (
            <div className="w-full max-h-40 overflow-y-auto space-y-3 p-4 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl backdrop-blur-sm border border-gray-700/30">
              {error && (
                <div className="animate-fade-in">
                  <p className="text-red-400 text-sm">
                    {error}
                  </p>
                </div>
              )}
              {transcript && (
                <div className="animate-fade-in p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
                  <p className="text-gray-300 text-sm">
                    <span className="text-green-400 font-semibold">You:</span> {transcript}
                  </p>
                </div>
              )}
              {botResponse && (
                <div className="animate-fade-in p-3 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30">
                  <p className="text-blue-100 text-sm">
                    <span className="text-blue-400 font-semibold">KivyBot:</span> {botResponse}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="text-center text-gray-400 text-xs">
            {isRecording ? (
              <p className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Speak now • Click to stop
              </p>
            ) : isProcessing ? (
              <p>Processing your request...</p>
            ) : isBotSpeaking ? (
              <p className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Listening to response...
              </p>
            ) : (
              <p>Tap the microphone to ask anything</p>
            )}
          </div>
        </div>

        {/* Hidden Audio Players */}
        <audio ref={audioRef} className="hidden" preload="auto" />
        <audio ref={voiceSoundRef} src={voiceSound} className="hidden" preload="auto" />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.08);
          }
        }
        .animate-pulse-slower {
          animation: pulse-slower 3s ease-in-out infinite;
        }

        @keyframes soundwave {
          0%, 100% {
            height: 20%;
          }
          50% {
            height: 60%;
          }
        }
        .animate-soundwave {
          animation: soundwave 0.8s ease-in-out infinite;
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(50px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(50px) rotate(-360deg);
          }
        }
        .animate-orbit {
          animation: orbit 3s linear infinite;
        }

        @keyframes pulse-ring {
          0% {
            opacity: 0.6;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.3;
            transform: scale(1);
          }
          100% {
            opacity: 0.6;
            transform: scale(0.8);
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        *::-webkit-scrollbar {
          width: 4px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 2px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </div>
  );
};
