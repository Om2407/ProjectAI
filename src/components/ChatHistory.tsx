import { useState } from 'react';
import { Trash2, MessageSquare, Clock, Code, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';

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

interface ChatHistoryProps {
  sessions: ChatSession[];
  onLoadSession: (session: ChatSession) => void;
  onDeleteSession: (sessionId: string) => void;
  currentSessionId: string | null;
}

const ChatHistory = ({ 
  sessions, 
  onLoadSession, 
  onDeleteSession, 
  currentSessionId 
}: ChatHistoryProps) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleDelete = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (deleteConfirm === sessionId) {
      onDeleteSession(sessionId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(sessionId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div 
      className="backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden mb-8 relative"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
      }}
    >
      {/* Animated background effect */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)'
        }}
      />

      {/* Header */}
      <div 
        className="border-b border-slate-700/50 p-6 relative"
        style={{
          background: 'linear-gradient(90deg, rgba(147, 51, 234, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)'
        }}
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)',
            filter: 'blur(20px)'
          }}
        />
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div 
              className="p-3 rounded-xl border relative overflow-hidden"
              style={{
                background: 'rgba(168, 85, 247, 0.15)',
                borderColor: 'rgba(168, 85, 247, 0.3)',
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
              }}
            >
              <MessageSquare className="w-5 h-5 text-purple-400 relative z-10" />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%)'
                }}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Chat History
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              </h3>
              <p className="text-slate-400 text-sm">Your previous sessions</p>
            </div>
          </div>
          <div 
            className="px-4 py-2 rounded-xl border relative overflow-hidden"
            style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderColor: 'rgba(100, 116, 139, 0.3)'
            }}
          >
            <span className="text-white font-semibold">{sessions.length}</span>
            <span className="text-slate-400 text-sm ml-1">sessions</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 relative">
        {sessions.length === 0 ? (
          <div className="text-center py-16 relative">
            <div 
              className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 border relative overflow-hidden"
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                borderColor: 'rgba(100, 116, 139, 0.3)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
              }}
            >
              <MessageSquare className="w-12 h-12 text-slate-500 relative z-10" />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(100, 116, 139, 0.2) 0%, transparent 70%)'
                }}
              />
            </div>
            <p className="text-white font-semibold text-lg mb-2">No chat sessions yet</p>
            <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
              Start building your first project to create a session history
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            <style>{`
              .chat-scroll::-webkit-scrollbar {
                width: 6px;
              }
              .chat-scroll::-webkit-scrollbar-track {
                background: transparent;
              }
              .chat-scroll::-webkit-scrollbar-thumb {
                background: rgba(100, 116, 139, 0.5);
                border-radius: 3px;
              }
              .chat-scroll::-webkit-scrollbar-thumb:hover {
                background: rgba(100, 116, 139, 0.7);
              }
            `}</style>
            <div className="chat-scroll space-y-3 max-h-96 overflow-y-auto pr-2">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="group relative p-5 rounded-xl border transition-all duration-300 cursor-pointer"
                  style={{
                    background: currentSessionId === session.id
                      ? 'linear-gradient(90deg, rgba(168, 85, 247, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)'
                      : hoveredSession === session.id
                      ? 'rgba(30, 41, 59, 0.8)'
                      : 'rgba(30, 41, 59, 0.5)',
                    borderColor: currentSessionId === session.id
                      ? 'rgba(168, 85, 247, 0.5)'
                      : 'rgba(100, 116, 139, 0.5)',
                    boxShadow: currentSessionId === session.id
                      ? '0 10px 25px -5px rgba(168, 85, 247, 0.3), 0 0 0 1px rgba(168, 85, 247, 0.2) inset'
                      : hoveredSession === session.id
                      ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
                    transform: hoveredSession === session.id ? 'scale(1.02) translateY(-2px)' : 'scale(1)'
                  }}
                  onClick={() => onLoadSession(session)}
                  onMouseEnter={() => setHoveredSession(session.id)}
                  onMouseLeave={() => setHoveredSession(null)}
                >
                  {/* Active indicator */}
                  {currentSessionId === session.id && (
                    <div 
                      className="absolute -left-1 top-1/2 w-1 h-12 rounded-r-full"
                      style={{
                        background: 'linear-gradient(180deg, rgb(168, 85, 247) 0%, rgb(59, 130, 246) 100%)',
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
                        transform: 'translateY(-50%)'
                      }}
                    />
                  )}

                  {/* Glow effect on hover */}
                  {hoveredSession === session.id && (
                    <div 
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
                        filter: 'blur(20px)'
                      }}
                    />
                  )}

                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex-1 min-w-0 pr-4">
                      {/* Title */}
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-white font-semibold truncate text-base">
                          {session.title}
                        </h4>
                        {session.generatedCode.html && (
                          <div 
                            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium border"
                            style={{
                              background: 'rgba(16, 185, 129, 0.15)',
                              color: 'rgb(52, 211, 153)',
                              borderColor: 'rgba(16, 185, 129, 0.3)',
                              boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)'
                            }}
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>Generated</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Meta info */}
                      <div className="flex items-center space-x-3 text-slate-400 text-sm mb-3">
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatTime(session.timestamp)}</span>
                        </div>
                        {session.generatedCode.html && (
                          <div className="flex items-center space-x-1.5">
                            <Code className="w-3.5 h-3.5" />
                            <span className="text-xs">
                              {[session.generatedCode.html && 'HTML', 
                                session.generatedCode.css && 'CSS', 
                                session.generatedCode.js && 'JS']
                                .filter(Boolean)
                                .join(' • ')}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Prompt preview */}
                      <p 
                        className="text-slate-300 text-sm line-clamp-2 leading-relaxed p-2.5 rounded-lg border"
                        style={{
                          background: 'rgba(15, 23, 42, 0.5)',
                          borderColor: 'rgba(100, 116, 139, 0.3)'
                        }}
                      >
                        {session.prompt}
                      </p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={(e) => handleDelete(e, session.id)}
                        className="p-2 rounded-lg transition-all duration-200 border"
                        style={{
                          background: deleteConfirm === session.id
                            ? 'rgba(239, 68, 68, 0.25)'
                            : 'transparent',
                          color: deleteConfirm === session.id
                            ? 'rgb(252, 165, 165)'
                            : 'rgb(148, 163, 184)',
                          borderColor: deleteConfirm === session.id
                            ? 'rgba(239, 68, 68, 0.5)'
                            : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (deleteConfirm !== session.id) {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                            e.currentTarget.style.color = 'rgb(248, 113, 113)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (deleteConfirm !== session.id) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'rgb(148, 163, 184)';
                            e.currentTarget.style.borderColor = 'transparent';
                          }
                        }}
                        title={deleteConfirm === session.id ? 'Click again to confirm' : 'Delete session'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <ChevronRight 
                        className="w-5 h-5 transition-all duration-300"
                        style={{
                          color: currentSessionId === session.id 
                            ? 'rgb(192, 132, 252)' 
                            : 'rgb(71, 85, 105)',
                          transform: hoveredSession === session.id ? 'translateX(4px)' : 'translateX(0)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Demo with sample data
const DemoApp = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Landing Page Design',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      prompt: 'Create a modern landing page with hero section and features',
      generatedCode: {
        html: '<div>Sample HTML</div>',
        css: '.sample { color: blue; }',
        js: 'console.log("Hello");'
      }
    },
    {
      id: '2',
      title: 'Dashboard UI',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      prompt: 'Build a responsive admin dashboard with charts',
      generatedCode: {
        html: '<div>Dashboard</div>',
        css: '',
        js: ''
      }
    },
    {
      id: '3',
      title: 'Contact Form',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      prompt: 'Simple contact form with validation',
      generatedCode: {
        html: '',
        css: '',
        js: ''
      }
    }
  ]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>('1');

  const handleLoadSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    console.log('Loaded session:', session.title);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <ChatHistory
        sessions={sessions}
        onLoadSession={handleLoadSession}
        onDeleteSession={handleDeleteSession}
        currentSessionId={currentSessionId}
      />
    </div>
  );
};

export default DemoApp;