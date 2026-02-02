"use client"
import React, { useState, useEffect } from 'react';
import { Pencil, Users, Zap, Download, Github, Heart } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#fffef7] text-[#1e1e1e] overflow-hidden relative">
      {/* Animated sketch background */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="sketch" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 Q 30 5, 50 10 T 90 10" stroke="#1e1e1e" fill="none" strokeWidth="1"/>
              <circle cx="20" cy="50" r="15" stroke="#1e1e1e" fill="none" strokeWidth="1"/>
              <rect x="60" y="40" width="25" height="25" stroke="#1e1e1e" fill="none" strokeWidth="1" transform="rotate(15 72.5 52.5)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sketch)"/>
        </svg>
      </div>

      {/* Cursor trail effect */}
      <div 
        className="fixed w-8 h-8 rounded-full border-2 border-[#6965db] pointer-events-none transition-all duration-300 opacity-0 hover:opacity-100"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          mixBlendMode: 'multiply'
        }}
      />

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-[#6965db] rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
            <Pencil className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>Excalidraw</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-base hover:text-[#6965db] transition-colors relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6965db] transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="text-base hover:text-[#6965db] transition-colors relative group">
            Showcase
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6965db] transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="text-base hover:text-[#6965db] transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6965db] transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="flex items-center gap-2 text-base hover:text-[#6965db] transition-colors">
            <Github className="w-5 h-5" />
            GitHub
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center space-y-8 relative">
          {/* Decorative sketch elements */}
          <div className="absolute -top-10 left-1/4 w-32 h-32 border-2 border-[#fa5252] rounded-full opacity-30 animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-20 right-1/4 w-24 h-24 border-2 border-[#20c997] opacity-30" style={{ transform: 'rotate(15deg)', animation: 'float 4s ease-in-out infinite' }}></div>
          
          <div className="inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffc9c9] rounded-full text-sm font-medium mb-6 transform hover:scale-105 transition-transform">
              <Zap className="w-4 h-4" />
              Free & Open Source
            </div>
          </div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight" style={{ fontFamily: '"Comic Sans MS", "Virgil", cursive' }}>
            <span className="inline-block transform hover:rotate-2 transition-transform cursor-default">Sketching</span>{' '}
            <span className="inline-block text-[#6965db] transform hover:-rotate-2 transition-transform cursor-default">meets</span>
            <br />
            <span className="inline-block transform hover:rotate-1 transition-transform cursor-default">collaboration</span>
          </h2>

          <p className="text-xl md:text-2xl text-[#495057] max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            A virtual whiteboard for sketching hand-drawn like diagrams.
            <br />
            Collaborative and end-to-end encrypted.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button 
              className="group relative px-8 py-4 bg-[#6965db] text-white rounded-2xl text-lg font-bold overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onMouseEnter={() => setIsDrawing(true)}
              onMouseLeave={() => setIsDrawing(false)}
            >
              <Link href={"/canvas"}  className="relative z-10">Start Drawing</Link>
              <div className="absolute inset-0 bg-[#5f5bd7] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              {isDrawing && (
                <div className="absolute inset-0 border-4 border-white opacity-50 rounded-2xl animate-ping"></div>
              )}
            </button>

            <button className="group px-8 py-4 bg-white border-3 border-[#1e1e1e] text-[#1e1e1e] rounded-2xl text-lg font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-[#6965db]">
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download
              </span>
            </button>
          </div>
        </div>

        {/* Animated Demo Canvas */}
        <div className="mt-24 relative">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-[#dee2e6] transform hover:rotate-1 transition-all duration-500">
            <div className="aspect-video bg-[#fffef7] rounded-2xl border-2 border-dashed border-[#adb5bd] relative overflow-hidden">
              {/* Simulated drawing canvas */}
              <svg className="w-full h-full">
                <defs>
                  <filter id="pencilTexture">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
                  </filter>
                </defs>
                
                {/* Animated drawing elements */}
                <rect x="10%" y="20%" width="20%" height="30%" 
                  fill="none" stroke="#fa5252" strokeWidth="3" 
                  filter="url(#pencilTexture)" 
                  style={{ animation: 'draw 2s ease-in-out infinite alternate' }}/>
                
                <circle cx="70%" cy="35%" r="15%" 
                  fill="none" stroke="#20c997" strokeWidth="3" 
                  filter="url(#pencilTexture)"
                  style={{ animation: 'draw 2.5s ease-in-out infinite alternate' }}/>
                
                <path d="M 30% 60% L 50% 50% L 70% 70%" 
                  fill="none" stroke="#6965db" strokeWidth="3" 
                  filter="url(#pencilTexture)"
                  strokeDasharray="5,5"
                  style={{ animation: 'draw 3s ease-in-out infinite alternate' }}/>

                <text x="45%" y="85%" textAnchor="middle" 
                  style={{ fontFamily: '"Comic Sans MS", cursive', fontSize: '1.5rem', fill: '#495057' }}>
                  Your ideas here...
                </text>
              </svg>

              {/* Floating tools indicator */}
              <div className="absolute top-4 left-4 flex gap-2">
                {['#fa5252', '#20c997', '#6965db', '#ffc107'].map((color, i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-xl border-2 border-[#1e1e1e] cursor-pointer transform transition-all hover:scale-110"
                    style={{ 
                      backgroundColor: color,
                      animation: `bounce 2s ease-in-out ${i * 0.2}s infinite`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Decorative arrows */}
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-30">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <path d="M 10 50 Q 50 20, 90 50" stroke="#6965db" strokeWidth="3" fill="none" strokeDasharray="5,5"/>
              <path d="M 80 45 L 90 50 L 80 55" fill="#6965db"/>
            </svg>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <h3 className="text-4xl md:text-5xl font-black text-center mb-16" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
          Why Excalidraw?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Pencil className="w-8 h-8" />,
              color: '#fa5252',
              title: 'Hand-drawn Feel',
              desc: 'Create diagrams that feel personal and approachable'
            },
            {
              icon: <Users className="w-8 h-8" />,
              color: '#20c997',
              title: 'Real-time Collaboration',
              desc: 'Work together with your team in real-time'
            },
            {
              icon: <Zap className="w-8 h-8" />,
              color: '#6965db',
              title: 'Lightning Fast',
              desc: 'Infinite canvas with smooth performance'
            }
          ].map((feature, i) => (
            <div 
              key={i}
              className="group bg-white p-8 rounded-3xl border-3 border-[#dee2e6] transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
              style={{ animation: `slideUp 0.6s ease-out ${i * 0.1}s both` }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-12"
                style={{ backgroundColor: feature.color }}
              >
                <div className="text-white">{feature.icon}</div>
              </div>
              <h4 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                {feature.title}
              </h4>
              <p className="text-[#6c757d] text-lg leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-[#dee2e6] mt-24 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-[#6c757d]">
              Made with <Heart className="w-5 h-5 text-[#fa5252] animate-pulse" /> by the Excalidraw team
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-[#6c757d] hover:text-[#6965db] transition-colors">Privacy</a>
              <a href="#" className="text-[#6c757d] hover:text-[#6965db] transition-colors">License</a>
              <a href="#" className="text-[#6c757d] hover:text-[#6965db] transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes draw {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(15deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

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
      `}</style>
    </div>
  );
}
