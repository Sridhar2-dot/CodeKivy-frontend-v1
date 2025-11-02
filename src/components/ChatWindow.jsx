import React, { useState, useRef, useEffect } from 'react';
import { Send, Camera, FileText, X, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import Prism from 'prismjs';

// Import Prism CSS theme
import 'prismjs/themes/prism-tomorrow.css';

// Import language components
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-sql';

// Import the Hello GIF
import helloGif from '../assets/Hello.webp';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "👋 Hello! I'm KivyBot. I can help you with:\n• Python questions\n• Code analysis\n• Document analysis (upload PDF, TXT, DOCX)\n• Screenshot analysis" },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenshotActive, setIsScreenshotActive] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [sessionId] = useState(`session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  const [capturedScreenshot, setCapturedScreenshot] = useState(null);
  const [screenshotMode, setScreenshotMode] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  // Environment variable for API URL
  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when loading completes
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isLoading]);

  // Focus input when screenshot mode is activated
  useEffect(() => {
    if (screenshotMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [screenshotMode]);

  // Check if chat is empty (only initial bot message)
  const isChatEmpty = messages.length === 1;

  const sendMessageToBackend = async (messageText, imageBase64 = null, documentData = null, modeOverride = null) => {
    setIsLoading(true);
    try {
      const payload = {
        message: messageText,
        image: imageBase64,
        document: documentData,
        mode: modeOverride || activeTab,
        session_id: sessionId
      };

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botResponse = {
        id: Date.now(),
        sender: 'bot',
        text: data.response,
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);

      if (data.document_loaded) {
        setUploadedDocument({
          name: documentData.name,
          size: documentData.size,
          type: documentData.type
        });
        setActiveTab('document');
      }

    } catch (error) {
      console.error("Error fetching chat response:", error);
      const errorResponse = {
        id: Date.now(),
        sender: 'bot',
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const currentInput = input.trim();
    const currentScreenshot = capturedScreenshot;
    const wasScreenshotMode = screenshotMode;
    
    // Clear input and screenshot state immediately
    setInput('');
    setCapturedScreenshot(null);
    setScreenshotMode(false);

    // Send message with screenshot if in screenshot mode
    if (wasScreenshotMode && currentScreenshot) {
      await sendMessageToBackend(currentInput, currentScreenshot, null, "chat");
    } else {
      await sendMessageToBackend(currentInput, null, null, null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCaptureScreenshot = async () => {
    if (isLoading) return;
    setIsScreenshotActive(true);
    setIsLoading(true);

    try {
      const canvas = await html2canvas(document.body, { useCORS: true, allowTaint: true });
      const imageBase64 = canvas.toDataURL('image/jpeg', 0.8);
      
      // Store screenshot and enter screenshot mode
      setCapturedScreenshot(imageBase64);
      setScreenshotMode(true);
      setIsLoading(false);
      
      // Show screenshot captured message
      const capturedMessage = {
        id: Date.now(),
        sender: 'bot',
        text: "📸 Screenshot captured! Type your question about the screenshot and press send.",
      };
      setMessages((prevMessages) => [...prevMessages, capturedMessage]);

    } catch (error) {
      console.error("Error capturing screenshot:", error);
      const errorMessage = {
        id: Date.now(),
        sender: 'bot',
        text: "❌ Error capturing screenshot. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setIsLoading(false);
    } finally {
      setIsScreenshotActive(false);
    }
  };

  const cancelScreenshot = () => {
    setCapturedScreenshot(null);
    setScreenshotMode(false);
    setInput('');
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.txt') && !file.name.endsWith('.docx')) {
      alert('Please upload PDF, TXT, or DOCX files only');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setIsLoading(true);
    setActiveTab('document');

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target.result;
        
        const documentData = {
          name: file.name,
          type: file.type,
          data: base64Data,
          size: file.size
        };

        const uploadMessage = {
          id: Date.now(),
          sender: 'user',
          text: `📄 Uploaded: ${file.name}`,
        };
        setMessages((prev) => [...prev, uploadMessage]);

        await sendMessageToBackend("Please process and summarize this document.", null, documentData, "document");
      };
      reader.readAsDataURL(file);

    } catch (error) {
      console.error("Error uploading file:", error);
      alert('Error uploading file. Please try again.');
      setIsLoading(false);
      setActiveTab('chat');
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearDocument = async () => {
    setUploadedDocument(null);
    setActiveTab('chat');
    
    try {
      await fetch(`${API_URL}/api/document/clear?session_id=${sessionId}`, {
        method: 'POST'
      });
    } catch (error) {
      console.error("Error clearing document session:", error);
    }

    const clearMessage = {
      id: Date.now(),
      sender: 'bot',
      text: "Document cleared. Back to general chat mode! 💬",
    };
    setMessages((prev) => [...prev, clearMessage]);
  };
  
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/api/document/status?session_id=${sessionId}`);
        const data = await response.json();
        if (data.has_document) {
          setUploadedDocument({ name: "Loaded document" });
          setActiveTab('document');
        }
      } catch (error) {
        console.log("Could not check document status");
      }
    };
    checkStatus();
  }, [sessionId, API_URL]);

  // Enhanced markdown parser that handles bold, code blocks, inline code, and lists
  const parseMarkdown = (text) => {
    let html = text;

    // Parse code blocks FIRST (```language\ncode```)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang || 'python';
      const grammar = Prism.languages[language] || Prism.languages.python;
      const highlighted = Prism.highlight(code.trim(), grammar, language);
      return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
    });

    // Parse inline code (`code`)
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Parse bold (**text** or __text__)
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    // Parse italic (*text* or _text_)
    html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Parse headers (## Header)
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Parse bullet points (• or - or *)
    html = html.replace(/^[•\-\*] (.+)$/gim, '<li>$1</li>');
    
    // Wrap consecutive <li> tags in <ul>
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

    // Parse line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  };

  return (
    <>
      {isScreenshotActive && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center text-white text-lg font-semibold animate-pulse">
          📸 Capturing screen...
        </div>
      )}

      <div className="fixed bottom-24 right-6 z-50 w-[28rem] h-[75vh] 
                      bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl 
                      flex flex-col border border-gray-800
                      transition-all duration-300 hover:shadow-gray-700/30">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-t-2xl border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">KivyBot</h3>
                <p className="text-xs text-gray-400 truncate w-48">
                  {uploadedDocument ? `📄 ${uploadedDocument.name}` : 'Python Assistant'}
                </p>
              </div>
            </div>
            {uploadedDocument && (
              <button
                onClick={clearDocument}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                title="Clear document"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Screenshot Mode Indicator */}
        {screenshotMode && (
          <div className="bg-orange-500/20 px-4 py-3 border-b border-orange-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-orange-400 animate-pulse" />
                <p className="text-sm text-orange-300 font-medium">
                  Screenshot ready! Ask your question below.
                </p>
              </div>
              <button
                onClick={cancelScreenshot}
                className="p-1 hover:bg-orange-500/20 rounded-full transition-colors"
                title="Cancel screenshot"
              >
                <X className="w-4 h-4 text-orange-400" />
              </button>
            </div>
          </div>
        )}

        {/* Mode Indicator */}
        {activeTab === 'document' && !screenshotMode && (
          <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <FileText className="w-3 h-3 text-orange-500" />
              {uploadedDocument ? "Ask questions about your document" : "Upload a document to start"}
            </p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto custom-scrollbar relative">
          {isChatEmpty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <img 
                  src={helloGif} 
                  alt="Hello" 
                  className="w-48 h-48 mx-auto mb-4 opacity-70"
                />
                <p className="text-gray-500 text-sm">Start chatting to get help!</p>
              </div>
            </div>
          )}

          <div className={isChatEmpty ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm overflow-hidden ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-br-md shadow-lg shadow-orange-500/20 whitespace-pre-wrap'
                      : 'bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700 bot-message'
                  }`}
                >
                  {msg.sender === 'bot' ? (
                    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }} />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-3 rounded-2xl rounded-bl-md text-sm flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span>KivyBot is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-800 bg-gradient-to-b from-gray-900 to-black rounded-b-2xl">
          <div className="flex items-center gap-2 mb-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || screenshotMode}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-xl 
                         transition-all shadow-lg active:scale-95 disabled:opacity-50
                         border border-gray-700 hover:border-orange-500/50"
              title="Upload document (PDF, TXT, DOCX)"
            >
              <Upload className="h-4 w-4 text-orange-400" />
            </button>

            <button 
              onClick={handleCaptureScreenshot}
              disabled={isLoading || screenshotMode}
              className={`p-2 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50
                         border ${screenshotMode ? 'bg-orange-500/20 border-orange-500' : 'bg-gray-800 hover:bg-gray-700 border-gray-700 hover:border-orange-500/50'}`}
              title="Capture screenshot"
            >
              <Camera className={`h-4 w-4 ${screenshotMode ? 'text-orange-400' : 'text-orange-400'}`} />
            </button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                screenshotMode 
                  ? "What do you want to know about the screenshot?" 
                  : isLoading 
                    ? "Processing..." 
                    : activeTab === 'document' 
                      ? "Ask about the document..." 
                      : "Ask me anything..."
              }
              className={`flex-grow px-4 py-2.5 border rounded-xl
                         text-sm outline-none bg-gray-800 text-white 
                         focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50
                         placeholder:text-gray-500 disabled:opacity-50 transition-all
                         ${screenshotMode ? 'border-orange-500/50' : 'border-gray-700'}`}
              disabled={isLoading}
            />

            <button 
              onClick={handleSend}
              disabled={isLoading || input.trim() === ''}
              className="p-2.5 bg-gradient-to-br from-orange-500 to-orange-600 
                         hover:from-orange-600 hover:to-orange-700 rounded-xl 
                         transition-all shadow-lg shadow-orange-500/20 active:scale-95 
                         disabled:opacity-50 disabled:from-gray-700 disabled:to-gray-700"
              title="Send message"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>

          <p className="text-xs text-gray-600 text-center">
            {screenshotMode ? "Screenshot attached • Type your question" : "Supports: PDF, TXT, DOCX • Max 10MB"}
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #fb923c;
        }
        
        /* Bot message styling */
        .bot-message strong {
          color: #fbbf24;
          font-weight: 600;
        }
        
        .bot-message em {
          color: #93c5fd;
          font-style: italic;
        }
        
        .bot-message h1, .bot-message h2, .bot-message h3 {
          color: #f97316;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        
        .bot-message h1 { font-size: 1.25rem; }
        .bot-message h2 { font-size: 1.1rem; }
        .bot-message h3 { font-size: 1rem; }
        
        .bot-message ul {
          margin: 0.5rem 0;
          padding-left: 0;
          list-style: none;
        }
        
        .bot-message li {
          padding-left: 1.5rem;
          position: relative;
          margin: 0.25rem 0;
        }
        
        .bot-message li:before {
          content: "•";
          position: absolute;
          left: 0.5rem;
          color: #f97316;
          font-weight: bold;
        }
        
        /* Inline code styling */
        .bot-message .inline-code {
          background: #374151;
          color: #fbbf24;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.9em;
        }
        
        /* Code block styling */
        .bot-message pre {
          background: #1e1e1e !important;
          border-radius: 0.5rem;
          padding: 0.75rem;
          overflow-x: auto;
          margin: 0.75rem 0;
          border: 1px solid #374151;
        }
        
        .bot-message pre code {
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.85rem;
          line-height: 1.5;
          display: block;
        }
        
        .bot-message br {
          display: block;
          content: "";
          margin: 0.25rem 0;
        }
      `}</style>
    </>
  );
};

export default ChatWindow;