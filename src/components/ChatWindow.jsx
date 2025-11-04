import React, { useState, useRef, useEffect } from 'react';
// 1. ADDED ICONS: ScreenShare (for screenshot), ImageUp (for upload)
import { Send, Camera, FileText, X, Upload, Sparkles, Image as ImageIcon, ScreenShare, ImageUp } from 'lucide-react';
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
import helloGif from '../assets/Hello.gif';

const languages = [
  { code: 'en', symbol: 'EN', name: 'English' },
  { code: 'te', symbol: 'తె', name: 'Telugu' },
  { code: 'kn', symbol: 'ಕ', name: 'Kannada' },
  { code: 'hi', symbol: 'हि', name: 'Hindi' },
];

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenshotActive, setIsScreenshotActive] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [sessionId] = useState(`session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  const [capturedScreenshot, setCapturedScreenshot] = useState(null);
  const [screenshotMode, setScreenshotMode] = useState(false);
  const [language, setLanguage] = useState(languages[0].code);

  // 2. NEW STATES for camera menu and image upload
  const [showCameraOptions, setShowCameraOptions] = useState(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const cameraButtonRef = useRef(null); // Ref for the camera button
  const cameraMenuRef = useRef(null); // Ref for the new menu

  // 3. NEW REF for image file input
  const imageInputRef = useRef(null);

  const API_URL = 'https://code-kivy-backend-v1.vercel.app';

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

  // 4. MODIFIED: Focus input in screenshot OR image upload mode
  useEffect(() => {
    if ((screenshotMode || uploadedImagePreview) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [screenshotMode, uploadedImagePreview]);

  // ADD SCROLL FIX EFFECT
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const stopWheelPropagation = (e) => e.stopPropagation();
    container.addEventListener('wheel', stopWheelPropagation);
    return () => container.removeEventListener('wheel', stopWheelPropagation);
  }, []);

  // 5. NEW EFFECT: Click-outside to close camera menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showCameraOptions &&
        cameraMenuRef.current &&
        !cameraMenuRef.current.contains(event.target) &&
        cameraButtonRef.current &&
        !cameraButtonRef.current.contains(event.target)
      ) {
        setShowCameraOptions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCameraOptions]);


  const isChatEmpty = messages.length === 0;

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Network response was not ok');

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

  // 6. MODIFIED handleSend to include uploaded image
  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input.trim(),
    };
    
    const selectedLang = languages.find(lang => lang.code === language);
    let messageToSend = input.trim();

    if (selectedLang && selectedLang.code !== 'en') {
      messageToSend = `${messageToSend}\n\n(Please respond in ${selectedLang.name})`;
    }

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    const currentInput = messageToSend; 
    const currentScreenshot = capturedScreenshot;
    const wasScreenshotMode = screenshotMode;
    const currentUploadedImage = uploadedImagePreview; // Get current uploaded image
    
    // Clear input and ALL image/screenshot states immediately
    setInput('');
    setCapturedScreenshot(null);
    setScreenshotMode(false);
    setUploadedImagePreview(null); // Clear uploaded image

    // Send message with screenshot OR uploaded image
    if (wasScreenshotMode && currentScreenshot) {
      await sendMessageToBackend(currentInput, currentScreenshot, null, "chat");
    } else if (currentUploadedImage) {
      // Send with uploaded image (strip metadata from base64)
      const imageBase64 = currentUploadedImage.split(',')[1];
      await sendMessageToBackend(currentInput, imageBase64, null, "chat");
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

  // 7. MODIFIED: This is now called from the new menu
  const handleCaptureScreenshot = async () => {
    if (isLoading) return;
    setShowCameraOptions(false); // Hide menu
    setIsScreenshotActive(true);
    setIsLoading(true);

    try {
      const canvas = await html2canvas(document.body, { useCORS: true, allowTaint: true });
      const imageBase64 = canvas.toDataURL('image/jpeg', 0.8);
      
      setCapturedScreenshot(imageBase64);
      setScreenshotMode(true);
      setUploadedImagePreview(null); // Ensure no conflict
      setIsLoading(false);
      
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

  // 8. NEW FUNCTION: Handle image upload from device
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload image files only (e.g., JPEG, PNG, WEBP)');
      return;
    }

    // Check file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setShowCameraOptions(false); // Hide menu
    setIsLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImagePreview(e.target.result); // This is a base64 string
        setScreenshotMode(false); // Ensure no conflict
        setIsLoading(false);
        // Add a bot message
        const uploadedMessage = {
          id: Date.now(),
          sender: 'bot',
          text: "🖼️ Image uploaded! Type your question about the image and press send.",
        };
        setMessages((prevMessages) => [...prevMessages, uploadedMessage]);
      };
      reader.readAsDataURL(file);

    } catch (error) {
      console.error("Error uploading image:", error);
      alert('Error uploading image. Please try again.');
      setIsLoading(false);
    }

    // Reset file input
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const cancelScreenshot = () => {
    setCapturedScreenshot(null);
    setScreenshotMode(false);
    setInput('');
  };

  // 9. NEW FUNCTION: Cancel uploaded image
  const cancelUploadedImage = () => {
    setUploadedImagePreview(null);
    setInput('');
  };

  // Document file upload (unchanged)
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
          name: file.name, type: file.type, data: base64Data, size: file.size
        };
        const uploadMessage = {
          id: Date.now(), sender: 'user', text: `📄 Uploaded: ${file.name}`,
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
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearDocument = async () => {
    setUploadedDocument(null);
    setActiveTab('chat');
    
    try {
      await fetch(`${API_URL}/api/document/clear?session_id=${sessionId}`, { method: 'POST' });
    } catch (error) {
      console.error("Error clearing document session:", error);
    }

    const clearMessage = {
      id: Date.now(), sender: 'bot', text: "Document cleared. Back to general chat mode! 💬",
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

  const parseMarkdown = (text) => {
    let html = text;
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang || 'python';
      const grammar = Prism.languages[language] || Prism.languages.python;
      const highlighted = Prism.highlight(code.trim(), grammar, language);
      return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
    });
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/^[•\-\*] (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);
    html = html.replace(/\n/g, '<br>');
    return html;
  };

  // 10. NEW VARIABLE: Check if any image mode is active
  const isImageModeActive = screenshotMode || !!uploadedImagePreview;

  return (
    <>
      {isScreenshotActive && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center text-white text-lg font-semibold animate-pulse">
          📸 Capturing screen...
        </div>
      )}

      <div className="fixed bottom-4 right-4 left-4 md:bottom-24 md:right-6 md:left-auto z-50 
                      md:w-[28rem] h-[70vh] md:h-[75vh] 
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
                <p className="text-xs text-gray-400 truncate w-32 sm:w-48">
                  {uploadedDocument ? `📄 ${uploadedDocument.name}` : 'Python Assistant'}
                </p>
              </div>
            </div>
            
            <button
              onClick={uploadedDocument ? clearDocument : () => onClose && onClose()}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              title={uploadedDocument ? "Clear document & return to chat" : "Close chat window"}
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* 11. MODIFIED: Image Mode Indicator (handles both screenshot and upload) */}
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
        
        {/* 12. NEW: Uploaded Image Preview Bar */}
        {uploadedImagePreview && !screenshotMode && (
          <div className="bg-blue-500/20 px-4 py-3 border-b border-blue-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={uploadedImagePreview} 
                  alt="Upload preview"
                  className="w-8 h-8 rounded-md object-cover border border-blue-400/50"
                />
                <p className="text-sm text-blue-300 font-medium">
                  Image ready! Ask your question below.
                </p>
              </div>
              <button
                onClick={cancelUploadedImage}
                className="p-1 hover:bg-blue-500/20 rounded-full transition-colors"
                title="Cancel image upload"
              >
                <X className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>
        )}


        {/* Mode Indicator */}
        {activeTab === 'document' && !isImageModeActive && (
          <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <FileText className="w-3 h-3 text-orange-500" />
              {uploadedDocument ? "Ask questions about your document" : "Upload a document to start"}
            </p>
          </div>
        )}

        {/* Messages Container */}
        <div 
          ref={messagesContainerRef} 
          className="flex-grow p-4 overflow-y-auto custom-scrollbar relative"
        >
          {isChatEmpty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <img 
                  src={helloGif} 
                  alt="Hello" 
                  className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 opacity-70"
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
                  className={`max-w-[85%] sm:max-w-[80%] px-4 py-3 rounded-2xl text-sm overflow-hidden ${
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
          <div className="flex items-center gap-1 sm:gap-2 mb-2 relative">
            
            {/* 13. NEW: Camera Options Menu */}
            {showCameraOptions && (
              <div
                ref={cameraMenuRef}
                className="absolute bottom-12 left-14 mb-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 overflow-hidden"
              >
                <button
                  onClick={handleCaptureScreenshot}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-gray-700"
                >
                  <ScreenShare className="w-4 h-4 text-orange-400" />
                  Screenshot
                </button>
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-gray-700"
                >
                  <ImageUp className="w-4 h-4 text-orange-400" />
                  Upload Image
                </button>
              </div>
            )}

            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || isImageModeActive} // 14. MODIFIED: Disable if image mode is active
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-xl 
                        transition-all shadow-lg active:scale-95 disabled:opacity-50
                        border border-gray-700 hover:border-orange-500/50"
              title="Upload document (PDF, TXT, DOCX)"
            >
              <Upload className="h-4 w-4 text-orange-400" />
            </button>

            {/* 15. MODIFIED: Camera button now toggles the menu */}
            <button 
              ref={cameraButtonRef}
              onClick={() => setShowCameraOptions(!showCameraOptions)}
              disabled={isLoading || isImageModeActive} // Disable if image mode is active
              className={`p-2 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50
                        border ${isImageModeActive ? 'bg-orange-500/20 border-orange-500' : 'bg-gray-800 hover:bg-gray-700 border-gray-700 hover:border-orange-500/50'}
                        ${showCameraOptions ? 'bg-gray-700 border-orange-500/50' : ''}`}
              title="Capture screenshot or upload image"
            >
              <Camera className={`h-4 w-4 ${isImageModeActive ? 'text-orange-400' : 'text-orange-400'}`} />
            </button>

            {/* Input Wrapper with Language Select */}
            <div className={`flex-grow min-w-0 flex items-center border rounded-xl 
                            bg-gray-800 text-white transition-all 
                            ${isImageModeActive ? 'border-orange-500/50' : 'border-gray-700'} 
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                            focus-within:ring-2 focus-within:ring-orange-500/50 focus-within:border-orange-500/50`}
            >
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={isLoading}
                className="bg-transparent text-orange-400 font-bold
                           pl-3 pr-2 py-2.5 outline-none appearance-none
                           cursor-pointer text-sm"
                title="Select language"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-gray-900 text-white font-medium">
                    {lang.symbol}
                  </option>
                ))}
              </select>

              <div className="h-4 w-px bg-gray-700 mx-1"></div>

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                // 16. MODIFIED: Updated placeholder logic
                placeholder={
                  screenshotMode 
                    ? "What do you want to know about the screenshot?"
                    : uploadedImagePreview
                    ? "Ask about the uploaded image..."
                    : isLoading 
                      ? "Processing..." 
                      : activeTab === 'document' 
                        ? "Ask about the document..." 
                        : "Ask me anything..."
                }
                className="flex-grow min-w-0 px-2 py-2.5 text-sm outline-none 
                           bg-transparent text-white placeholder:text-gray-500"
                disabled={isLoading}
              />
            </div>

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
            {/* 17. MODIFIED: Updated footer text logic */}
            {screenshotMode ? "Screenshot attached • Type your question" 
              : uploadedImagePreview ? "Image attached • Type your question"
              : "Supports: PDF, TXT, DOCX • Max 10MB"}
          </p>
        </div>

        {/* Document file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* 18. NEW: Image file input */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1f2937; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f97316; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #fb923c; }
        
        .bot-message strong { color: #fbbf24; font-weight: 600; }
        .bot-message em { color: #93c5fd; font-style: italic; }
        .bot-message h1, .bot-message h2, .bot-message h3 { color: #f97316; font-weight: bold; margin: 0.5rem 0; }
        .bot-message h1 { font-size: 1.25rem; }
        .bot-message h2 { font-size: 1.1rem; }
        .bot-message h3 { font-size: 1rem; }
        .bot-message ul { margin: 0.5rem 0; padding-left: 0; list-style: none; }
        .bot-message li { padding-left: 1.5rem; position: relative; margin: 0.25rem 0; }
        .bot-message li:before { content: "•"; position: absolute; left: 0.5rem; color: #f97316; font-weight: bold; }
        .bot-message .inline-code { background: #374151; color: #fbbf24; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-family: 'Fira Code', 'Courier New', monospace; font-size: 0.9em; }
        .bot-message pre { background: #1e1e1e !important; border-radius: 0.5rem; padding: 0.75rem; overflow-x: auto; margin: 0.75rem 0; border: 1px solid #374151; }
        .bot-message pre code { font-family: 'Fira Code', 'Courier New', monospace; font-size: 0.85rem; line-height: 1.5; display: block; }
        .bot-message br { display: block; content: ""; margin: 0.25rem 0; }
      `}</style>
    </>
  );
};

export default ChatWindow;
