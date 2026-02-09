import React from 'react'
import { Heart } from 'lucide-react'

function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800 mt-24 py-12">
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
  )
}

export default Footer