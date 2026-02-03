"use client"
import { useEffect,useState } from 'react';
function Background({children}:{children:React.ReactNode}) {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
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
            <path d="M10 10 Q 30 5, 50 10 T 90 10" stroke="#1e1e1e" fill="none" strokeWidth="1" />
            <circle cx="20" cy="50" r="15" stroke="#1e1e1e" fill="none" strokeWidth="1" />
            <rect x="60" y="40" width="25" height="25" stroke="#1e1e1e" fill="none" strokeWidth="1" transform="rotate(15 72.5 52.5)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sketch)" />
      </svg>
    </div>
    <div
      className="fixed w-8 h-8 rounded-full border-2 border-[#6965db] pointer-events-none transition-all duration-300 opacity-0 hover:opacity-100"
      style={{
        left: mousePosition.x - 16,
        top: mousePosition.y - 16,
        mixBlendMode: 'multiply'
      }}
    />
    {children}

</div>

  )
}

export default Background