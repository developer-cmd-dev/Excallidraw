"use client"
import React, { useState } from 'react'
import { Zap,Heart, } from 'lucide-react'
import Link from 'next/link'
function Hero() {
    const [isDrawing,setIsDrawing]=useState(false)
  return (
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
        <Link
          href={"/canvas"}
          className="group relative px-8 py-4 bg-[#6965db] text-white rounded-2xl text-lg font-bold overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"

        >
          <span className="relative z-10">Start Drawing</span>
          <div className="absolute inset-0 bg-[#5f5bd7] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          {isDrawing && (
            <div className="absolute inset-0 border-4 border-white opacity-50 rounded-2xl animate-ping"></div>
          )}
        </Link>


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
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
              </filter>
            </defs>

            {/* Animated drawing elements */}
            <rect x="10%" y="20%" width="20%" height="30%"
              fill="none" stroke="#fa5252" strokeWidth="3"
              filter="url(#pencilTexture)"
              style={{ animation: 'draw 2s ease-in-out infinite alternate' }} />

            <circle cx="70%" cy="35%" r="15%"
              fill="none" stroke="#20c997" strokeWidth="3"
              filter="url(#pencilTexture)"
              style={{ animation: 'draw 2.5s ease-in-out infinite alternate' }} />

            <path d="M 30% 60% L 50% 50% L 70% 70%"
              fill="none" stroke="#6965db" strokeWidth="3"
              filter="url(#pencilTexture)"
              strokeDasharray="5,5"
              style={{ animation: 'draw 3s ease-in-out infinite alternate' }} />

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
          <path d="M 10 50 Q 50 20, 90 50" stroke="#6965db" strokeWidth="3" fill="none" strokeDasharray="5,5" />
          <path d="M 80 45 L 90 50 L 80 55" fill="#6965db" />
        </svg>
      </div>
    </div>
  </main>


  )
}

export default Hero