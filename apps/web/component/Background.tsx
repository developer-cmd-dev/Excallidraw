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
    <div className="min-h-screen w-full bg-[#020617] relative">
  {/* Emerald Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)`,
    }}
  />
     {children}
</div>

  )
}

export default Background