import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import DeployButton from './DeployButton';
import ChatHistory from './ChatHistory';
import { 
  Play, 
  Download, 
  Copy, 
  Loader2, 
  Eye,
  EyeOff,
  Sparkles,
  FileCode,
  Palette,
  Zap,
  History,
  MessageSquare,
  Maximize,
  Minimize,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

interface GeneratedCode {
  html: string;
  css: string;
  js: string;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  prompt: string;
  generatedCode: GeneratedCode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CodeGeneratorProps {}

export interface CodeGeneratorRef {
  toggleHistory: () => void;
}

const CodeGenerator = forwardRef<CodeGeneratorRef, CodeGeneratorProps>((_props, ref) => {
  // States
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode>({ html: '', css: '', js: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [error, setError] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [needsPreviewUpdate, setNeedsPreviewUpdate] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Refs
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const generatedSectionRef = useRef<HTMLDivElement>(null);

  // ✅ VITE ke liye sahi tarika - import.meta.env use karo
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  // Debug: Check if API keys are loaded
  useEffect(() => {
    console.log('🔑 Gemini API Key:', GEMINI_API_KEY ? '✅ Loaded' : '❌ Missing');
    console.log('🔑 Pexels API Key:', PEXELS_API_KEY ? '✅ Loaded' : '❌ Missing');
    
    if (!GEMINI_API_KEY) {
      setError('⚠️ Gemini API Key missing! Add VITE_GEMINI_API_KEY in .env file');
    }
    if (!PEXELS_API_KEY) {
      console.warn('⚠️ Pexels API Key missing! Using fallback image');
    }
  }, [GEMINI_API_KEY, PEXELS_API_KEY]);
  
  useImperativeHandle(ref, () => ({
    toggleHistory: () => {
      setShowChatHistory(prev => !prev);
    }
  }));

  // Fetch image from Pexels
  const fetchPexelsImage = async (query: string): Promise<string> => {
    const fallbackImage = "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg";
    
    if (!PEXELS_API_KEY) {
      console.warn('Pexels API key not found, using fallback image');
      return fallbackImage;
    }

    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, 
        {
          headers: {
            Authorization: PEXELS_API_KEY
          }
        }
      );
      
      if (!res.ok) {
        throw new Error(`Pexels API error: ${res.status}`);
      }
      
      const data = await res.json() as { photos?: Array<{ src: { large: string } }> };
      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.large;
      }
    } catch (err) {
      console.error("Error fetching Pexels image:", err);
    }
    return fallbackImage;
  };

  // Load chat sessions from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    if (savedSessions) {
      try { 
        const parsed = JSON.parse(savedSessions);
        if (Array.isArray(parsed)) {
          const sessions = parsed.map((session: ChatSession) => ({
            ...session,
            timestamp: new Date(session.timestamp)
          }));
          setChatSessions(sessions.slice(0, 10));
        }
      } catch (error) {
        console.error('Error loading chat sessions:', error);
      }
    }
  }, []);
  
  // Save chat sessions to localStorage
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions.slice(0, 10)));
    }
  }, [chatSessions]);

  // Update iframe preview
  const updatePreview = useCallback(() => {
    if (!iframeRef.current) return;

    const { html, css, js } = generatedCode;

    const safeHtml = html.replace(
      /<img\s+[^>]*src="([^"]+)"[^>]*>/g,
      (match, src) => {
        if (!src.startsWith('http')) {
          const fallback = 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg';
          return match.replace(src, fallback);
        }
        return match;
      }
    );

    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated Website</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${safeHtml}
        <script>
          ${js}
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;
  }, [generatedCode]);

  // Update preview when needed
  useEffect(() => {
    if (needsPreviewUpdate && showPreview && iframeRef.current) {
      updatePreview();
      setNeedsPreviewUpdate(false);
    }
  }, [needsPreviewUpdate, showPreview, updatePreview]);

  // Auto-scroll during streaming
  useEffect(() => {
    if (isStreaming && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [streamingText, isStreaming]);

  // Main code generation function
  const generateCode = async () => {
    if (!prompt.trim()) return;

    // Check if API key exists
    if (!GEMINI_API_KEY) {
      setError('❌ Gemini API Key missing! Please add VITE_GEMINI_API_KEY in your .env file');
      return;
    }

    setStreamingText('');
    setGeneratedCode({ html: '', css: '', js: '' });
    setShowPreview(true);
    setIsGenerating(true);
    setError('');
    setIsStreaming(true);

    try {
      const imageURL = await fetchPexelsImage(prompt);

      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      
      // ✅ FIXED: Changed from "gemini-2.0-flash-exp" to "gemini-2.5-flash-lite"
      // This model has better free tier quota limits
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

      const systemPrompt = `You are an expert web developer. Generate clean, modern, and functional HTML, CSS, and JavaScript code based on the user's request.

Rules:
1. Always provide complete, working code
2. Use modern CSS with flexbox/grid for layouts
3. Make designs responsive and visually appealing
4. Include proper semantic HTML
5. Add interactive JavaScript when appropriate
6. Use modern ES6+ JavaScript syntax
7. Ensure cross-browser compatibility
8. Use only the following image in your output: ${imageURL}
9. Only use standard Font Awesome CDN. Do NOT generate or repeat integrity values manually.
10. Ensure proper contrast between background and text colors for readability.
11. While creating any application, provide detailed HTML, CSS, and JS with all aspects covered.

Format your response EXACTLY like this:
HTML:
\`\`\`html
[HTML code here]
\`\`\`

CSS:
\`\`\`css
[CSS code here]
\`\`\`

JavaScript:
\`\`\`javascript
[JavaScript code here]
\`\`\`

User Request: ${prompt}`;

      const result = await model.generateContentStream(systemPrompt);
      let fullText = '';

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
        setStreamingText(fullText);
      }

      // Parse the generated code
      const htmlMatch = fullText.match(/HTML:\s*```html\s*([\s\S]*?)\s*```/i);
      const cssMatch = fullText.match(/CSS:\s*```css\s*([\s\S]*?)\s*```/i);
      const jsMatch = fullText.match(/JavaScript:\s*```javascript\s*([\s\S]*?)\s*```/i);

      const code = {
        html: htmlMatch ? htmlMatch[1].trim() : '',
        css: cssMatch ? cssMatch[1].trim() : '',
        js: jsMatch ? jsMatch[1].trim() : ''
      };

      setGeneratedCode(code);

      // Save to chat history
      const newSession = {
        id: Date.now().toString(),
        title: prompt.slice(0, 50) + (prompt.length > 50 ? '...' : ''),
        timestamp: new Date(),
        prompt,
        generatedCode: code
      };

      setChatSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
      setShowPreview(true);
      setNeedsPreviewUpdate(true);
      setPrompt('');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError(`Failed to generate code: ${errorMessage}`);
      console.error('Error generating code:', err);
    } finally {
      setIsGenerating(false);
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    if (generatedCode.html && (showPreview || isFullscreen)) {
      updatePreview();
    }
  }, [generatedCode, showPreview, isFullscreen, updatePreview]);

  // Copy to clipboard
  const copyToClipboard = async (code: string, type: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
      alert("Copy failed. Please copy manually.");
    }
  };

  // Download code
  const downloadCode = () => {
    const { html, css, js } = generatedCode;
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
  <script>
${js}
  </script>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-website.html';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Load chat session
  const loadChatSession = (session: ChatSession) => {
    setPrompt('');
    setGeneratedCode(session.generatedCode);
    setCurrentSessionId(session.id);
    setStreamingText('');
    setError('');
    setShowPreview(true);
    setShowChatHistory(false);
    setNeedsPreviewUpdate(true);

    setTimeout(() => {
      generatedSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  // Delete chat session
  const deleteChatSession = (sessionId: string) => {
    setChatSessions(prev => prev.filter(session => session.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
      setGeneratedCode({ html: '', css: '', js: '' });
      setPrompt('');
      setShowPreview(true);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(true);
    setTimeout(() => updatePreview(), 100);
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    setTimeout(() => {
      document.getElementById('ai-builder')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const examplePrompts = [
    "Create a modern landing page for a coffee shop with hero section and menu",
    "Build a responsive portfolio website with dark theme and animations",
    "Design a calculator app with modern UI and full functionality",
    "Create a todo list app with add, delete, and mark complete features",
    "Build a weather dashboard with cards and modern design"
  ];

  return (
    <section id="ai-builder" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 min-h-screen">
      <style>{`
        .purple-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .purple-pink-gradient {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
        }
        .slate-gradient {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }
        .emerald-blue-gradient {
          background: linear-gradient(135deg, rgba(5, 150, 105, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%);
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="text-center flex-1">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              AI Website Builder
              <span className="text-purple-400"> Live Studio</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the power of AI-driven web development. Describe your vision and watch as our AI creates beautiful, functional websites in seconds.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowChatHistory(prev => !prev)}
              className="flex items-center space-x-2 purple-gradient text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              <History className="w-5 h-5" />
              <span className="font-medium">History</span>
              <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-sm">{chatSessions.length}</span>
            </button>
          </div>
        </div>
        
        {/* Chat History */}
        {showChatHistory && (
          <ChatHistory 
            sessions={chatSessions}
            onLoadSession={loadChatSession}
            onDeleteSession={deleteChatSession}
            currentSessionId={currentSessionId}
          />
        )}

        {/* Input Section */}
        <div className="slate-gradient rounded-2xl p-8 border border-slate-700 shadow-2xl mb-8">
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3 text-lg">
              <MessageSquare className="w-5 h-5 inline-block mr-2" />
              Describe your website idea:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Create a modern portfolio website with dark theme, hero section, about me, projects gallery, and contact form..."
              className="w-full h-32 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  generateCode();
                }
              }}
            />
            <p className="text-slate-400 text-sm mt-2">
              💡 Tip: Press Ctrl+Enter to generate
            </p>
          </div>

          {/* Example Prompts */}
          <div className="mb-6">
            <p className="text-slate-300 text-sm mb-3 font-medium">✨ Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-lg transition-all border border-slate-600 hover:border-purple-500"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateCode}
            disabled={isGenerating || !prompt.trim()}
            className="purple-pink-gradient text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg w-full sm:w-auto"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" />
                Generating Magic...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2 inline-block" />
                Generate Website
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-900 bg-opacity-30 border border-red-500 rounded-xl">
              <p className="text-red-300">{error}</p>
            </div>
          )}
        </div>

        {/* Live AI Response */}
        {(isStreaming || streamingText) && (
          <div className="emerald-blue-gradient rounded-2xl p-6 border border-emerald-500 border-opacity-30 mb-8 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-white font-semibold text-lg">
                  AI is crafting your website...
                </span>
              </div>
              <span className="text-emerald-300 text-sm bg-emerald-500 bg-opacity-20 px-3 py-1 rounded-full">
                ~2 mins
              </span>
            </div>

            <div
              ref={scrollContainerRef}
              className="bg-slate-800 rounded-xl p-4 max-h-80 overflow-auto border border-slate-700"
            >
              <pre className="text-sm text-emerald-300 whitespace-pre-wrap font-mono">
                {streamingText}
                {isStreaming && <span className="animate-pulse">▋</span>}
              </pre>
            </div>
          </div>
        )}

        {/* Generated Code and Preview */}
        {generatedCode.html && (
          <div ref={generatedSectionRef} className="space-y-8">
            {/* Fullscreen Preview Modal */}
            {isFullscreen && (
              <div className="fixed inset-0 z-50 bg-black flex flex-col">
                <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-700">
                  <h3 className="text-white font-semibold flex items-center text-lg">
                    <Play className="w-5 h-5 mr-2" />
                    Fullscreen Preview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={updatePreview}
                      className="text-slate-300 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Refresh preview"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={exitFullscreen}
                      className="text-slate-300 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Minimize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <iframe
                    ref={iframeRef}
                    className="w-full h-full border-0"
                    title="Fullscreen Website Preview"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Code Section */}
              <div className="slate-gradient rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveTab('html')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'html' 
                          ? 'purple-pink-gradient text-white shadow-lg' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <FileCode className="w-4 h-4 mr-2 inline-block" />
                      HTML
                    </button>
                    <button
                      onClick={() => setActiveTab('css')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'css' 
                          ? 'purple-pink-gradient text-white shadow-lg' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <Palette className="w-4 h-4 mr-2 inline-block" />
                      CSS
                    </button>
                    <button
                      onClick={() => setActiveTab('js')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'js' 
                          ? 'purple-pink-gradient text-white shadow-lg' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <Zap className="w-4 h-4 mr-2 inline-block" />
                      JavaScript
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(generatedCode[activeTab], activeTab)}
                      className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all relative"
                      title="Copy code"
                    >
                      {copySuccess === activeTab ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={downloadCode}
                      className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                      title="Download HTML file"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <pre className="text-sm text-slate-200 overflow-auto max-h-96 bg-slate-950 rounded-xl p-4 border border-slate-800">
                    <code>{generatedCode[activeTab]}</code>
                  </pre>
                </div>
              </div>

              {/* Preview Section */}
              <div className="slate-gradient rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900">
                  <h3 className="text-white font-semibold flex items-center">
                    <Play className="w-4 h-4 mr-2 text-emerald-400" />
                    Live Preview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                      title="Toggle preview"
                    >
                      {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    {showPreview && (
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                        title="Fullscreen preview"
                      >
                        <Maximize className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="h-96 bg-white">
                  {showPreview ? (
                    <iframe
                      ref={iframeRef}
                      className="w-full h-full border-0"
                      title="Generated Website Preview"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 bg-slate-900">
                      <div className="text-center">
                        <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Click the eye icon to show preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Deploy Section */}
            <DeployButton generatedCode={generatedCode} projectName="ai-generated-website" />
          </div>
        )}
      </div>
    </section>
  );
});

CodeGenerator.displayName = 'CodeGenerator';

export default CodeGenerator;